const http = require('http');
const fs = require('fs');
const readline = require("readline-sync");
var requests = require('requests');

const homefile = fs.readFileSync('home.html','utf-8');
const replaceval = (tempVal,orgVal) => {
   //tempdata=parseFloat(orgVal.main.temp-273).toFixed(2);
    temperature = tempVal.replace("{%tempval%}",parseFloat(orgVal.main.temp-273).toFixed(2));
    temperature = temperature.replace("{%tempmin%}",parseFloat(orgVal.main.temp_min-273).toFixed(2));
    temperature = temperature.replace("{%tempmax%}",parseFloat(orgVal.main.temp_max-273).toFixed(2));
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temperature;
};

const server = http.createServer((req,res)=>{
    if (req.url == "/"){
        //var p = readline.question()
        p = 'Ludhiana'
        requests('http://api.openweathermap.org/data/2.5/weather?q='+p+'&appid=e5f0be34715e5badfdfd9dbc2944a727')
          .on('data',(chunk)=>{
            const objdata = JSON.parse(chunk);
            const arrdata = [objdata];
            tempdata = (arrdata[0].main.temp-273);
            tempdata=parseFloat(tempdata).toFixed(2);
            //console.log(tempdata);
            const realTimeData = arrdata.map((val)=> replaceval(homefile,val)).join("");
                 
            res.write(realTimeData);
            
                   
        })
        .on('end', (err)=>{
            if (err) {
            return console.log('connection close due to errors',err);
            }
            res.end();

        });
    }
});
server.listen(10000,'127.0.0.1');
console.log('server listening on http://127.0.0.1:10000');