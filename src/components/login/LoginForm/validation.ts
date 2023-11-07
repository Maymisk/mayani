import * as yup from 'yup';

const validation = yup.object({
	email: yup
		.string()
		.email('Insira um email válido')
		.required('O email é necessário.'),
	password: yup.string().required('A senha é necessária.'),
});

export { validation };
