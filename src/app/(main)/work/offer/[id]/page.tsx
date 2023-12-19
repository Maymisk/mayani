import { WorkOfferForm } from '@/components/workOffer/workOfferForm';
import { getWorkOffer } from './fetch';
import { FakeWorkOfferForm } from '@/components/workOffer/fakeWorkOfferForm';

interface IWorkOfferProps {
	params: {
		id: string;
	};
}

export default async function WorkOffer({ params: { id } }: IWorkOfferProps) {
	const { author, offer } = await getWorkOffer(id);
	const authorIsWorker = author.auth_id === offer.worker_id;

	return (
		<main className="max-xl:px-4">
			<h2 className="font-bold text-white text-3xl mx-auto mb-4 w-fit">
				{authorIsWorker ? 'Contraproposta' : 'Oferta de trabalho'}
			</h2>

			{offer.status === 'PENDING' ? (
				<WorkOfferForm author={author} offer={offer} />
			) : (
				<FakeWorkOfferForm author={author} offer={offer} />
			)}
		</main>
	);
}
