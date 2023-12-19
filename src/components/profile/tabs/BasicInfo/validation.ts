import * as yup from 'yup';
import { OccupationTypeEnum } from '@root/supabase/occupationType';

export const validation = yup.object({
	name: yup.string(),
	username: yup.string(),
	location: yup.string(),
	bio: yup.string(),
	occupation: yup.string(),
	avatar: yup
		.mixed<FileList>()
		.test(
			'fileSize',
			'Arquivo muito grande.',
			value => testSize(value, 5242880) // 5mb
		)
		.test('fileType', 'Formato de arquivo errado', avatarFormatCheck),
	resume: yup
		.mixed<FileList>()
		.test(
			'fileSize',
			'Arquivo muito grande',
			value => testSize(value, 1048576) // 1mb
		)
		.test('fileType', 'Formato de arquivo errado', resumeFormatCheck),
});

function testSize(file: FileList | undefined, size: number) {
	if (!file || file.length === 0) return true;

	return file[0].size <= size; // 2mb
}

function avatarFormatCheck(file: FileList | undefined) {
	if (!file || file.length === 0) return true;

	return ['image/jpeg', 'image/jpg', 'image/png'].includes(file[0].type);
}

function resumeFormatCheck(file: FileList | undefined) {
	if (!file || file.length === 0) return true;

	return file[0].type === 'application/pdf';
}
