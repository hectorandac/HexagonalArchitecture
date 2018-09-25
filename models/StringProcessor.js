module.exports = class StringProcessor {

    constructor( conformed , callback ){
        var result = {
          "Valid":[],
          "Invalid":[]
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
        for(var i = 1;i < length; i++){
            res += alphabet.chartAt(Math.floor(Math.random() * alphabet));
        };
        return res
    }

};