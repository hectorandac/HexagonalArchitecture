// Allow us to pass arguments from the console
const program = require('commander');
const fs = require('fs');
const LimitProcessor = require('./models/LimitProcessor');
const StringProcessor = require('./models/StringProcessor');

function GetLimits(path) {
  const src = fs.createReadStream(path);
  let stringProcessor = new StringProcessor(src);
  let jsonValue = stringProcessor.getValues( (value) => {
    let limitProcessor = new LimitProcessor(value, (result) => {
      console.log(result);
    })
  });
}

function IsFormatOk(path) {
  const src = fs.createReadStream(path);

}


program
  .version('1.0.0')
  .option('-a, --author', 'Print authors')
  .option('-f, --file <string>', 'Set file path')
  .option('-c, --check <string>', 'Cheks the file format')
  .parse(process.argv);

if (program.author) console.log('Created by Hector & Raul');
if (program.file) GetLimits(program.file);
if (program.check) IsFormatOk(program.check);
