import { SupabaseClient } from '@supabase/supabase-js';
import { ICreateUserData } from './types';
import { Database } from '@root/supabase/databaseTypes';

export async function createUser(
	{ name, username, type }: ICreateUserData,
	supabase: SupabaseClient<Database>
) {
	const { data } = await supabase
		.from(type)
		.insert({
			name,
			username,
		})
		.select()
		.single();

	return data;
}
