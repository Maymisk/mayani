'use client';

import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { Database } from '@root/supabase/databaseTypes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { NoWorkers } from '../../empty/NoWorkers';
import { WorkerCard } from '../WorkerCard';
import { searchWorkers } from './fetch';

interface IWorker {
	auth_id: string;
	name: string;
	bio: string | null;
	avatar: string | null;
	rating: number;
}

type IData = IWorker[];

interface IJobSearchProps {
	initialData: IData | null;
}

export function WorkerSearch({ initialData }: IJobSearchProps) {
	const supabase = createClientComponentClient<Database>();

	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<IData | null>(initialData);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			if (query === '') return setData(initialData);

			setIsLoading(true);

			setData(await searchWorkers(query, supabase));

			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [query, initialData]);

	return (
		<section className="mt-[5.25rem]">
			<h2 className="text-center text-blue100 font-bold text-2xl mb-2 hover:scale-105 transition-all">
				Procure profissionais por todo o mercado
			</h2>

			<input
				type="text"
				className="w-full h-[3.5rem] rounded-md px-4 py-3 bg-gray400 text-blue100 outline-none hover:placeholder:text-blue500 transition-all"
				placeholder="Pesquisar por profissionais"
				onChange={e => setQuery(e.target.value)}
				value={query}
			/>

			{isLoading ? (
				<div className="w-full flex justify-center mt-12 text-white">
					<WrenchScrewdriverIcon
						width={30}
						height={30}
						className="animate-spin"
					/>
				</div>
			) : data ? (
				<div className="grid gap-8 mt-12 grid-cols-1 sm:grid-cols-2">
					{data?.map(worker => (
						<WorkerCard key={worker.auth_id} {...worker} />
					))}
				</div>
			) : (
				<NoWorkers />
			)}
		</section>
	);
}
