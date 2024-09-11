import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/v1`,
	// ! headers для RTK-Query
	prepareHeaders: async (headers) => {
		const { data } = await axios.get('/api/auth/get-access-token');
		if (data) {
			headers.set('Authorization', `Bearer ${data.accessToken}`);
		}
		return headers;
	}
});

// ! headers для axios
// const fetchData = async () => {
// 	const { data } = await axios.get("https://api.twitter.com", {
// 		headers: {
// 			Authorization: `Bearer token...`,
// 		},
// 	});
// };
const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	return result;
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryExtended,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	tagTypes: ['me', 'search', 'playlist','profile','userTopTrack','userTopArtists','artist'],
	endpoints: () => ({})
});
