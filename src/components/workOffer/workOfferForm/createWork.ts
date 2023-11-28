import { api } from '@/services/api';
import { IOffer } from './types';

export async function createWork(offer: IOffer, author_id: string) {
	const { status, id, ...workData } = offer;

	const response = await api.post('/work', {
		...workData,
		offer: {
			id,
			author_id,
		},
	});

	return response;
}
