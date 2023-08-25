import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import style from './accountPage.module.scss';

export default function PrivateAccountPage() {
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
		<div className={style.account__page}>
			<h2 className={style.title_h2}>This your accounе page</h2>
			<p className={style.title_h3}>
				{`Welcome, ${user?.email}`}
			</p>
			<button className={style.button} type='button' onClick={handleLogout}>Log out</button>
		</div>
	);
}
