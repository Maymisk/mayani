import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export async function getWorker(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies });

	const { data } = await supabase
		.from('workers')
		.select('name')
		.eq('id', id)
		.single();

	if (!data) notFound();

	return data;
}
