import { api } from '@/services/api';
import { IFormData, IOffer } from './types';

export async function createWorkOffer(
	offer: IOffer,
	{ price, start_date }: IFormData
) {
	const { price: _, status, start_date: __, id, ...previousOffer } = offer;

	const response = await api.post('/workOffer', {
		work_offer_id: id,
		price: price * 100,
		start_date: new Date(start_date).toISOString(),
		...previousOffer,
	});

	return response;
}
