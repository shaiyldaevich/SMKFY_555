'use client';
import { useGetPlaylistsQuery } from '@/redux/api/playlist';
import scss from './PlayList.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import playImage from '../../../assets/i.webp';
import { useState } from 'react';
import Artist from '@/components/shared/Artist';

const PlayList = () => {



	return (
		<section className={scss.PlayList}>
			<div className="container">
				<div className={scss.content}>
					<Artist/>
				</div>
			</div>
		</section>
	);
};
export default PlayList;
