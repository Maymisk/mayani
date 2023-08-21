'use client';

import { useEffect, useState } from 'react';
import { JobCard } from '../JobCard';
import { api } from '@/services/api';

interface IJob {
	id: string;
	name: string;
	bio: string;
	occupation: string;
	avatar_url: string;
	rating: number;
}

type IData = IJob[];

interface IJobSearchProps {
	initialData: IData;
}

export function JobSearch({ initialData }: IJobSearchProps) {
	const [query, setQuery] = useState('');
	const [data, setData] = useState<IData>(initialData);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			if (query === '') return setData(initialData);

			const jobs = await api.get(`/users/?q=${query}`);
			setData(jobs);
		}, 1200);

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

			<div className="grid gap-8 mt-12 grid-cols-1 sm:grid-cols-2">
				{data?.map(job => (
					<JobCard key={job.id} {...job} />
				))}
			</div>
		</section>
	);
}
