import { Database } from '@root/supabase/databaseTypes';
import { WorkOfferStatus } from '@root/supabase/workOfferStatus';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

interface IRating {
	stars: number;
}

interface IProfile {
	avatar: string | null;
	location: string | null;
}

interface IUser {
	name: string;
	client_profiles: IProfile | null;
	worker_profiles: IProfile | null;
	ratings: IRating[];
}

type FetchWorkOffersResponse = {
	id: string;
	title: string;
	price: number;
	status: WorkOfferStatus;
	created_at: string;
	users: IUser;
}[];

export async function getWorkOffers() {
	const cookieStore = cookies();
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect('/login');

	const relation = user.user_metadata.isWorker ? 'worker_id' : 'client_id';

	const { data } = await supabase
		.from('work_offers')
		.select(
			`
        id,
        title,
        price,
        status,
        created_at,
        users!work_offers_author_id_fkey(
            name,
            client_profiles(avatar, location),
            worker_profiles(avatar, location),
            ratings!ratings_rated_id_fkey(stars)
        )    
    `
		)
		.eq(relation, user.id)
		.neq('author_id', user.id)
		.returns<FetchWorkOffersResponse>();

	if (!data) notFound();

	const formattedWorkOffers = data.map(workOffer => {
		const { users, ...data } = workOffer;
		const { name, client_profiles, worker_profiles, ratings } = users;

		const sum = ratings.reduce((sum, rating) => sum + rating.stars, 0);
		const rating = Math.round(sum / ratings.length) || 0;

		const avatar = client_profiles
			? client_profiles.avatar
			: worker_profiles!.avatar;
		const location = client_profiles
			? client_profiles.location
			: worker_profiles!.location;
		const author = {
			name,
			rating,
			avatar,
			location,
		};

		return {
			...data,
			author,
		};
	});

	return formattedWorkOffers;
}
