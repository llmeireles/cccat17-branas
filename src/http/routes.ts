import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { env } from "../env";
import { signupController } from "./controllers/signUp";

export async function appRoutes(app:FastifyInstance){
    app.get('/environment',
        (request:FastifyRequest,reply:FastifyReply) => {
        return reply.status(200).send({environment: env.NODE_ENV})
    })

    app.post('/signup', signupController)
    
}