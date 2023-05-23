import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/createUserDto";
import { User, UserDB } from "../models/User";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ) {
    }
    public getUsers = async () => {
        const usersDB = await this.userDatabase.getUsers()
        
        const users: User[] = usersDB.map((usersDB) => new User(
            usersDB.id,
            usersDB.name,
            usersDB.email,
            usersDB.password,
            usersDB.role,
            usersDB.created_at
        ))

        const output = users.map(user => ({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            createdAt: user.getCreatedAt()
        }))
        
        return output

    }
    public createUsers = async (input: CreateUserInputDTO): Promise<CreateUserOutputDTO> => {
        const { id, name, email, password, role } = input


        const user = new User(
            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            created_at: user.getCreatedAt(),
        }

        await this.userDatabase.insertUser(newUserDB)

        const output: CreateUserOutputDTO = {
            message: `Usuario cadastrado com sucesso. Seja bem vindo `,
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                created_at: user.getRole(),
            }
        }
        return output
    }
}