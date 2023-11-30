import { Database } from '@root/supabase/databaseTypes';
import { WorkOfferStatus } from '@root/supabase/workOfferStatus';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface IProfile {
	avatar: string | null;
	location: string | null;
}

interface IRating {
	stars: number;
}

interface IUser {
	name: string;
	auth_id: string;
	isWorker: boolean;
	client_profiles: IProfile | null;
	worker_profiles: IProfile | null;
	ratings: IRating[];
}

type FetchWorkOfferResponse = {
	title: string;
	description: string | null;
	price: number;
	status: WorkOfferStatus;
	start_date: string;
	worker_id: string;
	client_id: string;
	users: IUser;
}[];

export async function getWorkOffer(id: string) {
	const cookieStore = cookies();
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data } = await supabase
		.from('work_offers')
		.select(
			`
            title,
            description,
            price,
			status,
            start_date,
            worker_id,
			client_id,
            users!work_offers_author_id_fkey(
                name,
                auth_id,
                isWorker,
                client_profiles(avatar, location),
                worker_profiles(avatar, location),
                ratings!ratings_rated_id_fkey(stars)
            )
        `
		)
		.eq('id', id)
		.returns<FetchWorkOfferResponse>();

	if (!data || data[0].users.auth_id === user?.id) notFound();

	const { users, ...offer } = data[0];
	const { client_profiles, worker_profiles, ratings, ...authorData } = users;

	const rating = ratings.reduce((sum, cur) => sum + cur.stars, 0) || 0;
	const avatar = client_profiles
		? client_profiles.avatar
		: worker_profiles!.avatar;
	const location = client_profiles
		? client_profiles.location
		: worker_profiles!.location;

	const author = {
		...authorData,
		rating,
		avatar,
		location,
	};

	return {
		offer: {
			id,
			...offer,
		},
		author,
	};
}
