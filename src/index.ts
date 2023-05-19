import express from "express";
import cors from "cors"
import { UserController } from "./controller/UserController";
import { UserBusiness } from "./business/UserBusiness";
import { UserDatabase } from "./database/UserDatabase";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003,()=>{
    console.log("Servidor rodando na porta 3003")
})

const userController = new UserController(new UserBusiness(new UserDatabase()))

app.get("/users", userController.getUsers )