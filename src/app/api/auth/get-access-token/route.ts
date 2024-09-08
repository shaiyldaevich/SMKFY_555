import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const GET = async () => {
	const accessToken = cookies().get('spotify_access_token')?.value || null;

	return NextResponse.json({ accessToken });
};
