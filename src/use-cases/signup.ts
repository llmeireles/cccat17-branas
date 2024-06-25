import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "../utils/validadeCpf";

export const ACCOUNT_EXISTS_MESSAGE_ERROR = "There is already an account registered with this e-mail"
export const ACCOUNT_INVALID_NAME = "The account name is invalid" 
export const ACCOUNT_INVALID_EMAIL = "The account email is invalid" 
export const ACCOUNT_INVALID_CPF = "The account CPF is invalid" 
export const ACCOUNT_INVALID_CAR_PLATE = "The account CARPLATE is invalid" 

export async function signup (accountToBeCreated: any): Promise<any> {
	const dataBaseConnection = pgp()("postgres://docker:docker@localhost:5432/cccat17?schema=public");
	try {
		const [account] = await dataBaseConnection.query("select * from cccat17.public.account where email = $1", [accountToBeCreated.email]);
		if (account) throw new Error(ACCOUNT_EXISTS_MESSAGE_ERROR);
		
		if(validateAccountDataToBeCreated(accountToBeCreated)){
			const idNewAccount = GetNewAccountId();
			await dataBaseConnection.query("insert into cccat17.public.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [idNewAccount, accountToBeCreated.name, accountToBeCreated.email, accountToBeCreated.cpf, accountToBeCreated.carPlate, !!accountToBeCreated.isPassenger, !!accountToBeCreated.isDriver]);
			const accountCreated = {
				accountId: idNewAccount
			};
			return accountCreated;
		}
	} catch(e){
		return (e as Error)
	} finally {
		await dataBaseConnection.$pool.end();
	}
}

function GetNewAccountId() {
	return crypto.randomUUID();
}

function validateAccountDataToBeCreated(accountToBeCreated: any) {
	const nameIsValid = accountToBeCreated.name.match(/[a-zA-Z] [a-zA-Z]+/);
	if(!nameIsValid) throw new Error(ACCOUNT_INVALID_NAME);
	const emailIsValid = accountToBeCreated.email.match(/^(.+)@(.+)$/)
	if(!emailIsValid) throw new Error(ACCOUNT_INVALID_EMAIL);

	const cpfIsValid = validateCpf(accountToBeCreated.cpf);
	if(!cpfIsValid) throw new Error(ACCOUNT_INVALID_CPF);
	const carPlateIsValid = accountToBeCreated.carPlate.match(/[A-Z]{3}[0-9]{4}/)
	if(accountToBeCreated.isDriver && !carPlateIsValid) throw new Error(ACCOUNT_INVALID_CAR_PLATE)

	return true;
}
