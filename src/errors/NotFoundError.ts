import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(
        message: string = "Requisição inválida" // mensagem de erro padrão caso não seja enviado um argumento
    ) {
        super(404, message)
    }
}