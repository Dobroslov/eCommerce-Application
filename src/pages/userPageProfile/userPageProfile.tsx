import React from 'react';
import LayoutUserPage from '../../layouts/layoutUserPage/layoutUserPage';
import style from './userPageProfile.module.scss';

export default function userPageProfile() {
	return (
		<div className={style.user__page}>
			<LayoutUserPage />
		</div>
	);
}
