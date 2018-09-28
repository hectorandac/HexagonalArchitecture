module.exports = class StringProcessor {

    constructor(conformed, callback) {
        var result = {
            "Valid": StringProcessor.getValids(conformed),
            "Invalid": StringProcessor.getInvalids(conformed)
        };
<<<<<<< HEAD
        
=======

        callback(result);
    }

    static stringGenerator(alphabet, length) {
        var res = "";
        for (var i = 0; i < length; i++) {
            res += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        };
        return res;
    }

    static getValids(conditions){
        var res = [];

        //add null
        if(conditions.nullable == true){
            res.push(null);
        }
        //add min lenth
        if(conditions.min > 0){
            res.push(this.stringGenerator(conditions.alphabet,conditions.min));
        }

        //add max legth
        if(conditions.max > 0){
            res.push(this.stringGenerator(conditions.alphabet,conditions.max));
        }
>>>>>>> b1a33e1c30a36bb24e267d01c291218fde4a23d3

        //add medium
        var medium = Math.round(((conditions.max - conditions.min) / 2) + conditions.min);
        if(medium > 0){
            res.push(this.stringGenerator(conditions.alphabet,medium));
        }

        return res
    }

    static getInvalids(conditions){
        var res = [];

        //add null
        if(conditions.nullable == false){
            res.push(null);
        }
        //add min lenth
        if(conditions.min - 1 > 0){
            res.push(this.stringGenerator(conditions.alphabet,conditions.min-1));
        }

        //add max legth
        if(conditions.max + 1 > 0){
            res.push(this.stringGenerator(conditions.alphabet,conditions.max + 1));
        }

        //not have charter in alphabpet
/*
        if(conditions.max> 0){
            res.push(this.stringGenerator(conditions.alphabet,conditions.max));
        }
*/
        return res

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

<<<<<<< HEAD
    static stringGenerator(alphabet, length, valid) {
        if (valid) {
            var desiredLength = 2;
        } else {

        }
    }

=======
>>>>>>> b1a33e1c30a36bb24e267d01c291218fde4a23d3
};