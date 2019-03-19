const {Users} = require('./users');


describe('USER class',()=>{

    var users;

    beforeEach(()=>{
        users = new Users();

        users.users = [
            {
                id:1,
                name:'Deepak',
                room:'A'
            },
            {
                id:2,
                name:'Panny',
                room:'A'
            },
            {
                id:3,
                name:'Gautam',
                room:'B'
            },
        ]
    })



    it('should add a new user',()=>{
        var users = new Users();

        let newUser = {
            id:4,
            name:'Deepu',
            room:'C'
        }

        var resuser = users.addUser(newUser.id,newUser.name,newUser.room);
        expect(users.users).toEqual([newUser])
        
    })

    it('should remove a user',()=>{
        let userRemoved = users.removeUser(3);

        expect(users.users.length).toBe(2)
        expect(userRemoved.id).toBe(3)
    })

    it('should not remove a user',()=>{
        let userRemoved = users.removeUser(100);
        expect(userRemoved).not.toBeTruthy()
        expect(users.users.length).toBe(3)
    })

    it('Should find a user',()=>{
        let user = users.getUser(2);
        expect(user).toEqual({id:2,name:'Panny',room:'A'})
    })

    it('Should not return the user',()=>{
        let user = users.getUser(10);
        expect(user).not.toEqual(expect.anything())
    })

    it('should return the names of user for room A',()=>{
        let findUsers = users.getUserList('A');
        expect(findUsers).toEqual(['Deepak','Panny'])
    })

    it('should return the names of users for room B',()=>{
        let findUsers = users.getUserList('B');
        expect(findUsers).toEqual(['Gautam'])
    })

})