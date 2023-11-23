import { Database } from '@root/supabase/databaseTypes';
import { SupabaseClient, User as SupaUser } from '@supabase/supabase-js';
import { IFetchUserResponse, User } from './types';

export async function fetchUser(
	user: SupaUser,
	supabase: SupabaseClient<Database>
) {
	const {
		id: user_id,
		email,
		user_metadata: { isWorker },
	} = user;

	const { data } = await supabase
		.from('users')
		.select(
			`
				id,
				name,
				username,
				worker_profiles(isVerified, isSubscribed, avatar),
				client_profiles(avatar)
			`
		)
		.eq('auth_id', user_id)
		.returns<IFetchUserResponse[]>();

	if (!data) return null;

	const dataObject = data[0];
	const { id, name, username, client_profiles, worker_profiles } = dataObject;

	let isVerified = false;
	let isSubscribed = null;

	const profileData = worker_profiles
		? worker_profiles
		: { avatar: client_profiles!.avatar, isVerified, isSubscribed };

	const value: User = {
		id,
		name,
		username,
		email: email as string,
		auth_id: user_id,
		isWorker,
		...profileData,
	};

	return value;
}
