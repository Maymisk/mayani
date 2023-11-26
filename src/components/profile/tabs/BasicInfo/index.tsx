'use client';

import { LoadingIcon } from '@/components/loadingIcon';
import { useAuth } from '@/contexts/auth/AuthContext';
import { generateHash } from '@/utils/generateHash';
import { yupResolver } from '@hookform/resolvers/yup';
import { Content } from '@radix-ui/react-tabs';
import { Database } from '@root/supabase/databaseTypes';
import {
	SupabaseClient,
	createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BasicInfoFormButtons } from './BasicInfoFormButtons';
import { BasicInfoUserCard } from './BasicInfoUserCard';
import { CommonFields } from './CommonFields';
import { WorkerFields } from './WorkerFields';
import { validation } from './validation';

interface IFormSubmissionData {
	name?: string;
	username?: string;
	location?: string;
	bio?: string;
	occupation?: string;
	avatar?: FileList;
	resume?: FileList;
}

export function BasicInfo() {
	const [updateError, setUpdateError] = useState('');
	const { user } = useAuth();
	const { handleSubmit, ...formHook } = useForm({
		resolver: yupResolver(validation),
	});

	async function onSubmit(data: IFormSubmissionData) {
		const error = await updateProfile(data, {
			auth_id: user!.auth_id,
			isWorker: user!.isWorker,
		});

		if (error) setUpdateError('ERRO');
	}

	return (
		<Content value="info">
			<FormProvider {...formHook} handleSubmit={handleSubmit}>
				<form
					className="w-full flex gap-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<BasicInfoUserCard />

					<div className="w-full max-w-3xl mt-8 bg-gray400 p-8 rounded-md shadow-black shadow-md flex flex-col gap-6">
						<CommonFields />

						{!user ? (
							<span className="w-full flex justify-center mb-8">
								<LoadingIcon classname="text-gray500 animate-spin" />
							</span>
						) : (
							user.isWorker && <WorkerFields />
						)}

						<BasicInfoFormButtons error={updateError} />
					</div>
				</form>
			</FormProvider>
		</Content>
	);
}

interface IUser {
	auth_id: string;
	isWorker: boolean;
}

async function updateProfile(
	data: IFormSubmissionData,
	{ auth_id, isWorker }: IUser
) {
	const supabase = createClientComponentClient<Database>();

	if (data.name || data.username) {
		const value: Record<string, string> = {};

		if (data.name) value.name = data.name;
		if (data.username) value.username = data.username;

		await supabase.from('users').update(value).eq('auth_id', auth_id);
	}

	const usefulData = getTruthyValues(data);

	if (usefulData.avatar)
		usefulData.avatar = await uploadAvatar(
			supabase,
			usefulData.avatar.item(0)!
		);

	if (usefulData.resume)
		usefulData.resume = await uploadResume(
			supabase,
			usefulData.resume.item(0)!
		);

	const table = isWorker ? 'worker_profiles' : 'client_profiles';
	const relation = isWorker ? 'worker_id' : 'client_id';

	const { error } = await supabase
		.from(table)
		.update(usefulData)
		.eq(relation, auth_id);

	if (error) return error;
}

function getTruthyValues(data: IFormSubmissionData) {
	const keys = Object.keys(data) as (keyof typeof data)[];

	for (const key of keys) {
		const value = data[key];
		const valueIsFileList = value instanceof FileList;

		if (
			(valueIsFileList && value.length <= 0) ||
			(!valueIsFileList && !value) ||
			key === 'name' ||
			key === 'username'
		)
			delete data[key];
	}

	return data as any;
}

async function uploadAvatar(supabase: SupabaseClient<Database>, file: File) {
	const path = new Date().toISOString() + generateHash(file.name);

	const { data } = await supabase.storage
		.from('avatars')
		.upload('public/' + path, file);

	if (!data) return '';

	const {
		data: { publicUrl },
	} = supabase.storage.from('avatars').getPublicUrl(data.path);

	return publicUrl;
}

async function uploadResume(supabase: SupabaseClient<Database>, file: File) {
	const path = new Date().toISOString() + generateHash(file.name);

	const { data } = await supabase.storage
		.from('resumes')
		.upload('public/' + path, file);

	if (!data) return '';

	const {
		data: { publicUrl },
	} = supabase.storage.from('resumes').getPublicUrl(data.path);

	return publicUrl;
}
