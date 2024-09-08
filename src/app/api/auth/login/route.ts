import { NextResponse } from 'next/server';
import querystring from 'querystring';

export const GET = async () => {
	const scopes = [
		'user-read-email',
		'user-read-private',
		'user-read-playback-state',
		'user-read-playback-position',
		'user-read-currently-playing',
		'user-read-recently-played',
		'user-modify-playback-state',
		'app-remote-control',
		'streaming',
		'playlist-read-private',
		'playlist-read-collaborative',
		'playlist-modify-private',
		'playlist-modify-public',
		'user-top-read',
		'user-follow-modify',
		'user-follow-read',
		'user-library-modify',
		'user-library-read',
		'ugc-image-upload'
		// 'user-soa-link',
		// 'user-soa-unlink'
		// 'soa-manage-entitlements',
		// 'soa-manage-partner',
		// 'soa-create-partner'
	].join(' ');
	const clientId = process.env.SPOTIFY_CLIENT_ID;
	const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

	const queryParams = querystring.stringify({
		response_type: 'code',
		client_id: clientId,
		scope: scopes,
		redirect_uri: redirectUri
	});

	const url = `https://accounts.spotify.com/authorize?${queryParams}`;

	return NextResponse.redirect(url);
};
