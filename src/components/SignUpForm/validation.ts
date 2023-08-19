import * as yup from 'yup';

const validation = yup.object({
	email: yup
		.string()
		.email('Insira um email válido')
		.required('O email é necessário.'),
	password: yup.string().required('A senha é necessária.'),
	passwordConfirmation: yup
		.string()
		.required('Confirme a senha.')
		.oneOf([yup.ref('password')], 'As senhas devem combinar.'),
});

interface IValidate {
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface IError {
	path: string | undefined;
	message: string;
}

async function validate(props: IValidate): Promise<IError | undefined> {
	try {
		await validation.validate(props);
	} catch (err) {
		if (err instanceof yup.ValidationError)
			return { path: err.path, message: err.message };
		else throw err;
	}
}

export { validate };
