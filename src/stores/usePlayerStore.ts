import { create } from 'zustand';
import axios from 'axios';

interface IPlayerState {
	accessToken: string;
	trackUris: string[];
	currentTrackIndex: number | null;
	setAccessToken: (token: string) => void;
	setTrackUris: (uris: string[]) => void;
	setCurrentTrackIndex: (index: number | null) => void;
	getAccessToken: () => Promise<void>;
}

export const usePlayerStore = create<IPlayerState>((set) => ({
	accessToken: '',
	trackUris: [],
	currentTrackIndex: null,
	setAccessToken: (token) => set({ accessToken: token }),
	setTrackUris: (uris) => set({ trackUris: uris }),
	setCurrentTrackIndex: (index) => set({ currentTrackIndex: index }),
	getAccessToken: async () => {
		try {
			const { data } = await axios.get('/api/auth/get-access-token');
			set({ accessToken: data.accessToken });
		} catch (error) {
			console.error('Error fetching access token:', error);
		}
	}
}));
