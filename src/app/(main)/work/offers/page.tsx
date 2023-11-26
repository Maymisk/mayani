import { WorkOfferCard } from '@/components/workOffers/WorkOfferCard';
import { getWorkOffers } from './fetch';

export default async function WorkOffers() {
	const workOffers = await getWorkOffers();

	return (
		<main className="grid grid-cols-1 gap-8">
			{workOffers.map(workOffer => (
				<WorkOfferCard key={workOffer.id} {...workOffer} />
			))}
		</main>
	);
}
