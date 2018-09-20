module.exports = class LimitProcessor {

  constructor( conformed , callback ){
    console.log(conformed);
    let min = conformed.min;
    let max = conformed.max;
    let result = this.calcRangeMaxMin(min, max); 
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
