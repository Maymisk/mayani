import { WorkStatus } from '@/utils/WorkStatus';
import { getMonth, isSameMonth, isSameYear } from 'date-fns';

interface IProfile {
	avatar: string | null;
}

interface IWork {
	id: string;
	price: number;
	end_date: string | null;
	created_at: string;
	users: {
		name: string;
		worker_profiles: IProfile | null;
		client_profiles: IProfile | null;
	};
}

export function formatWorks(works: IWork[]) {
	const now = new Date();

	const statuses = {
		pending: 0,
		finished: 0,
		canceled: 0,
	};

	const monthlyIncome: number[] = new Array(12).fill(0);
	let annualIncome = 0;

	const formattedWorks = works.map(work => {
		const {
			id,
			created_at,
			price,
			end_date,
			users: { name, worker_profiles, client_profiles },
		} = work;

		const client = {
			name,
			avatar: worker_profiles
				? worker_profiles.avatar
				: client_profiles!.avatar,
		};

		if (end_date && isSameYear(new Date(end_date), now)) {
			const dateEndDate = new Date(end_date);
			const month = getMonth(dateEndDate);

			monthlyIncome[month - 1] += price;
			annualIncome += price;

			if (isSameMonth(now, dateEndDate)) statuses.finished++;
		}

		if (!end_date && isSameMonth(now, new Date(created_at)))
			statuses.pending++;

		const status = end_date ? WorkStatus.FINISHED : WorkStatus.PENDING;

		return {
			id,
			price: price / 100,
			status,
			client,
			created_at,
		};
	});

	return {
		works: {
			amount: works.length,
			sample: formattedWorks,
			statuses,
		},
		annualIncome,
		monthlyIncome,
	};
}
