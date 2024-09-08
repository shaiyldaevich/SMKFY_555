'use client';
import { useParams } from 'next/navigation';
import scss from './Playlist.module.scss';
import { useGetPlaylistByIdQuery } from '@/redux/api/playlist';
import { usePlayerStore } from '@/stores/usePlayerStore';
import Image from 'next/image';
import { FaPlayCircle } from "react-icons/fa";
<FaPlayCircle />
const Playlist = () => {
	const { playlistId } = useParams();
	const { data } = useGetPlaylistByIdQuery(String(playlistId));
	const { setTrackUris, setCurrentTrackIndex,currentTrackIndex } = usePlayerStore();


	const playMusic = (index:number) => {
		if (data?.tracks.items) {
			const uris = data.tracks.items.map((item) => item.track.uri);
			setTrackUris(uris);
			setCurrentTrackIndex(index);
		}
	};

	return (
		<div className={scss.Playlist}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.header}>
						<Image
							src={data?.images[0]?.url || '/default_playlist.png'}
							alt="Playlist"
							width={180}
							height={180}
						/>
						<div className={scss.info}>
							<h1>{data?.name}</h1>
							<p>{data?.description}</p>
							<p>{data?.owner?.display_name} • {data?.tracks?.total} songs</p>
						</div>
						<div className={scss['play-button']} onClick={()=>playMusic(0)}>
							<a><FaPlayCircle/></a>
						</div>
					</div>

					<div className={scss.tracks}>
						{data?.tracks.items.map((item, index) => (
							<div
								key={index}
								className={`${scss.track} ${
									currentTrackIndex === index ? scss.active : ''
								}`}
								onClick={() => playMusic(index)}
							>
								<div className={scss['track-info']}>
									<Image
										src={item.track.album.images[1]?.url || '/default_album.png'}
										alt={item.track.name}
										width={50}
										height={50}
									/>
									<div>
										<h3>{item.track.name}</h3>
										<p>{item.track.artists.map((artist) => artist.name).join(', ')}</p>
									</div>
								</div>
								<div className={scss['track-duration']}>
									{Math.floor(item.track.duration_ms / 60000)}:
									{Math.floor((item.track.duration_ms % 60000) / 1000)
										.toString()
										.padStart(2, '0')}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Playlist;
