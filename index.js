// Allow us to pass arguments from the console
var program = require('commander');
var express = require('express');
var app = express();
var fs = require('fs');
var IntProcessor = require('./models/IntProcessor');
var StreamProcessor = require('./models/StreamProcessor');

function GetLimits(path) {
    var src = fs.createReadStream(path);
    var streamProcessor = new StreamProcessor(src);
    streamProcessor.getValues( function(value) {
      new IntProcessor(value, function(result) {
        console.log(result);
      });
    });
}

function IsFormatOk(path) {
  var src = fs.createReadStream(path);

}

function StartServer(){
  var port = 3000;
  app.get('/',function (req, res) {
    res.end('Hello Word!');
  });

  app.listen(port,function () {
    console.log('Escuchando en: 0.0.0.0' + port);
  });
}

program
  .version('1.0.0')
  .option('-a, --author', 'Print authors')
  .option('-f, --file <string>', 'Set file path')
  .option('-c, --check <string>', 'Cheks the file format')
  .option('-w, --web', 'Initiates the web server')
  .parse(process.argv);

if (program.author) console.log('Created by Hector & Raul');
if (program.file) GetLimits(program.file);
if (program.check) IsFormatOk(program.check);
if (program.web) StartServer();