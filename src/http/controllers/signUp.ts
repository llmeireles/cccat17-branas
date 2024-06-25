import { signup } from "../../use-cases/signup";
import { FastifyReply, FastifyRequest } from "fastify";
import { any, z } from "zod";

export async function signupController(request:FastifyRequest, reply:FastifyReply) {
    const signupBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cpf: z.string().min(11),
        carPlate: z.string(),
        isPassenger: z.boolean(),
        isDriver: z.boolean()
      })

    const { name, email, cpf, carPlate, isPassenger, isDriver } = signupBodySchema.parse(request.body)
    const accountToBeCreated = {
        name,
        email,
        cpf,
        carPlate,
        isPassenger,
        isDriver
    }
    
    let accountCreated:any;
    try{
        accountCreated = await signup(accountToBeCreated)

        if(accountCreated.message)
            return reply.status(400).send({accountCreatedId: accountCreated.message});
    }catch(err){
        throw err
    }

    return reply.status(201).send(accountCreated);
}