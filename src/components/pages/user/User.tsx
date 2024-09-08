'use client';
import { useGetMeQuery } from '@/redux/api/me';
import React from 'react';
import scss from './User.module.scss';
import {
	useGetUsersTopArtistsQuery,
	useGetUsersTopsQuery
} from '@/redux/api/userstop';
import Image from 'next/image';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useParams } from 'next/navigation';
import { useGetPlaylistByIdQuery } from '@/redux/api/playlist';
const User = () => {
	const { data: seccion } = useGetMeQuery();
	const type = 'tracks';
	const typeArt = 'artists';
	const { toptrackId } = useParams();
	const { data } = useGetUsersTopsQuery(String(toptrackId));
	const { data: artists } = useGetUsersTopArtistsQuery(typeArt);
	const { setTrackUris, setCurrentTrackIndex, currentTrackIndex } =
		usePlayerStore();

	const playMusic = (index: number) => {
		if (data?.items) {
			const uris = data.items.map((item) => item.uri);
			setTrackUris(uris);
			setCurrentTrackIndex(index);
		}
	};
	return (
		<section className={scss.User}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.header}>
						<img src={seccion?.images[1].url!} alt="avatar" />
						<div className={scss.head_text}>
							<h2>Profile</h2>
							<h1>{seccion?.display_name}</h1>
							<h3>{seccion?.product}</h3>
						</div>
					</div>
					<div className={scss.topartists}>
						<h2>Top Artists This Month</h2>
						<div className={scss.artists}>
							{artists?.items.map((item, index) => (
								<div key={index} className={scss.artist_card}>
									<Image
										src={item.images[0].url}
										alt={item.name}
										width={200}
										height={200}
									/>
									<h3>{item.name}</h3>
									<h4>{item.type}</h4>
									<p>{item.followers.total} followers</p>
								</div>
							))}
						</div>
					</div>
					<div className={scss.toptracks}>
						<h2>Top Tracks This Month </h2>
						<div className={scss.tracks}>
							{data?.items.map((item, index) => (
								<div
									key={index}
									className={`${scss.track_card} ${
										currentTrackIndex === index ? scss.active : ''
									}`}
									onClick={() => playMusic(index)}
								>
									<Image
										src={item.album.images[0].url || '/default_album.png'}
										alt={item.name}
										width={50}
										height={50}
									/>
									<div>
										<h3>{item.name}</h3>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default User;
