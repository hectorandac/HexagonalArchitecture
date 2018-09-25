module.exports = class IntProcessor {
  constructor( conformed , callback ){
    var min = conformed.min;
    var max = conformed.max;
    var result = IntProcessorc.calcRangeMaxMin(min, max);
    callback(result);
  }
  
  static calcRangeMaxMin(min,max){
    var dicValuesMax = {
      'valid':[min,max],
      'invalid':[min-1,max+1]
    };
    return dicValuesMax;
  }
};
