import * as yup from 'yup';

const validation = yup.object({
	email: yup
		.string()
		.email('Insira um email válido')
		.required('O email é necessário.'),
	password: yup
		.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres')
		.required('A senha é necessária.'),
	passwordConfirmation: yup
		.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres')
		.required('Confirme a senha.')
		.oneOf([yup.ref('password')], 'As senhas devem combinar.'),
});

export { validation };
