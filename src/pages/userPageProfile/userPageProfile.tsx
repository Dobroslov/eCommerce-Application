import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LayoutUserPage from '../../layouts/layoutUserPage/layoutUserPage';
import style from './userPageProfile.module.scss';

export default function userPageProfile() {
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
			<LayoutUserPage />
			<button className={style.button} type='button' onClick={handleLogout}>Log out</button>
		</div>
	);
}
