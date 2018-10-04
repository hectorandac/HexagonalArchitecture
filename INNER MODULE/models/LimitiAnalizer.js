var IntProcessor = require('./IntProcessor');
var StreamProcessor = require('./StreamProcessor');
var StringProcessor = require('./StringProcessor');

module.exports = class LimitAnalizer {
  static GetLimits(stream, callback) {
    // Analices the stream
    var streamProcessor = new StreamProcessor(stream);
    // Gathers all the information and put in on a variable for returning
    streamProcessor.entryCount(function (size) {
      var collector = {};
      for (var i = 0; i < size; i++) {
        LimitAnalizer.GetValue(streamProcessor, i, function (string) {

          collector[string.id] = JSON.parse(string.value);

          if (i == (size - 1)) {
            // Returns the collecvtor variable to the caller
            callback(collector);
          }
        });
      }
    });
  }

  static GetValue(streamProcessor, i, callback) {
    streamProcessor.getValues(i, function (value) {
      switch (value.type) {
        case 'int':
          // Analices the integer procesable object and returns tha valids and invalids.
          new IntProcessor(value, function (result) {
            callback({
              id: value.id,
              value: JSON.stringify(result)
            });
          });
          break;
        case 'string':
          // Analices the string procesable object and returns the valids and invalids.
          new StringProcessor(value, function (result) {
            callback({
              id: value.id,
              value: JSON.stringify(result)
            });
          });
          break;
        default:
          throw new Error('Unsuported estructure type');
      }
    });
  }
};