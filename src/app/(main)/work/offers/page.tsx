import { WorkOfferCard } from '@/components/workOffers/WorkOfferCard';
import { getWorkOffers } from './fetch';

export default async function WorkOffers() {
	const workOffers = await getWorkOffers();

	return (
		<main
			className={`grid gap-8 max-xl:grid-cols-1 max-xl:px-4 ${
				workOffers.length > 0 ? 'grid-cols-2' : 'grid-cols-1'
			} md:grid-cols-1`}
		>
			{workOffers.map(workOffer => (
				<WorkOfferCard key={workOffer.id} {...workOffer} />
			))}
		</main>
	);
}
