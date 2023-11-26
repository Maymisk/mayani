import { FallbackAvatar } from '@/components/fallbackAvatar';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

interface IWorkUserCardProps {
	auth_id: string;
	name: string;
	rating: number;
	avatar: string | null;
}

export function WorkUserCard({
	auth_id,
	name,
	rating,
	avatar,
}: IWorkUserCardProps) {
	return (
		<div className="flex items-center gap-4 border-2 border-gray400 rounded-md p-4">
			<Link href={`/worker/${auth_id}`}>
				{avatar ? (
					<Image
						src={avatar}
						alt="User profile picture"
						width={50}
						height={50}
						className="w-[50px] h-[50px] object-cover rounded-full"
					/>
				) : (
					<FallbackAvatar
						width="w-[50px]"
						height="h-[50px]"
						name={name}
					/>
				)}
			</Link>

			<div className="flex flex-col justify-between gap-1">
				<h4 className="text-white">{name}</h4>

				<span className="text-blue700 font-bold flex gap-1 hover:text-blue500 transition-all">
					{rating ? (
						<>
							<StarIcon width={20} height={20} />{' '}
							{rating.toFixed(1)} em avaliações
						</>
					) : (
						'Sem Avaliações'
					)}
				</span>
			</div>
		</div>
	);
}
