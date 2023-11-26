import { WorkOfferForm } from '@/components/workOffer/workOfferForm';
import { getWorkOffer } from './fetch';

interface IWorkOfferProps {
	params: {
		id: string;
	};
}

export default async function WorkOffer({ params: { id } }: IWorkOfferProps) {
	const { author, offer } = await getWorkOffer(id);
	const authorIsWorker = author.auth_id === offer.worker_id;

	return (
		<main>
			<h2 className="font-bold text-white text-3xl mx-auto mb-4 w-fit">
				{authorIsWorker ? 'Contraproposta' : 'Oferta de trabalho'}
			</h2>

			<WorkOfferForm author={author} offer={offer} />
		</main>
	);
}
