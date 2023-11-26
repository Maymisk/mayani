import { addHours } from 'date-fns';
import * as yup from 'yup';

export const validation = yup.object({
	price: yup
		.number()
		.required('O número é necessário')
		.typeError('O valor deve ser um número'),
	start_date: yup
		.date()
		.required('Selecione uma data')
		.typeError('Selecione uma data')
		.min(addHours(new Date(), 1)),
});
