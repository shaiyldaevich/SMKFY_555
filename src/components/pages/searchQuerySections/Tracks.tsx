'use client';
import { useEffect } from 'react';
import scss from './Tracks.module.scss';
import { useParams } from 'next/navigation';
import { useSearchTracksQuery } from '@/redux/api/search';
import { usePlayerStore } from '@/stores/usePlayerStore';

const Tracks = () => {
	const { searchQuery } = useParams();
	const decodedQuery = decodeURIComponent(String(searchQuery));
	const { data, isLoading } = useSearchTracksQuery(decodedQuery);

	const { setTrackUris, currentTrackIndex, setCurrentTrackIndex } =
		usePlayerStore();

	const playMusic = (index: number) => {
		if (data?.tracks.items) {
			const uris = data.tracks.items.map((item) => item.uri);
			setTrackUris(uris);
			setCurrentTrackIndex(index);
		}
	};

	return (
		<section className={scss.Tracks}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.tracks}>
						{isLoading ? (
							<h1>loading...</h1>
						) : data?.tracks.items.length! > 0 ? (
							data?.tracks.items.map((item, index) => (
								<div
									key={index}
									className={`${scss.track} ${
										currentTrackIndex === index ? scss.active : ''
									}`}
									onClick={() => {
										playMusic(index);
									}}
								>
									<img src={item.album.images[0].url} alt={item.name} />
									<h5>{item.name}</h5>
								</div>
							))
						) : (
							<h1>No tracks found</h1>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tracks;
