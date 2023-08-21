import * as yup from 'yup';

const validation = yup.object({
	email: yup
		.string()
		.email('Insira um email válido')
		.required('O email é necessário.'),
	password: yup.string().required('A senha é necessária.'),
});

interface IValidation {
	email: string;
	password: string;
}

interface IError {
	path: string | undefined;
	message: string;
}

async function validate(props: IValidation): Promise<undefined | IError> {
	try {
		await validation.validate(props);
	} catch (error) {
		if (error instanceof yup.ValidationError)
			return { path: error.path, message: error.message };
		else throw error;
	}
}

export { validate };
