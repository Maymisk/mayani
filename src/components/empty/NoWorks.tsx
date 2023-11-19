import Image from 'next/image';

export function NoWorks() {
	return (
		<section className="mt-[5.25rem] flex flex-col items-center justify-center">
			<h2 className="text-white text-3xl font-bold opacity-50">
				Ooops.. não encontramos trabalhos feitos por esse usuário! 🥺
			</h2>

			<Image
				src={'/not-found.svg'}
				alt="Image representing something was not found"
				width={500}
				height={500}
			/>
		</section>
	);
}
