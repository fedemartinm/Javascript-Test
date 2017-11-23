const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/db.json');
const db = low(adapter);


db.defaults({ current:{}, history:[],historyLimits:{}}).write();

function getCurrentWeather(){
   return db.get('current');
}

function setCurrentWeather(temp,condition,humidity){

   db.set('current',{ temp:temp,
                      humidity:humidity,
                      condition:condition}).write()
}

function getWeatherHistory(){
    return db.get('history');
}

function pushWeatherHistory(data){
    db.get('history').push(data.toString()).write();
}

function getWeatherHistoryLimits(){
   return db.get('historyLimits');
}

function setWeatherHistoryLimits(min,max){
   db.set('historyLimits',{min_temp:min,max_temp:max}).write()
}

function clearDatabase(){
    db.set('history',[]).write()
}

module.exports.getCurrentWeather = getCurrentWeather;
module.exports.setCurrentWeather = setCurrentWeather;
module.exports.getWeatherHistory = getWeatherHistory;
module.exports.pushWeatherHistory = pushWeatherHistory;
module.exports.getWeatherHistoryLimits = getWeatherHistoryLimits;
module.exports.setWeatherHistoryLimits = setWeatherHistoryLimits;
module.exports.clearDatabase = clearDatabase;