import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getUsersTops: build.query<
			TOPS.UsertopsTrackResponse,
			TOPS.UsertopsTrackRequest
		>({
			query: (type) => ({
				url: `/me/top/tracks`,
				method: 'GET',
				params: {
					time_range: 'medium_term',
					limit: 4,
					offset: 0
				}
			}),
			providesTags: ['userTopTrack']
		}),
		getUsersTopArtists: build.query<
			TOPS.UsertopsResponse,
			TOPS.UsertopsRequest
		>({
			query: (type) => ({
				url: `/me/top/${type}`,
				method: 'GET',
				params: {
					time_range: 'medium_term',
					limit: 4,
					offset: 0
				}
			}),
			providesTags: ['userTopArtists']
		})
	})
});

export const { useGetUsersTopsQuery, useGetUsersTopArtistsQuery } = api;
