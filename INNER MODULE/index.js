// Allow us to pass arguments from the console
var program = require('commander');
var fs = require('fs');
var LimitAnalizer = require('./models/LimitiAnalizer');
var Readable = require('stream').Readable;

// Gets the limits of a given context file
function GetLimitsStream(path) {
  var src = fs.createReadStream(path);
  LimitAnalizer.GetLimits(src, function (result) {
    console.log(JSON.stringify(result));
  });
}

function GetLimitsContext(string) {
  var s = new Readable();
  s.push(string);
  s.push(null);

  LimitAnalizer.GetLimits(s, function (result) {
    console.log(JSON.stringify(result));
  });
}

// Configures the permitted commands.
program
  .version('1.0.0')
  .option('-a, --author', 'Print authors')
  .option('-s, --stream <file path>', 'Set stream')
  .option('-c, --context <String>', 'Set a the context from a given string')
  .parse(process.argv);

if (program.author) console.log('Created by Hector & Raul');
if (program.stream) GetLimitsStream(program.stream);
if (program.context) GetLimitsContext(program.context);