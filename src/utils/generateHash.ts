import { createHash } from 'crypto';

export function generateHash(string: string) {
	const hash = createHash('sha256');
	hash.update(string);

	return hash.digest('base64');
}
