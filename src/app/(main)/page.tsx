import { Advantages } from '@/components/landingPage/advantages';
import { LandingPageBanner } from '@/components/landingPage/banner';
import { Register } from '@/components/landingPage/register';
import { Services } from '@/components/landingPage/services';
import { Testimonials } from '@/components/landingPage/testimonials';

export default function LandingPage() {
	return (
		<main className="text-white">
			<LandingPageBanner />

			<Services />

			<Advantages />

			<Testimonials />

			<Register />
		</main>
	);
}
