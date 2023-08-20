'use client';

import { useEffect, useState } from 'react';
import { JobCard } from './JobCard';

interface IJob {
	id: string;
	name: string;
	bio: string;
	occupation: string;
	avatar_url: string;
	rating: number;
}

type IData = IJob[];

const sample = [
	{
		id: '123',
		name: 'Khalil Bohner',
		bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, officia.',
		avatar_url: 'https://github.com/Maymisk.png',
		occupation: 'Programmer',
		rating: 4.9,
	},
	{
		id: '123',
		name: 'Khalil Bohner',
		bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, officia.',
		avatar_url: 'https://github.com/Maymisk.png',
		occupation: 'Programmer',
		rating: 4.9,
	},
	{
		id: '123',
		name: 'Khalil Bohner',
		bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quis animi iusto? Optio, quas! Nemo optio ea libero. Voluptas a quisquam itaque! Sint tempora culpa quasi repellendus reiciendis quod. Dolorum expedita sapiente molestias itaque ratione perspiciatis dolore? Explicabo quos commodi sapiente sunt nam porro ea perspiciatis, esse adipisci, vero voluptatibus sequi aliquam illum deserunt dolor ipsam nihil? Modi earum consectetur officia recusandae a beatae deserunt, saepe maiores atque ullam! Consequuntur quos dolorum molestias dolores illo quam cupiditate nesciunt sint ducimus maiores nostrum tempora aliquid, hic ipsa doloribus quisquam praesentium, neque unde natus reprehenderit distinctio reiciendis voluptas aliquam minima. Reiciendis, quisquam!',
		avatar_url: 'https://github.com/Maymisk.png',
		occupation: 'Programmer',
		rating: 4.9,
	},
];

export function JobSearch() {
	const [query, setQuery] = useState('');
	const [data, setData] = useState<IData>(sample);

	useEffect(() => {
		const timeout = setTimeout(async () => {}, 1500);

		return () => clearTimeout(timeout);
	}, [query]);

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

			<div className="grid grid-cols-2 gap-8 mt-12">
				{data.map(job => (
					<JobCard key={job.id} {...job} />
				))}
			</div>
		</section>
	);
}
