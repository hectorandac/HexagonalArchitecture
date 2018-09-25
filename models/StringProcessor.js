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

/*static processSringData(data, conditions){
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
  }*/