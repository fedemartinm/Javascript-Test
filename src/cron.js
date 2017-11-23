const database = require('./database.js');
var axios = require('axios');
var cron = require('node-cron');
const config = require('./config.json')

//refresh weather info after a specified number of minutes
const frequency = 45;
const day = 1440;//mins/day

 
function updateWeatherValues() {
    
    //request to external api
    axios.get('https://api.apixu.com/v1/current.json', {
        params: {
          key: config.token,
          q:"Buenos Aires",
          lang:"es" }})
    .then(function (response) { 
        var current = response.data.current;
        
        //Update functions
        updateCurrent(current);
        updateHistory(current.temp_c);
    })
    .catch(function (error) {
        console.log("Error updating weather values");
    });
};


function updateCurrent(current){
    database.setCurrentWeather(current.temp_c,current.condition.text,current.humidity);
}

function updateHistory(temp){

    var queueMax = day / frequency;
    
    //push new temp, and get weather history
    database.pushWeatherHistory(temp);
    var history = database.getWeatherHistory();
    if(history.size().value()>queueMax)
        history.value().shift();
    
    //update history limits
    var min = Math.min.apply(null, history.value());
    var max = Math.max.apply(null, history.value());
    database.setWeatherHistoryLimits(min,max);
  
    return {min:min,max:max};
}

//Start job!
function cronInit(){
    database.clearDatabase();
    updateWeatherValues();
    const customFrequency = "*/"+frequency+" * * * *";
    cron.schedule(customFrequency, updateWeatherValues);
}

module.exports.cronInit = cronInit;
module.exports.updateHistory = updateHistory;
