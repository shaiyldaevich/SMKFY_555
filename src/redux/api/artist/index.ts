import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getArtist: build.query<ARTIST.GetArtistResponse, ARTIST.GetArtistRequest>({
			query: (query) => ({
				url: '/artists',
				method: 'GET',
				params: {
					limit: 10
				}
			}),
			providesTags: ['artist']
		}),
		getArtistById: build.query<
			ARTIST.GetArtistByIdResponse,
			ARTIST.GetArtistByIdRequest
		>({
			query: (artist_id) => ({
				url: `/artists/${artist_id}`,
				method: 'GET',
				params: {}
			}),
			providesTags: ['artist']
		})
	})
});

export const { useGetArtistQuery, useGetArtistByIdQuery } = api;
