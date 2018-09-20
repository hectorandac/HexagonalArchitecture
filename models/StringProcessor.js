const SupportedFormats = {
    int: ["type", "min", "max"],
    string: ["type", "minLength", "maxLength", "nullable", "alphabet"]
}
Object.freeze(SupportedFormats)

module.exports = class StringProcessor {

    constructor(stream) {
        this.type = SupportedFormats.int;
        this.stream = stream;
    }

    getValues(callback) {
        let stringProcessor = this;
        this.getStream(function (value) {
            if (stringProcessor.formatCheck() == false) {
                throw new Error("The format is not correct, verify the json structure.");
            }

            if (stringProcessor.jsonValue == null) {
                let raw = JSON.parse(value);
                let context = Object.keys(raw)[0];
                stringProcessor.jsonValue = raw[context];
                callback(stringProcessor.getByType(stringProcessor.type));
            } else {
                callback(stringProcessor.getByType(stringProcessor.type));
            }
        });
    }

    getByType(type) {
        switch (this.type) {
            case SupportedFormats.int:
                return {
                    min: this.jsonValue['min'],
                    max: this.jsonValue['max']
                }
            case SupportedFormats.string:
                break;
            default:
                break;
        }
    }

    validatePresence() {
        let streamNull = (this.stream == null);
        let streamUndefined = (this.stream == undefined);
        let validStream = (!streamNull || !streamUndefined);
        return validStream;
    }

    hasValue() {
        return (this.content != null && this.content != undefined);
    }

    getStream(callback) {
        console.log("Test");
        if (!this.validatePresence) {
            throw new Error("The stream can not be empty or null.");
        } else if (this.hasValue()) {
            callback(this.content);
        } else {
            
            this.asyncRead(this.stream, (streamContent) => {
                this.content = streamContent;
                callback(this.content)
            });
        }
    }

    asyncRead(stream, callback) {
        let data = '';
        stream.setEncoding('UTF8');
        stream.on('data', function (chunk) {
            data += chunk;
        });

        stream.on('end', function () {
            callback(data)
        });
    }

    formatCheck() {

        this.getStream((content) => {
            if (this.isJson(content) == false) {
                return false;
            }
            let jsonValue = JSON.parse(content);
            let context = Object.keys(jsonValue)[0];
            this.setType(jsonValue[context]);
            if (this.requiredFields(content) == false) {
                return false;
            }
        });

        return true;
    }

    setType(contentJson) {
        switch (contentJson['type']) {
            case 'int':
                this.type = SupportedFormats.int;
                break;
            case 'string':
                this.type = SupportedFormats.string;
                break;
            default:
                throw new Error("Unrecognice type.")
        }

    }

    requiredFields(content) {
        let context = Object.keys(content)[0];

        let contextAttributes = Object.keys(content[context]);
        let allowAttr = this.type;

        for (var attr in allowAttr) {
            attr = allowAttr[attr];
            if (!contextAttributes.includes(attr)) {
                return false;
            }
        }
    }

    isJson(content) {
        try {
            JSON.parse(content);
        } catch (e) {
            return false;
        }
        return true;
    }

}