const { setWorldConstructor } = require('cucumber');
const LP = require('../../models/LimitProcessor.js');
const cmd = require('node-cmd');

var save_state = {
  path: "",
  LimitProcessor: null
};

class ValidatorProcessor {

  setPath(path){
    save_state.path = path;
  }

  getResults(callback){
    var command = 'node . -f ' + save_state.path;
    cmd.get(
      command,
      function(err, data, stderr){
        callback(data ? data : stderr);
      }
    );
  }

  formatCheck(callback){
    var command = 'node . -c ' + save_state.path;
    cmd.get(
      command,
      function(err, data, stderr){
        callback(data ? data : stderr);
      }
    );
  }

  isJson(callback){
    var command = 'node . -c ' + save_state.path;
    cmd.get(
      command,
      function(err, data, stderr){
        callback(data ? data : stderr);
      }
    );
  }

}

setWorldConstructor(ValidatorProcessor);
