'use client';
import scss from './Playlists.module.scss';
import { useRouter } from 'next/navigation';
import { useGetPlaylistsQuery } from '@/redux/api/playlist';
import Image from 'next/image';
import { VscLibrary } from 'react-icons/vsc';
import { FaArrowRight, FaSearch, FaPlus } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import playImage from '../../assets/i.webp';
import { useEffect, useState } from 'react';
const Playlists = () => {
	const { data } = useGetPlaylistsQuery();
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);
	useEffect(() => {
		const handleResize = () => setOpen(window.innerWidth < 900);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div className={scss.Playlistst}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.top}>
						<a>
							<VscLibrary />
							<span>your lib</span>
						</a>
					</div>

					{open ? (
						<>
							<div className={scss.Lists}>
								{data?.items?.map((item) => (
									<div
										key={item.id}
										className={scss.List}
										onClick={() => router.push(`/playlist/${item.id}`)}
									>
										<Image
											src={
												item.images === null ? playImage : item.images[0].url
											}
											alt={item.name}
											width={50}
											height={50}
										/>
									</div>
								))}
							</div>
						</>
					) : (
						<>
							<div className={scss.Lists}>
								{data?.items?.map((item) => (
									<div
										key={item.id}
										className={scss.List}
										onClick={() => router.push(`/playlist/${item.id}`)}
									>
										<Image
											src={
												item.images === null ? playImage : item.images[0].url
											}
											alt={item.name}
											width={50}
											height={50}
										/>
										<h2>{item.name}</h2>
									</div>
								)) || <div>Loading...</div>}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Playlists;
