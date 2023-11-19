import { Database } from '@root/supabase/databaseTypes';
import { SupabaseClient, User as SupaUser } from '@supabase/supabase-js';
import { IFetchUserResponse, User } from './types';

export async function fetchUser(
	user: SupaUser,
	supabase: SupabaseClient<Database>
) {
	const { id: user_id, email } = user;
	const { data } = await supabase
		.from('users')
		.select(
			`
			workers(id, username, isVerified, isSubscribed, worker_profiles(avatar)),
			clients(id, username)
			`
		)
		.eq('id', user_id)
		.returns<IFetchUserResponse[]>();

	if (!data) return null;

	let id = undefined;
	let username = undefined;
	let isWorker = null;

	if (data[0].workers) {
		const workers = data[0].workers;
		const {
			isSubscribed,
			isVerified,
			worker_profiles: { avatar },
		} = workers;

		id = workers.id;
		username = workers.username;
		isWorker = {
			isSubscribed,
			isVerified,
			avatar,
		};
	} else {
		const clients = data[0].clients;

		id = clients!.id;
		username = clients!.username;
	}

	const value: User = {
		id,
		username,
		email: email as string,
		user_id,
		isWorker,
	};

	return value;
}
