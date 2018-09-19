module.exports = class LimitProcessor {

  constructor( jsonString , callback ){
    let min = jsonString['min'];
    let max = jsonString['max'];
    let result = LimitProcessor.calcRangeMaxMin(min, max); 
    callback(result);
  }

  calcRangeMaxMin(min,max){
    var dicValuesMax = {
      'valid':[min,max],
      'invalid':[min-1,max+1]
    };
    return dicValuesMax;
  }
}
