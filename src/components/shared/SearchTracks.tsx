'use client';
import scss from './SearchTracks.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DebounceInput } from 'react-debounce-input';
import { RxCross1 } from 'react-icons/rx';
import { FiSearch } from 'react-icons/fi';
import { FaFirefoxBrowser } from 'react-icons/fa';

const SearchTracks = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [hasUserInput, setHasUserInput] = useState(false);

	useEffect(() => {
		if (hasUserInput) {
			if (searchQuery) {
				router.push(`/search/${searchQuery}`);
			} else {
				router.push(`/search`);
			}
		}
	}, [searchQuery, hasUserInput]);

	return (
		<div className={scss.LookForTracks}>
			<div className={scss.content}>
				<div className={scss.search_icon_block}>
					<button>
						<FiSearch />
					</button>
				</div>
				<div className={scss.search_input_block}>
					<DebounceInput
						placeholder="enter a search tracks..."
						minLength={2}
						debounceTimeout={300}
						value={searchQuery}
						onChange={(event) => {
							setSearchQuery(event.target.value);
							setHasUserInput(true);
						}}
						onFocus={() => router.push(`/search`)}
					/>
				</div>
				<div className={scss.search_reset_block}>
					{searchQuery ? (
						<button onClick={() => setSearchQuery('')}>
							<RxCross1 />
						</button>
					) : (
						<button>
							<FaFirefoxBrowser />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchTracks;
