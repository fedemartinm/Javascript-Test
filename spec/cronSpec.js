const cron = require('../src/cron.js');
const db = require('../src/database.js');


describe('Temperaturas minimas y maximas', function() {
    var temp = [10,10,10,10,10,10,10,10, // 6 horas
               11,11,11,11,11,11,11,11, // 12
               12,12,12,12,12,12,12,12, // 18
               13,13,13,13,13,13,13,13, //24
               14,14,14,14,14,14,14,14 //30
               ];
    var res = {};
    for(var x = 0; x < 32 ; x++) 
        res = cron.updateHistory(temp[x]);

    it('Para un lapso menor a 24 horas',()=>{expect(res.min).toBe(10)
                             expect(res.max).toBe(13)});
   
});

describe('Temperaturas minimas y maximas', function() {
    var temp = [10,10,10,10,10,10,10,10, // 6 horas
               11,11,11,11,11,11,11,11, // 12
               12,12,12,12,12,12,12,12, // 18
               13,13,13,13,13,13,13,13, //24
               14,14,14,14,14,14,14,17 //30
               ];
    var res = {};
    for(var x = 0; x < 40 ; x++) 
        res = cron.updateHistory(temp[x]);

    it('Para un lapso mayor a 24 horas',()=>{expect(res.min).toBe(11)
                             expect(res.max).toBe(17)});
   
});
