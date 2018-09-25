// Allow us to pass arguments from the console
var program = require('commander');
var express = require('express');
var app = express();
var fs = require('fs');
var LimitAnalizer = require('./models/LimitiAnalizer');

function GetLimits(path) {
  var src = fs.createReadStream(path);
  LimitAnalizer.GetLimits(src, function(result){
    console.log(result);
  });
}

function StartServer() {
  var port = 3000;
  app.get('/', function (req, res) {
    res.end('Hello Word!');
  });

  app.listen(port, function () {
    console.log('Escuchando en: 0.0.0.0' + port);
  });
}

program
  .version('1.0.0')
  .option('-a, --author', 'Print authors')
  .option('-s, --stream <string>', 'Set stream')
  .option('-w, --web', 'Initiates the web server')
  .parse(process.argv);

if (program.author) console.log('Created by Hector & Raul');
if (program.stream) GetLimits(program.stream);
if (program.web) StartServer();