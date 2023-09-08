import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';

import style from './layoutUserPage.module.scss';
import useAuth from '../../hooks/useAuth';

export default function LayoutUserPage(): React.ReactElement {
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
		<div className={style.user__page}>
			<h2 className={style.title_h2}>My account</h2>
			<div className={style.content}>
				<nav className={style.navigation}>
					<NavLink to='/account_page' className={style.user__nav_link}>Dashboard</NavLink>
					<NavLink to='/account_page/addresses' className={style.user__nav_link}>Addresses</NavLink>
					<NavLink to='/account_page/account-details' className={style.user__nav_link}>Account details</NavLink>
					<NavLink to='/' className={style.user__nav_link} onClick={handleLogout}>Logout</NavLink>
				</nav>
				<div className={style.description}>
					<Outlet />
					{/* В Outlet отображаются части страницы профиля
					 как компонеты (childrens) - dashboard, orders,
					ddresses, account-details */}
				</div>
			</div>
		</div>
	);
}
