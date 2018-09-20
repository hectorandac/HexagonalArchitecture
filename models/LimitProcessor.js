module.exports = class LimitProcessor {

  constructor( stream, callback ){
    let pathNull = ( stream == null );
    let pathUndefined = ( stream == undefined );
    let validStream = ( !pathNull || !pathUndefined );

    if( !validStream ){
      throw new Error("The file path can not be empty or null");
    } else {
      LimitProcessor.readStream(stream, ( streamContent ) => {
        this.content = streamContent
        let notJson = !LimitProcessor.isJson( this.content );
        if ( notJson ) { throw new Error( "The stream is not valid" ); }

        let JSONContent = JSON.parse( this.content );
        let notValid = !LimitProcessor.formatCheck( JSONContent );
        if ( notValid ) { throw new Error( "The stream is not valid" ); }
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

      });
    }
  }

  static readStream(stream, callback) {
      let data = '';
      stream.setEncoding('UTF8');
      stream.on('data', function(chunk) {
        data += chunk;
      });

      stream.on('end', function(){
        callback(data)
      });
  }

  static formatCheck(json){
    var context = Object.keys(json)[0];
    var contextAttributes = Object.keys(json[context]);
    var allowAttr = ["type", "min", "max"];

    for (var attr in allowAttr){
      attr = allowAttr[attr];
      if (!contextAttributes.includes(attr)) {
        return false;
      }
    }
    return true;
  }

  static isJson(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
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
