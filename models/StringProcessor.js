module.exports = class StringProcessor {

    constructor( conformed , callback ){
        var result = {
          "Valid":[StringProcessor.stringGenerator(conformed.alphabet,Math.random(conformed.min,conformed.max)),StringProcessor.stringGenerator(conformed.alphabet,Math.random(conformed.min,conformed.max))],
          "Invalid":[StringProcessor.stringGenerator(conformed.alphabet,Math.random(conformed.max+1,conformed.max+2)),StringProcessor.stringGenerator(conformed.alphabet,Math.random(conformed.min,conformed.max))]
        };

        callback(result);
    }

    static processSringData(data, conditions){
          if(data == null){
              if(!conditions.nullable){
                  return "Invalid";
              }
          }else{
              if (conditions.min > data.length){
                  return 'Invalid';
              }if(conditions.max < data.length){
                  return 'Invalid';
              }
          }

          return "Valid";

    }

    static stringGenerator(alphabet, length){
        var res = "";
        for(var i = 0;i < length; i++){
            res += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        };
        return res
    }

};