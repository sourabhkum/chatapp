const expect=require('expect');
var{generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
    it('Should generate correct message object',()=>{
        var from='sourabh';
        var text='Hello how are you'
        var message=generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text})        

    });
});
describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from='Admin';
        var latitude=18.4887761;
        var longitude=73.8167789;
        var url='https://www.google.com/maps?q=18.4887761,73.8167789'
        var message=generateLocationMessage(from,latitude,longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    })
})