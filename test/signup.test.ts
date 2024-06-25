import { ACCOUNT_EXISTS_MESSAGE_ERROR, 
        ACCOUNT_INVALID_CAR_PLATE, 
        ACCOUNT_INVALID_CPF, 
        ACCOUNT_INVALID_EMAIL, 
        ACCOUNT_INVALID_NAME, 
        signup } from "../src/use-cases/signup";

test("Deve retornar um erro ao fazer signup com e-mail existente", async () => {
    const account =  { email: "john_doe@gmail.com" }
    const exceptionExpected = await signup(account)
    expect(exceptionExpected.message).toBe(ACCOUNT_EXISTS_MESSAGE_ERROR);
})

test("Deve retornar um erro quando o nome é inválido", async() => {
    const invalidName = "JohnDoe"
    const account =  { name: invalidName , email: "john_doe99@gmail.com"}
    const exceptionExpected = await signup(account)
    expect(exceptionExpected.message).toBe(ACCOUNT_INVALID_NAME);
})

test("Deve retornar um erro quando o email é inválido", async() => {
    const invalidEmail = "john_doe99gmail.com"
    const account =  {name: "John Doe 99" , email: invalidEmail}
    const exceptionExpected = await signup(account)
    expect(exceptionExpected.message).toBe(ACCOUNT_INVALID_EMAIL);
})

test("Deve retornar um erro quando o cpf é inválido", async() => {
    const invalidCpf = "11111111111"
    const account =  {name: "John Doe 99" , email: "john_doe99@gmail.com", cpf:invalidCpf}
    const exceptionExpected = await signup(account)
    expect(exceptionExpected.message).toBe(ACCOUNT_INVALID_CPF);
})

test("Deve retornar um erro quando o carplate é inválido quando é um signup de motorista", async() => {
    const invalidCarPlate = "@@@"
    const account =  {
                        name: "John Doe 99" , 
                        email: "john_doe99@gmail.com", 
                        cpf:"43262835722",
                        carPlate: invalidCarPlate,
                        isDriver: true
                    }
    const exceptionExpected = await signup(account)
    expect(exceptionExpected.message).toBe(ACCOUNT_INVALID_CAR_PLATE);
})

test("Deve inserir uma nova account de Passageiro", async ()=> {
    const accountPassenger =  {
        name: "John Doe 99" , 
        email: "john_doe99@gmail.com", 
        cpf:"43262835722",
        carPlate: "",
        isDriver: false,
        isPassenger: true
    }

    const accountCreated = await signup(accountPassenger);
    expect(accountCreated.accountId).not.toBeNull()
})