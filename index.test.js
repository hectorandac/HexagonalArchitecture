expect = require('chai').expect
const Readable = require('stream').Readable
should =  require('chai').should()
_ = require('lodash')

const LimitProcessor = require('./models/LimitProcessor')


describe('#calcRangeMaxMin',()=>{
  it("input min=18 max=150 and return {valid: [18,150], invalid:[17,18]}",()=>{
    let res = {
      'valid':[ 18, 150 ],
      'invalid':[ 17, 151 ]
    };

    limit_processor = LimitProcessor.calcRangeMaxMin(18,150);

    limit_processor.valid[0].should.be.equal(res.valid[0]);
    limit_processor.valid[1].should.be.equal(res.valid[1]);
    limit_processor.invalid[0].should.be.equal(res.invalid[0]);
    limit_processor.invalid[1].should.be.equal(res.invalid[1]);

  });
})

describe('#constructorFunctionality', () => {
  it ( "Sendig stream to constructor", () => {
    let string = '{"age": {"type": "int", "min": 18, "max": 150}}';
    var s = new Readable;
    s.push(string);
    s.push(null);
    let limitProcessor = new LimitProcessor(s, function(result){
      JSON.stringify(result).should.be.equal('{"valid":[18,150],"invalid":[17,151]}');
    }
  })
});

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
