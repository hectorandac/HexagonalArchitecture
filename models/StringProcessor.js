module.exports = class StringProcessor {

    constructor(conformed, callback) {
        var result = {
            "Valid": [],
            "Invalid": []
        };
        

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

    static stringGenerator(alphabet, length, valid) {
        if (valid) {
            var desiredLength = 2;
        } else {

        }
    }

};