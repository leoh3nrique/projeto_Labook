import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";

export class UserBusiness{
    constructor(
        private userDatabase:UserDatabase
    ){
    }
    public getUsers = async() =>{
        const usersDB = await this.userDatabase.getUsers()    

        const users:User[] = usersDB.map((usersDB)=> new User(
            usersDB.id,
            usersDB.name,
            usersDB.email,
            usersDB.password,
            usersDB.role,
            usersDB.createdAt
        ))
        const output = users.map(user => ({
            id: user.getId(),
            name: user.getName(),
            email:user.getEmail(),
            password:user.getPassword(),
            role:user.getRole(),   
            createdAt: user.getCreatedAt()
          }))

          return output

    }
}