import { Database } from '@root/supabase/databaseTypes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IResponse {
	notifications: any[];
	hasUnread: boolean;
}

export async function fetchNotifications(auth_id: string): Promise<IResponse> {
	const supabase = createClientComponentClient<Database>();

	const { data } = await supabase
		.from('notifications')
		.select('id, description, href, created_at, read_at')
		.eq('user_id', auth_id)
		.order('read_at', { nullsFirst: true })
		.order('created_at', { ascending: false });

	return {
		notifications: data || [],
		hasUnread: !!data && data.length > 0 && !data[0].read_at,
	};
}
