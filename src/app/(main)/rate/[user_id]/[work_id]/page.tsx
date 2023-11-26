import { RateForm } from '@/components/rate/RateForm';
import { isAuthorized } from './fetch';

interface IRateUserProps {
	params: {
		user_id: string;
		work_id: string;
	};
	searchParams: {
		token: string;
	};
}

export default async function RateUser({
	params: { user_id, work_id },
	searchParams,
}: IRateUserProps) {
	const { name } = await isAuthorized({ user_id, work_id, ...searchParams });

	return (
		<main className="flex flex-col items-center">
			<h1 className="font-bold text-white text-3xl mb-8">
				Avalie {name}{' '}
			</h1>

			<RateForm rated_id={user_id} work_id={work_id} {...searchParams} />
		</main>
	);
}
