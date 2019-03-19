var {generateMessage,generateLocationMessage} = require('./message')

describe('GENERATE Message',()=>{

    it('should generate correct message object',()=>{
        let from = 'deepak19.engg@gmail.com';
        let text = 'how are you baby';

        let res = generateMessage(from,text);

            expect(res.from).toBe(from);
            expect(res.text).toBe(text);
            expect(typeof res.createdAt).toBe('number')
    })

})

describe('GENERATE location Message',()=>{

    it('should generate correct location message object',()=>{
        let from = 'Admin';
        let lat = 135.165;
        let long = -76.23;

        let res = generateLocationMessage(from,lat,long)
            expect(res.from).toBe(from)    
            expect(res.url).toBe(`https://www.google.com/maps?q=135.165,-76.23`)    
            expect(typeof res.createdAt).toBe('number')    
    })

})