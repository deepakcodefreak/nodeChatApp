
class Users{

   constructor(){
       this.users = [];
   }

   addUser(id,name,room){
       let user = {
           id,
           name,
           room
       }
         this.users.push(user);
   }

   removeUser(id){
    let user = this.getUser(id)    
    this.users = this.users.filter((user)=>user.id !== id)
       return user;
   }

   getUser(id){
       return this.users.filter((user)=>user.id === id)[0]
   }

   getUserList(room){
       let users =  this.users.filter((user)=>user.room === room)
       let userNames = users.map((user)=>user.name)
       return userNames;
   }

}


module.exports = {
    Users
}