module.exports = class StringProcessor {

    constructor(conformed, callback) {
        var result = {
            "Valid": [],
            "Invalid": []
        };

        while (result.Valid.length < 2 && result.Invalid.length < 2){
            var data = StringProcessor.stringGenerator(
                conformed.alphabet,
                Math.floor((Math.random() * conformed.max + 2) + conformed.max + 1)
            )
            if (StringProcessor.processSringData(data,conformed) == 'Valid'){
                result.Valid.append(data)
            }else{
                result.Invalid.append(data)
            }
        }


        callback(result);
    }

    static processSringData(data, conditions) {
        if (data == null) {
            if (!conditions.nullable) {
                return "Invalid";
            }
        } else {
            if (conditions.min > data.length) {
                return 'Invalid';
            }
            if (conditions.max < data.length) {
                return 'Invalid';
            }
            var alphabet = conditions.alphabet.split("");
            var datasplit =  data.split("");
            for (var i = 0; i < data.length; i++) {
                if (!alphabet.includes(datasplit[i])){
                    return "Invalid";
                }
            }
        }

        return "Valid";

    }

    static stringGenerator(alphabet, length) {
        var res = "";
        for (var i = 0; i < length; i++) {
            res += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        };
        return res
    }

};