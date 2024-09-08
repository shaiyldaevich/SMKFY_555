import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getPlaylists: build.query<
			PLAYLIST.GetPlaylistsResponse,
			PLAYLIST.GetPlaylistsRequest
		>({
			query: (query) => ({
				url: '/me/playlists',
				method: 'GET',
				params: {
					limit: 10
				}
			}),
			providesTags: ['playlist']
		}),
		getPlaylistById: build.query<
			PLAYLIST.GetPlaylistByIdResponse,
			PLAYLIST.GetPlaylistByIdRequest
		>({
			query: (playlist_id) => ({
				url: `/playlists/${playlist_id}`,
				method: 'GET',
				params: {}
			}),
			providesTags: ['playlist']
		})
	})
});

export const { useGetPlaylistsQuery, useGetPlaylistByIdQuery } = api;
