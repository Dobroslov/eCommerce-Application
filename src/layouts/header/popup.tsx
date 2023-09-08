import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './navigation';
// import SearchForm from './searchForm';
import style from './header.module.scss';
import useAuth from '../../hooks/useAuth';

function Popup(): React.JSX.Element {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (user) {
			signOut(() => navigate('/', {
				replace: true,
			}));
		}
	};

	return (
		<>
			{/* <SearchForm className={header.search__form} /> */}
			<Navigation />
			{/* <HeaderButton area-label='My account' className={header.account__button}>My Account</HeaderButton> */}
			<Link to='/account_page' className={`${style.profile} ${style.account__button} ${style.button}`}>My Account</Link>
			<Link to='/' className={`${style.logout__button} ${style.button}`} onClick={handleLogout}>Logout</Link>
			{/* <HeaderButton area-label='Logout' className={header.logout__button}>Logout</HeaderButton> */}
		</>
	);
}
export default Popup;
