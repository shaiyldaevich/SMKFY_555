import React from 'react';
import scss from './Artist.module.scss';
import { useGetArtistQuery } from '@/redux/api/artist';
const Artist = () => {
	const { data } = useGetArtistQuery();
	console.log("🚀 ~ Artist ~ data:", data)
	return (
		<div className={scss.Artist}>
			<div className="container">
				<div className={scss.content}></div>
			</div>
		</div>
	);
};

export default Artist;
