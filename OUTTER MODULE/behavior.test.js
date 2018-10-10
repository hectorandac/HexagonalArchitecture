expect = require('chai').expect;
should = require('chai').should();
StringProcessor = require('../INNER MODULE/models/StringProcessor');
_ = require('lodash');


var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('http://localhost:3000/');
driver.findElement(By.id('json_context')).sendKeys('{\n' +
    '  "age":\n' +
    '  {\n' +
    '    "type": "int",\n' +
    '    "min": 18,\n' +
    '    "max": 150\n' +
    '  },\n' +
    '  "amount":\n' +
    '  {\n' +
    '    "type": "int",\n' +
    '    "min": 35,\n' +
    '    "max": 67\n' +
    '  },\n' +
    '  "customerName":\n' +
    '  {\n' +
    '    "type":"string",\n' +
    '    "min":4,\n' +
    '    "max":10,\n' +
    '    "nullable":false,\n' +
    '    "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"\n' +
    '  },\n' +
    '  "customerNickName":\n' +
    '  {\n' +
    '    "type":"string",\n' +
    '    "min":4,\n' +
    '    "max":10,\n' +
    '    "nullable":true,\n' +
    '    "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"\n' +
    '  }\n' +
    '}');

function getValue(finish_call) {
    setTimeout(function () {
        driver.findElement(By.id('submit_btn')).click();
    }, 2000);

    setTimeout(function () {
        driver.findElement(By.id('container')).getAttribute('innerHTML').then(function (text) {
            var text_c = text;
            driver.close();
            finish_call(text_c);
        });
    }, 10000);

}

describe('Get the json proccesed', function (done) {
    var json = null;

    var testPromise = new Promise(function (resolve, reject) {
        getValue(function (test_text) {
            resolve(test_text);
        });
    });

    testPromise.then(function (result) {
        try {
            json = JSON.parse(result);
            expect(json.age.Valid[0]).to.equal(18);
        } catch (err) {
            done(err);
        }
    }, done);

    this.timeout(16000);

    it('Should check the age limmits to be 18 and 150', function (done) {
        setTimeout(function (){
            expect(json.age.Valid[0]).to.equal(18);
            expect(json.age.Valid[1]).to.equal(150);
            done();
        }, 15000);
    });

    it('Should check the age invalid limits to be 17 and 151', function (done) {
        setTimeout(function (){
            expect(json.age.Invalid[0]).to.equal(17);
            expect(json.age.Invalid[1]).to.equal(151);
            done();
        }, 1000);
    });


    it('Should check the amount valid limits to be 35 and 67', function (done) {
        setTimeout(function (){
            expect(json.amount.Valid[0]).to.equal(35);
            expect(json.amount.Valid[1]).to.equal(67);
            done();
        }, 1000);
    });

    it('Should check the amount invalid limits to be 34 and 68', function (done) {
        setTimeout(function (){
            expect(json.amount.Invalid[0]).to.equal(34);
            expect(json.amount.Invalid[1]).to.equal(68);
            done();
        }, 1000);
    });

    it('Should check the customerName valid limits', function (done) {
        setTimeout(function (){
            var temp_json = JSON.parse('{' +
            '    "type":"string",' +
            '    "min":4,' +
            '    "max":10,' +
            '    "nullable":false,' +
            '    "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"' +
            '  }');
            
            expect(StringProcessor.processSringData(json.customerName.Valid[0], temp_json)).to.equal('Valid');
            expect(StringProcessor.processSringData(json.customerName.Valid[1], temp_json)).to.equal('Valid');
            expect(StringProcessor.processSringData(json.customerName.Valid[2], temp_json)).to.equal('Valid');

            done();
        }, 1000);
    });

    it('Should check the customerName invalid limits', function (done) {
        setTimeout(function (){
            var temp_json = JSON.parse('{' +
            '    "type":"string",' +
            '    "min":4,' +
            '    "max":10,' +
            '    "nullable":false,' +
            '    "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"' +
            '  }');
            
            expect(StringProcessor.processSringData(json.customerName.Invalid[0], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerName.Invalid[1], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerName.Invalid[4], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerName.Invalid[2], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerName.Invalid[3], temp_json)).to.equal('Invalid');

            done();
        }, 1000);
    });

    it('Should check the customerNickName valid limits', function (done) {
        setTimeout(function (){
            var temp_json = JSON.parse('{' +
            '    "type":"string",' +
            '    "min":4,' +
            '    "max":10,' +
            '    "nullable":true,' +
            '    "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"' +
            '  }');
            
            expect(StringProcessor.processSringData(json.customerNickName.Valid[0], temp_json)).to.equal('Valid');
            expect(StringProcessor.processSringData(json.customerNickName.Valid[1], temp_json)).to.equal('Valid');
            expect(StringProcessor.processSringData(json.customerNickName.Valid[2], temp_json)).to.equal('Valid');

            done();
        }, 1000);
    });

    it('Should check the customerNickName invalid limits', function (done) {
        setTimeout(function (){
            var temp_json = JSON.parse('{' +
            '    "type":"string",' +
            '    "min":4,' +
            '    "max":10,' +
            '    "nullable":false,' +
            '    "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"' +
            '  }');
            
            expect(StringProcessor.processSringData(json.customerNickName.Invalid[0], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerNickName.Invalid[1], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerNickName.Invalid[4], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerNickName.Invalid[2], temp_json)).to.equal('Invalid');
            expect(StringProcessor.processSringData(json.customerNickName.Invalid[3], temp_json)).to.equal('Invalid');

            done();
        }, 1000);
    });
    
});