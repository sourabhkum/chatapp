const expect=require('expect');
var{generateMessage}=require('./message');

describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{
        var from='sourabh';
        var text='Hello how are you'
        var message=generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text})        

    });
});