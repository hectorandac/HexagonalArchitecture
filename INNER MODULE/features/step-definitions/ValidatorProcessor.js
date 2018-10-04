const { Given, When, Then } = require('cucumber')
const { expect } = require('chai');
const LP = require('../../models/IntProcessor.js');


Given('that the user types the name {string}', function (string) {
  this.setPath(string);
});


Then('he will receive an error like {string}', function (string) {
  this.getResults(function(currentValue){
    expect(currentValue.trim('\n')).to.equal(string)
  });
});

Given('the format check gives {string}', function (string) {
  this.formatCheck(function(currentFormat){
    expect(currentFormat.trim('\n')).to.equal(string);
  });
});

Then('he will receive an error like {string} on Proccess', function (string) {
  
});

Then('he will receive a result like {string} on Proccess', function (string) {
  this.getResults(function(currentValue){
    expect(currentValue.toString().trim('\n')).to.equal(string);
  });
});
