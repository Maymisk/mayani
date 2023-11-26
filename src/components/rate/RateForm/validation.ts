import * as yup from 'yup';

export const validation = yup.object({
	title: yup.string().required('Escreva um título'),
	description: yup.string(),
	rating: yup.string().default('0'),
});
