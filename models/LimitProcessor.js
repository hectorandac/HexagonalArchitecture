module.exports = class LimitProcessor {
  constructor( conformed , callback ){
    console.log(conformed);
    let min = conformed.min;
    let max = conformed.max;
    let result = this.calcRangeMaxMin(min, max);
    callback(result);
/*
    let callBack = [];
    for (let context in JSONContent){
      let contextAttributes = JSONContent[context];
      callBack.push({
          'key': context,
          'MaxMin': LimitProcessor.calcRangeMaxMin(contextAttributes['min'], contextAttributes['max'])
      });
      console.log(LimitProcessor.calcRangeMaxMin(contextAttributes['min'], contextAttributes['max']));
    }
    callback(callBack);
*/
  }
  static calcRangeMaxMin(min,max){
    var dicValuesMax = {
      'valid':[min,max],
      'invalid':[min-1,max+1]
    };
    return dicValuesMax;
  }
  static processSringData(data, conditions){
      if(data == null){
          if(!conditions.nullable){
              return "Invalid"
          }
      }else{
          if (conditions.min > data.length){
              return 'Invalid'
          }if(conditions.max < data.length){
              return 'Invalid'
          }
      }

      return "Valid"
  }
}
