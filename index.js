// Allow us to pass arguments from the console
const program = require('commander');
const express = require('express');
const app = express();
const fs = require('fs');
const IntProcessor = require('./models/IntProcessor');
const StreamProcessor = require('./models/StreamProcessor');

function GetLimits(path) {
    const src = fs.createReadStream(path);
    let streamProcessor = new StreamProcessor(src);
    streamProcessor.getValues((value) => {
      new IntProcessor(value, (result) => {
        console.log(result);
      });
    });
}

function IsFormatOk(path) {
  const src = fs.createReadStream(path);

}

app.get('/',function (req, res) {
    res.end('Hello Word!');
})
app.listen(3000,function () {
    console.log('Escuchando')
});

program
  .version('1.0.0')
  .option('-a, --author', 'Print authors')
  .option('-f, --file <string>', 'Set file path')
  .option('-c, --check <string>', 'Cheks the file format')
  .parse(process.argv);

if (program.author) console.log('Created by Hector & Raul');
if (program.file) GetLimits(program.file);
if (program.check) IsFormatOk(program.check);