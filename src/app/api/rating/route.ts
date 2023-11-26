import { NextRequest } from 'next/server';
import { POSTLogic } from './POST';

export async function POST(request: NextRequest) {
	return await POSTLogic(request);
}
