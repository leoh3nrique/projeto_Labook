import { UserDatabase } from "../database/UserDatabase";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/users/createUserDto";
import { SignupInputDto, SignupOutputDto } from "../dtos/users/signup.dto";
import { TokenPayload, USER_ROLES, User, UserDB } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import dotenv from "dotenv"
import { TokenManager } from "../services/TokenManager";
import { LoginInputDto, LoginOutputDto } from "../dtos/users/login.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

dotenv.config()

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ) { }

    public signup = async (input: SignupInputDto): Promise<SignupOutputDto> => {
        const { name, email, password } = input

        const userDB = await this.userDatabase.findUsersByEmail(email)
        if (userDB) {
            throw new BadRequestError("Email já cadastrado, tente outro.")
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const newUser = () => {
            const user = new User(
                id,
                name,
                email,
                hashedPassword,
                USER_ROLES.NORMAL,
                new Date().toISOString()
            )
            return user.toDBModel()
        }

        await this.userDatabase.insertUser(newUser())

        const tokenPayload: TokenPayload = {
            id: newUser().id,
            name: newUser().name,
            role: newUser().role
        }
        const token = this.tokenManager.createToken(tokenPayload)


        const output: SignupOutputDto = {
            token: token
        }

        return output
    }

    public login = async (input: LoginInputDto): Promise<LoginOutputDto> => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUsersByEmail(email)
        if (!userDB) {
            throw new NotFoundError("Usuario não encontrado")
        }

        const hashedPassword = userDB.password
        
        const isCorrect = await this.hashManager.compare(password, hashedPassword)
        console.log(isCorrect)
        if (!isCorrect) {
            throw new BadRequestError("email ou senha inválidos")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )
        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        const output: LoginOutputDto = {
            token: token
        }
        return output
    }

}