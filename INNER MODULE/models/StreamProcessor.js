var SupportedFormats = {
    int: ["type", "min", "max"],
    string: ["type", "min", "max", "nullable", "alphabet"]
};
Object.freeze(SupportedFormats);

module.exports = class StreamProcessor {

    constructor(stream) {
        this.type = SupportedFormats.int;
        this.stream = stream;
    }

    // Gives the numbers of entries in the callback
    entryCount(callback) {
        var streamProcessor = this;
        if (this.sizeCount == null) {
            this.getStream(function (value) {
                var raw = JSON.parse(value);
                var size = Object.keys(raw).length;
                streamProcessor.sizeCount = size;
                callback(size);
            });
        } else {
            callback(this.sizeCount);
        }
    }

    // Gets the values form an entry given the position of the entry in the collection
    getValues(position, callback) {
        var streamProcessor = this;
        this.getStream(function (value) {
            streamProcessor.formatCheck(position, function (isOk) {
                if (!isOk) {
                    throw new Error("The format is not correct, verify the json structure.");
                }
                var raw = JSON.parse(value);
                var context = Object.keys(raw)[position];
                streamProcessor.id = context;
                streamProcessor.jsonValue = raw[context];
                callback(streamProcessor.getByType(streamProcessor.type));
            });
        });
    }

    // Gives the required information depending on the entry type
    getByType() {
        switch (this.type) {
            case SupportedFormats.int:
                return {
                    id: this.id,
                    type: this.jsonValue.type,
                    min: this.jsonValue.min,
                    max: this.jsonValue.max
                };
            case SupportedFormats.string:
                return {
                    id: this.id,
                    type: this.jsonValue.type,
                    min: this.jsonValue.min,
                    max: this.jsonValue.max,
                    nullable: this.jsonValue.nullable,
                    alphabet: this.jsonValue.alphabet
                };
            default:
                break;
        }
    }

    // Verify the stream presence
    validatePresence() {
        var streamNull = (this.stream == null);
        var streamUndefined = (this.stream == undefined);
        var validStream = (!streamNull || !streamUndefined);
        return validStream;
    }

    // Verify that stream contains values
    hasValue() {
        return (this.content != null && this.content != undefined);
    }

    // Read the given stream
    getStream(callback) {
        var streamObject = this;
        if (!this.validatePresence) {
            throw new Error("The stream can not be empty or null.");
        } else if (this.hasValue()) {
            callback(this.content);
        } else {

            this.asyncRead(this.stream, function (streamContent) {
                streamObject.content = streamContent;
                callback(streamObject.content);
            });
        }
    }

    //Helps to read the stream Asynchroniously.
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

    // Verifies the entry format given the position in the collection.
    formatCheck(position, callback) {
        var streamObject = this;
        this.getStream(function (content) {
            if (streamObject.isJson(content) == false) {
                callback(false);
            }
            var jsonValue = JSON.parse(content);
            var context = Object.keys(jsonValue)[position];
            streamObject.setType(jsonValue[context]);
            if (streamObject.requiredFields(jsonValue, position) == false) {
                callback(false);
            } else {
                callback(true);
            }
        });
    }

    // Analices the stream so it can set the appropiate type for it.
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

    // Given the type checks that the entry contains the specified fields.
    requiredFields(content, position) {
        var context = Object.keys(content)[position];

        var contextAttributes = Object.keys(content[context]);
        var allowAttr = this.type;

        for (var attr in allowAttr) {
            attr = allowAttr[attr];
            if (!contextAttributes.includes(attr)) {
                return false;
            }
        }
        return true;
    }

    // Checks if given string is JSON.
    isJson(content) {
        try {
            JSON.parse(content);
        } catch (e) {
            return false;
        }
        return true;
    }

};