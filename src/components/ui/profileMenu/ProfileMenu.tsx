'use client';
import { TbLogout2 } from 'react-icons/tb';
import scss from './ProfileMenu.module.scss';
import { useHeaderStore } from '@/stores/useHeaderStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfileMenu = () => {
	const { isOpenProfileMenu, logout, links } = useHeaderStore();
	const router = useRouter();
	return (
		<div
			className={
				isOpenProfileMenu
					? `${scss.ProfileMenu} ${scss.active}`
					: `${scss.ProfileMenu}`
			}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className={scss.content}>
				<nav className={scss.nav}>
					<ul>
						{links.map((item, index) => (
							<li key={index}>
								<Link href={item.href}>{item.name}</Link>
							</li>
						))}
					</ul>
				</nav>
				<button className={scss.logout} onClick={logout}>
					<TbLogout2 />
					logout
				</button>
			</div>
		</div>
	);
};

export default ProfileMenu;
