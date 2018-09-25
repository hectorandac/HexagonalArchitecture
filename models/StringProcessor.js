module.exports = class StringProcessor {

    constructor(conformed, callback) {
        var result = {
            "Valid": [
                StringProcessor.stringGenerator(
                    conformed.alphabet,
                    Math.floor((Math.random() * conformed.max) + conformed.min)
                ),
                StringProcessor.stringGenerator(
                    conformed.alphabet,
                    Math.floor((Math.random() * conformed.max) + conformed.min)
                )
            ],
            "Invalid": 
            [
                StringProcessor.stringGenerator(
                    conformed.alphabet,
                    Math.floor((Math.random() * conformed.max + 2) + conformed.max + 1)
                ),
                StringProcessor.stringGenerator(
                    conformed.alphabet,
                    Math.floor((Math.random() * conformed.max + 2) + conformed.max + 1)
                )
            ]
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