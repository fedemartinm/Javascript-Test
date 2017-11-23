/*
Información conceptual: 
apixu provee un endpoint 'history', el cual muestra la información historica de clima por hora en una locación determinada. Hubiese sido de comodidad usar esta información pero en base a un conjunto de pruebas, entiendo que se nutre del pronóstico para el día actual, por lo que puede no ser preciso. 
Para entenderlo mejor veamos:
History para la fecha 2017-11-23 10:00 indicaba una temp_c de 25.3,
mientras que current, a las 2017-11-23 10:00, indica una temp_c: 22.

Con fines de proveer información más precisa a los usuarios, vamos a recolectar la información cada 15 minutos (frecuencia de actualización real de apixu). 
*/

const database = require('./database.js');
const cron = require('./cron.js');
var express = require('express');

var app = express();
cron.cronInit();

app.get('/current',(req, res)=>{
    res.send(database.getCurrentWeather());
});

app.get('/history',(req, res)=>{
  res.send(database.getWeatherHistoryLimits());
});

app.listen(3000, function () {
  console.log('Weather app listening on port 3000');
});