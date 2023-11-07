import Link from 'next/link';
import { RatingCard } from './RatingCard';

export function UserRatings() {
	// deve mostrar um limite de 9 avaliacoes

	return (
		<aside className="w-full max-w-sm rounded-md px-4 py-6 flex flex-col items-center gap-6 border-2 border-gray400">
			<h2 className="w-full text-xl uppercase font-bold text-white">
				Avaliações
			</h2>

			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>
			<RatingCard
				author={{
					avatar: 'https://github.com/maymisk.png',
					name: 'Khalil Bohner',
				}}
				description="Muito foda esse cara, recomendo"
				rating={4.7}
			/>

			<Link
				href={'/ratings/user/123'}
				className="w-full text-blue700 hover:text-blue500 hover:underline font-bold transition-all text-center mt-auto"
			>
				Ver todas
			</Link>
		</aside>
	);
}
