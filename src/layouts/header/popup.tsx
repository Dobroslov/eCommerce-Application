import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './navigation';
// import SearchForm from './searchForm';
import HeaderButton from '../../components/buttons/headerButton';
import header from './header.module.scss';
import useAuth from '../../hooks/useAuth';
import store from '../../store/store';
import { hideBurger } from '../../store/actions';

function Popup(): React.JSX.Element {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();
	const closeBurger = (): void => {
		store.dispatch(hideBurger());
	};
	const handleLogout = () => {
		if (user) {
			signOut(() => navigate('/', {
				replace: true,
			}));
		}
		closeBurger();
	};
	return (
		<>
			{/* <SearchForm className={header.search__form} /> */}
			<Navigation />
			<Link to='/account_page' className={header.account__button} onClick={closeBurger}>My Account</Link>
			{/* <HeaderButton area-label='My account' className={header.account__button}>My Account</HeaderButton> */}
			<HeaderButton area-label='Logout' className={header.logout__button} onClick={handleLogout}>Logout</HeaderButton>
		</>
	);
}
export default Popup;
