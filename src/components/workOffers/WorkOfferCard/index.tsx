import Link from 'next/link';
import { WorkOfferUserCard } from './WorkOfferUserCard';
import { WorkOfferInfo } from './WorkOfferUserCardInfo';
import { WorkOfferStatus } from '@root/supabase/workOfferStatus';

interface IAuthor {
	name: string;
	rating: number;
	avatar: string | null;
	location: string | null;
}

interface IWorkOfferCardProps {
	id: string;
	title: string;
	price: number;
	status: WorkOfferStatus;
	created_at: string;
	author: IAuthor;
}

export function WorkOfferCard({ id, author, ...offer }: IWorkOfferCardProps) {
	return (
		<Link
			href={'/work/offer/' + id}
			className="w-full max-w-5xl mx-auto flex justify-between gap-8 border-2 border-gray400 p-8 rounded-xl hover:scale-[1.02] transition-all max-md:flex-col"
		>
			<div className="w-full flex flex-col gap-2">
				<span className="text-white font-extralight">Oferta por:</span>
				<WorkOfferUserCard {...author} />
			</div>

			<div className="w-1 bg-gray400" />

			<WorkOfferInfo {...offer} />
		</Link>
	);
}
