import { POSTLogic } from './POST';

export async function POST(request: Request) {
	return await POSTLogic(request);
}
