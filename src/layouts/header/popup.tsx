import React from 'react';
import Navigation from './navigation';
// import SearchForm from './searchForm';
import HeaderButton from '../../components/buttons/headerButton';
import header from './header.module.scss';

function Popup(): React.JSX.Element {
	return (
		<>
			{/* <SearchForm className={header.search__form} /> */}
			<Navigation />
			<HeaderButton area-label='My account' className={header.account__button}>My Account</HeaderButton>
			<HeaderButton area-label='Logout' className={header.logout__button}>Logout</HeaderButton>
		</>
	);
}
export default Popup;
