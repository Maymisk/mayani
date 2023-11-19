import * as yup from 'yup';
import { addHours } from 'date-fns';

export const validation = yup.object({
	title: yup.string().required('Escreva um título.'),
	description: yup.string().required('Escreva uma descrição detalhada.'),
	price: yup
		.number()
		.required('Defina um preço.')
		.typeError('Selecione uma data')
		.min(50, 'O preço mínimo é 50 reais.'),
	date: yup
		.date()
		.required('Selecione uma data.')
		.typeError('Selecione uma data')
		.min(addHours(new Date(), 1), 'Selecione uma data mais adiante.'),
});
