const {isRealString} = require('./validation');

describe('validation Functions',()=>{

    it('it should return true if string is real',()=>{
        let res = isRealString('Hey Deepak')
        expect(res).toBe(true)
    })

    it('should return false on empty string',()=>{
        let res = isRealString('    ')
        expect(res).toBe(false)
    })

    it('should return false on any number',()=>{
        let res = isRealString(120)
        expect(res).toBe(false)
    })

})