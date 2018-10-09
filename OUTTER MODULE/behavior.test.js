expect = require('chai').expect;
const Readable = require('stream').Readable;
should =  require('chai').should();
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
driver.findElement(By.id('submit_btn')).click();

setTimeout(function () {
    var promise = driver.findElement(By.id('raul')).getAttribute('value');

    promise.then(function (text) {
        var data = JSON.parse(text);

        console.log(text)


        driver.close()
    })


},5*1000);














/*

driver.wait(check_raul,10000);

function check_raul() {
    var promise = driver.findElement(By.id('raul')).then(function (raul) {
        console.log(raul)
        console.log('fail')
        return true
    });

    return promise
}



driver.wait(function () {

    return driver.findElement(By.id('raul')).isDisplayed();
},10*10000).then(function () {
    var raul = driver.findElement(By.id('raul'));
    var data = JSON.parse(raul.value);
    console.log(data);
});*/

