'use client';
import scss from './Header.module.scss';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import { useGetMeQuery } from '@/redux/api/me';
import { useHeaderStore } from '@/stores/useHeaderStore';
import SearchTracks from '@/components/shared/SearchTracks';
import ProfileButton from '@/components/ui/profileButton/ProfileButton';
import ProfileMenu from '@/components/ui/profileMenu/ProfileMenu';
import { useEffect, useState } from 'react';
import BurgerButton from '@/components/ui/burgerButton/BurgerButton';
import BurgerMenu from '@/components/ui/burgerMenu/BurgerMenu';

const Header = () => {
	const { data: session } = useGetMeQuery();
	const { login } = useHeaderStore();
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 1000);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo}>
						<Link href="/">
							<FaSpotify />
						</Link>
					</div>
					<div className={scss.search}>
						<SearchTracks />
					</div>
					<div className={scss.auth}>
						{isMobile ? (
							<>
								<BurgerButton />
								<BurgerMenu />
							</>
						) : (
							<>
								{session ? (
									<>
										<ProfileButton />
										<ProfileMenu />
									</>
								) : (
									<>
										<button onClick={login}>login</button>
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
