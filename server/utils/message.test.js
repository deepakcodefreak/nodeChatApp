var {generateMessage} = require('./message')

describe('GENERATE Message',()=>{

    it('should generate correct message object',()=>{
        let from = 'deepak19.engg@gmail.com';
        let text = 'how are you baby';

        let res = generateMessage(from,text);

        expect((res)=>{
            expect(res.from).toBe(from);
            expect(res.text).toBe(text);
            expect(typeof res.createdAt).toBe('number')
        })
    })

})