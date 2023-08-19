import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function PrivateAccountPage() {
	console.log('file: accountPage.tsx:7 ~ AccountPage ~ auth:');

	const auth = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (auth.user) {
			auth.signOut(() => navigate('/', { replace: true }));
		}
	};

	return (
		<div>
			<h1>This accoutn page</h1>
			{/* <p>
				Welcome,
				{' '}
				{auth.user?.username}
			</p> */}
			<button type='button' onClick={handleLogout}>Log out</button>
		</div>
	);
}
