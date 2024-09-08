'use client';
import scss from './Footer.module.scss';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useEffect } from 'react';

const Footer = () => {
	const {
		getAccessToken,
		accessToken,
		trackUris,
		currentTrackIndex,
		setCurrentTrackIndex
	} = usePlayerStore();

	useEffect(() => {
		if (!accessToken) {
			getAccessToken();
		}
	}, []);

	return (
		<footer className={scss.Footer}>
			<div className="container">
				<div className={scss.content}>
					<SpotifyWebPlayer
						styles={{
							activeColor: '#1DB954', // Spotify Green for active elements
							bgColor: '#191414', // Dark background similar to Spotify
							color: 'purple', // White text for contrast
							loaderColor: '#9B51E0', // Violet for the loader
							sliderColor: '#8A2BE2', // Purple for the slider
							trackArtistColor: '#b3b3b3', // Lighter gray for artist names
							trackNameColor: '#fff', // White for track names
							sliderHandleColor: '#6a0dad', // Violet for the slider handle
							sliderTrackColor: '#9B51E0' // Light violet for the slider track
						}}
						// play={true}
						token={accessToken}
						uris={trackUris}
						showSaveIcon={true}
						offset={currentTrackIndex!}
						callback={(state) => {
							if (state.isPlaying) {
								const activeTrackIndex = trackUris.findIndex(
									(uri) => uri === state.track.uri
								);
								setCurrentTrackIndex(activeTrackIndex);
							}
						}}
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
