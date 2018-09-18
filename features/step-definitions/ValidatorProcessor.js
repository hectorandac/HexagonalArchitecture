const { Given, When, Then } = require('cucumber')
const { expect } = require('chai');
const LP = require('../../models/LimitProcessor.js');


Given('that the user types the name {string}', function (string) {
  this.setPath(string);
});


Then('he will receive an error like {string}', function (string) {
  this.getResults(function(currentValue){
    var value = currentValue.toString().trim('\\n');
    var sections = value.split("\n");
    if (sections.length > 5){
      expect(sections[4]).to.equal(string);
    } else {
      expect(sections[0]).to.equal(string);
    }
  });
});

Given('the format check gives {string}', function (string) {
  this.formatCheck(function(currentFormat){
    expect(currentFormat.trim('\n')).to.equal(string);
  });
});

Then('he will receive an error like {string} on Proccess', function (string) {
  this.getResults(function(currentValue){
    expect(currentValue.toString().split('\n')[4]).to.equal(string);
  });
});

Then('he will receive a result like {string} on Proccess', function (string) {
  this.getResults(function(currentValue){
    expect(currentValue.toString().trim('\\n')).to.equal(string);
  });
});
