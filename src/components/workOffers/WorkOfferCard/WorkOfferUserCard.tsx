import { FallbackAvatar } from '@/components/fallbackAvatar';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface IWorkOfferUserCardProps {
	name: string;
	rating: number;
	location: string | null;
	avatar: string | null;
}

export function WorkOfferUserCard({
	name,
	location,
	rating,
	avatar,
}: IWorkOfferUserCardProps) {
	return (
		<div className="w-full flex justify-center gap-4">
			<div>
				{avatar ? (
					<Image
						src={avatar}
						alt="User profile picture"
						width={150}
						height={150}
						className="w-[150px] h-[150px] object-cover rounded-full"
					/>
				) : (
					<FallbackAvatar
						width="w-[150px]"
						height="h-[150px]"
						text="text-7xl"
						name={name}
					/>
				)}
			</div>

			<div className="flex flex-col justify-around gap-1">
				<div>
					<h4 className="text-white text-3xl max-xl:text-xl">
						{name}
					</h4>
					<span className="text-white text-sm font-bold">
						{location}
					</span>
				</div>

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
