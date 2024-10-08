import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import LayoutClient from './layout.client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Spotify',
	description: 'Generated by ElchoDev'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LayoutClient>{children}</LayoutClient>
			</body>
		</html>
	);
}
