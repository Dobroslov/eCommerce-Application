import React, { useState } from 'react';
import header from './header.module.scss';
import Navigation from './navigation';
import HeaderButton from '../../components/buttons/headerButton';
import SearchForm from './searchForm';

function Menu(): React.JSX.Element {
	const [active, setToggle] = useState(false);
	const toggleSearch = ():void => {
		setToggle(!active);
	};
	const closeSearch = () => {
		if (active) {
			setToggle(!active);
		}
	};
	return (
		<div className={header.menu}>
			<Navigation />
			<div className={header.cards}>
				<HeaderButton area-label='Search' className={header.search} onClick={toggleSearch} />
				<HeaderButton area-label='Basket' className={header.basket} />
				<HeaderButton area-label='Profile' className={header.profile} />
			</div>
			<SearchForm className={active ? `${header.search__form} ${header.open}` : header.search__form} onMouseLeave={closeSearch} />
		</div>
	);
}
export default Menu;
