import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';

import style from './layoutUserPage.module.scss';

export default function LayoutUserPage(): React.ReactElement {
	// const { user } = useAuth();

	return (
		<div className={style.user__page}>
			<h2 className={style.title_h2}>My account</h2>
			{/* <p className={style.title_h3}>
				{`Welcome, ${user?.email}`}
			</p> */}
			<div className={style.content}>
				<nav className={style.navigation}>
					<NavLink to='/account_page/dashboard' className={style.user__nav_link}>Dashboard</NavLink>
					<NavLink to='/account_page/orders' className={style.user__nav_link}>Orders</NavLink>
					<NavLink to='/account_page/addresses' className={style.user__nav_link}>Addresses</NavLink>
					<NavLink to='/account_page/account-details' className={style.user__nav_link}>Account details</NavLink>
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
