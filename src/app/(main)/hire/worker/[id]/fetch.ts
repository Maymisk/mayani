import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export async function getWorker(auth_id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('users')
		.select('name')
		.eq('auth_id', auth_id)
		.single();

	if (!data) notFound();

	return data;
}
