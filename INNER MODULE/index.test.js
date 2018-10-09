expect = require('chai').expect;
const Readable = require('stream').Readable;
should =  require('chai').should();
_ = require('lodash');

const IntProcessor = require('./models/IntProcessor');
const StringProcesor = require('./models/StringProcessor');


describe('#calcRangeMaxMin',()=>{
  it("input min=18 max=150 and return {valid: [18,150], invalid:[17,18]}",()=>{
    let res = {
      'Valid':[ 18, 150 ],
      'Invalid':[ 17, 151 ]
    };

    var ObjProcesor = IntProcessor.calcRangeMaxMin(18,150);

    ObjProcesor.Valid[0].should.be.equal(res.Valid[0]);
    ObjProcesor.Valid[1].should.be.equal(res.Valid[1]);
    ObjProcesor.Invalid[0].should.be.equal(res.Invalid[0]);
    ObjProcesor.Invalid[1].should.be.equal(res.Invalid[1]);

  });
});


describe('#processSringData', () => {
    it("testing string data have min length",()=>{
        let res = StringProcesor.processSringData('Raul', {
            type:"string",
            min:4,
            max:10,
            nullable:false,
            alphabet:"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM "
        });
        res.should.be.equal('Valid');
    });
    it("testing string data no have min length",()=>{
        let res = StringProcesor.processSringData('Ron', {
            type:"string",
            min:4,
            max:10,
            nullable:false,
            alphabet:"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM "
        });
        res.should.be.equal('Invalid');
    });
    it("testing string data have max length",()=>{
        let res = StringProcesor.processSringData('Altagracia', {
            type:"string",
            min:4,
            max:10,
            nullable:false,
            alphabet:"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM "
        });
        res.should.be.equal('Valid');
    });
    it("testing string process data no have max length",()=>{
        let res = StringProcesor.processSringData('Altagracias', {
            type:"string",
            min:4,
            max:10,
            nullable:false,
            alphabet:"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM "
        });
        res.should.be.equal('Invalid');
    });
    it("testing string process data is null but nulllable True",()=>{
        let res = StringProcesor.processSringData(null, {
            type:"string",
            min:4,
            max:10,
            nullable:true,
            alphabet:"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM "
        });
        res.should.be.equal('Valid');
    });
    it("testing string process data is null but nulllable False",()=>{
        let res = StringProcesor.processSringData(null, {
            type:"string",
            min:4,
            max:10,
            nullable:false,
            alphabet:"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM "
        });
        res.should.be.equal('Invalid');
    });
    it("testing string process data is data have letter in alphabet",()=>{
        let res = StringProcesor.processSringData('data', {
            type:"string",
            min:4,
            max:10,
            nullable:false,
            alphabet:"abc"
        });
        res.should.be.equal('Invalid');
    });
});

describe('#stringGenerator', () => {
    it("test string generetor alphabet ABC and lenght d3",()=>{
        let res = StringProcesor.stringGenerator('ab',2);

        ["aa","ab", "ba", "bb"].includes(res).should.be.true


    });
});


describe('#stringGenerateVanvalid', () => {
    var conditions = {
        "type":"string",
        "min":4,
        "max":10,
        "nullable":true,
        "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"
    };
    var res = StringProcesor.getValids(conditions);

    it("Test wen in conditions nullable is True",()=>{
        res.includes(null).should.be.true
    });

    it("test case 2 have min leght",()=>{

        (res[1].length).should.be.equal(conditions.min)
    });

    it("test case 3 have max leght",()=>{

        (res[2].length).should.be.equal(conditions.max)
    });

    it("test case 4 have media legth",()=>{
        var medium = Math.round(((conditions.max - conditions.min) / 2) + conditions.min);

        (res[3].length).should.be.equal(medium)
    });

});

describe('#stringGenerateInvalids', () => {
    var conditions = {
        "type":"string",
        "min":4,
        "max":10,
        "nullable":false,
        "alphabet":"qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM"
    };
    var res = StringProcesor.getInvalids(conditions);

    it("Test wen in conditions nullable is False",()=>{
        res.includes(null).should.be.true
    });

    it("test case 2 have min leght - 1",()=>{

        (res[1].length).should.be.equal(conditions.min-1)
    });

    it("test case 3 have max leght + 1",()=>{

        (res[2].length).should.be.equal(conditions.max+1)
    });

});


