import { HireForm } from '@/components/hire/HireForm';
import { getWorker } from './fetch';

interface IHireProps {
	params: {
		id: string;
	};
}

export default async function Hire({ params: { id } }: IHireProps) {
	const { name } = await getWorker(id);

	return (
		<main className="mx-auto w-full">
			<div className="w-full flex flex-col items-center">
				<h1 className="text-3xl text-white font-bold mb-4">
					Contratar {name}
				</h1>

				<HireForm worker={{ id, name }} />
			</div>
		</main>
	);
}
