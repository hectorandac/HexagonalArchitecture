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
                stringProcessor.jsonValue = JSON.parse(value);
                console.log("#######");
                console.log(value);
                
                callback(stringProcessor.jsonValue)
            } else {
                callback(stringProcessor.jsonValue);
            }
        });
    }

    validatePresence() {
        let streamNull = (stream == null);
        let streamUndefined = (stream == undefined);
        let validStream = (!streamNull || !streamUndefined);
        return validStream;
    }

    hasValue() {
        return (this.content != null);
    }

    getStream(callback) {
        if (!this.validatePresence) {
            throw new Error("The file path can not be empty or null.");
        } else if (this.hasValue) {
            callback(this.content)
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
            if (isJson(content) == false) { return false; }
            setType(JSON.parse(content));
            if (requiredFields(content) == false) { return false; }
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