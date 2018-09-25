var SupportedFormats = {
    int: ["type", "min", "max"],
    string: ["type", "minLength", "maxLength", "nullable", "alphabet"]
};
Object.freeze(SupportedFormats);

module.exports = class StringProcessor {

    constructor(stream) {
        this.type = SupportedFormats.int;
        this.stream = stream;
    }

    getValues(callback) {
        var stringProcessor = this;
        this.getStream(function (value) {
            if (stringProcessor.formatCheck() == false) {
                throw new Error("The format is not correct, verify the json structure.");
            }

            if (stringProcessor.jsonValue == null) {
                var raw = JSON.parse(value);
                var context = Object.keys(raw)[0];
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
                    type: this.jsonValue.type,
                    min: this.jsonValue.min,
                    max: this.jsonValue.max
                };
            case SupportedFormats.string:
                break;
            default:
                break;
        }
    }

    validatePresence() {
        var streamNull = (this.stream == null);
        var streamUndefined = (this.stream == undefined);
        var validStream = (!streamNull || !streamUndefined);
        return validStream;
    }

    hasValue() {
        return (this.content != null && this.content != undefined);
    }

    getStream(callback) {
        var streamObject = this;
        if (!this.validatePresence) {
            throw new Error("The stream can not be empty or null.");
        } else if (this.hasValue()) {
            callback(this.content);
        } else {
            
            this.asyncRead(this.stream, function(streamContent) {
                streamObject.content = streamContent;
                callback(streamObject.content);
            });
        }
    }

    asyncRead(stream, callback) {
        var data = '';
        stream.setEncoding('UTF8');
        stream.on('data', function (chunk) {
            data += chunk;
        });

        stream.on('end', function () {
            callback(data);
        });
    }

    formatCheck() {
        var streamObject = this;
        this.getStream( function(content) {
            if (streamObject.isJson(content) == false) {
                return false;
            }
            var jsonValue = JSON.parse(content);
            var context = Object.keys(jsonValue)[0];
            streamObject.setType(jsonValue[context]);
            if (streamObject.requiredFields(content) == false) {
                return false;
            }
        });

        return true;
    }

    setType(contentJson) {
        switch (contentJson.type) {
            case 'int':
                this.type = SupportedFormats.int;
                break;
            case 'string':
                this.type = SupportedFormats.string;
                break;
            default:
                throw new Error("Unrecognice type.");
        }

    }

    requiredFields(content) {
        var context = Object.keys(content)[0];

        var contextAttributes = Object.keys(content[context]);
        var allowAttr = this.type;

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

};