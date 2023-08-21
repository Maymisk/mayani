import { Banner } from '@/components/Banner';
import { Ratings } from '@/components/user/Ratings';
import { UserInfo } from '@/components/user/UserInfo';
import { Works } from '@/components/user/Works';
import { api } from '@/services/api';

interface IUserProps {
	params: {
		id: string;
	};
}

export default async function User({ params }: IUserProps) {
	const { name, bio, avatar_url, occupation, works, ratings } = await api.get(
		'/users/' + params.id,
		{ next: { revalidate: 0 } }
	);

	return (
		<>
			<Banner />

			<main>
				<UserInfo
					name={name}
					bio={bio}
					occupation={occupation}
					avatar_url={avatar_url}
				/>

				<Ratings ratings={ratings} />

				<Works works={works} />
			</main>
		</>
	);
}
