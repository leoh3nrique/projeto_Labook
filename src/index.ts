import express from "express";
import cors from "cors"
import { userRouter } from "./router/UserRouter";
import dotenv from "dotenv"
import { postRouter } from "./router/PostRouter";

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(Number(process.env.PORT) || 3003,()=>{
    console.log(`Servidor rodando na porta ${(process.env.PORT) || 3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter)