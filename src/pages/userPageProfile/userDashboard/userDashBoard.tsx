import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Импортируйте Link для создания ссылок
import useAuth from '../../../hooks/useAuth';

import style from './userDashBoard.module.scss';

export default function UserDashboard() {
	const { signOut, user } = useAuth();
	const navigate = useNavigate();

	const userData = localStorage.getItem('userData');
	let userFullName = '';

	if (userData) {
		const userString = JSON.parse(userData);
		userFullName = `${userString.firstName} ${userString.lastName}`;
	}

	const handleLogout = () => {
		if (user) {
			signOut(() => navigate('/', {
				replace: true,
			}));
		}
	};

	return (
		<div className={style.user__dashboard}>
			<h4 className={style.title_h3}>
				Hello,
				{' '}
				{userFullName}
				{' '}
				(If you not
				{' '}
				{userFullName}
				{' '}
				{user ? (
					<Link to='/login' className={`${style.link} ${style.span_accent}`} onClick={handleLogout}>
						Log out
					</Link>
				) : null}
				)
			</h4>
			<p className={style.title_h4}>
				From your account dashboard you can view your recent
				{' '}
				<Link to='/account_page/orders' className={style.span_accent}>orders</Link>
				, manage your shipping and billing
				{' '}
				<Link to='/account_page/addresses' className={style.span_accent}>addresses</Link>
				, and edit your
				{' '}
				<Link to='/account_page/acount-details' className={style.span_accent}>password and account details</Link>
				.
			</p>
		</div>
	);
}
