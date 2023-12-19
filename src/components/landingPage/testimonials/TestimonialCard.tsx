import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

interface ITestimonialCardProps {
	author: string;
	detailing: string;
}

export function TestimonialCard({ author, detailing }: ITestimonialCardProps) {
	return (
		<div className="w-1/2 flex justify-between gap-6 shadow-md shadow-gray400 max-md:w-full">
			<Image
				src={'https://github.com/maymisk.png'}
				alt="User profile picture"
				width={300}
				height={300}
				className="rounded-l-md object-cover"
			/>

			<div className="px-4 py-8 flex flex-1 flex-col gap-3 justify-start rounded-r-md">
				<h2 className="font-bold text-xl">{author}</h2>

				<p className="font-extralight">{detailing}</p>

				<span className="font-bold uppercase text-sm block mt-auto">
					Usuário feliz
				</span>

				<Link
					href={'#'}
					className="text-blue700 hover:text-blue500 hover:scale-105 font-bold transition-all w-max mt-4"
				>
					Ler mais testemunhos{' '}
					<ArrowRightIcon width={20} className="inline" />
				</Link>
			</div>
		</div>
	);
}
