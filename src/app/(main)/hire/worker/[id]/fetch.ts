import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export async function getWorker(auth_id: string) {
	const cookieStore = cookies();
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	});

	const { data } = await supabase
		.from('users')
		.select('name')
		.eq('auth_id', auth_id)
		.single();

	if (!data) notFound();

	return data;
}
