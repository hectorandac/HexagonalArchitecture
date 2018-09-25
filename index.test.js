expect = require('chai').expect
const Readable = require('stream').Readable
should =  require('chai').should()
_ = require('lodash')

const IntProcessor = require('./models/IntProcessor')
const StringProcesor = require('./models/StringProcessor')


describe('#calcRangeMaxMin',()=>{
  it("input min=18 max=150 and return {valid: [18,150], invalid:[17,18]}",()=>{
    let res = {
      'valid':[ 18, 150 ],
      'invalid':[ 17, 151 ]
    };

    var ObjProcesor = IntProcessor.calcRangeMaxMin(18,150);

    ObjProcesor.valid[0].should.be.equal(res.valid[0]);
    ObjProcesor.valid[1].should.be.equal(res.valid[1]);
    ObjProcesor.invalid[0].should.be.equal(res.invalid[0]);
    ObjProcesor.invalid[1].should.be.equal(res.invalid[1]);

  });
})

/*
describe('#constructorFunctionality', () => {
  it ( "Sendig stream to constructor", () => {
    let string = '{"age": {"type": "int", "min": 18, "max": 150}}';
    var s = new Readable;
    s.push(string);
    s.push(null);
    let limitProcessor = new LimitProcessor(s, function(result){
      JSON.stringify(result).should.be.equal('[{"key":"age","MaxMin":{"valid":[18,150],"invalid":[17,151]}}]');
    })
  })
});
*/

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
});

/*
describe('#stringGenerator', () => {
    it("test string generetor alphabet ABC and lenght 3",()=>{
        let res = StringProcesor.stringGenerator('ab',2);

        res.should.be.incu(["aa","ab", "ba", "bb"])




    });
});
*/
/*describe('#Inputs file',()=>{
it("input is blank return The file path can not be empty or null",()=>{
expect(function(){ new LimitProcessor('') }).throw('The file path can not be empty or null')
});
it("input not exist and return Could not find the file",()=>{
expect(function(){ new LimitProcessor('notexistfile') }).throw('Could not find the file')
});
it("input is a file have bad format return Invalid format",()=>{
expect(function(){ new LimitProcessor('context-bad-format.json') }).throw('Invalid format')
});
it("input is a file have bad format return Invalid format",()=>{
expect(function(){ new LimitProcessor('context-bad-json.json') }).throw('Invalid format')
});
});*/
