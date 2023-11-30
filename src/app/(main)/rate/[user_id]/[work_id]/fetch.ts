import { Database } from '@root/supabase/databaseTypes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { notFound, redirect } from 'next/navigation';

interface IIsAuthorizedProps {
	user_id: string;
	work_id: string;
}

export async function isAuthorized({ user_id, work_id }: IIsAuthorizedProps) {
	const cookieStore = cookies();
	const supabase = createServerComponentClient<Database>({
		cookies: () => cookieStore,
	});
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return redirect('/login');

	if (user_id === user.id) return notFound();

	const { data: work } = await supabase
		.from('works')
		.select('worker_id, client_id')
		.eq('id', work_id)
		.single();

	if (!work) notFound();

	if (user.id != work.worker_id && user.id != work.client_id)
		return notFound();

	const { data: ratedUser } = await supabase
		.from('users')
		.select('name')
		.eq('auth_id', user_id)
		.single();
	if (!ratedUser) notFound();

	return { name: ratedUser.name };
}
