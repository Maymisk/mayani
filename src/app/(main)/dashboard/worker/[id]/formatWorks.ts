import { WorkStatus } from '@/utils/WorkStatus';
import { getMonth, isSameMonth, isSameYear } from 'date-fns';

interface IWork {
	id: string;
	price: number;
	end_date: string | null;
	created_at: string;
	users: {
		workers: {
			name: string;
			worker_profiles: {
				avatar: string | null;
			};
		};
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
			users: {
				workers: {
					name,
					worker_profiles: { avatar },
				},
			},
		} = work;

		const client = {
			name,
			avatar,
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
			price,
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
