import React from 'react';

export default function RegistrationPage() {
	return (
		<div>
			<form action='#' method='post'>
				<input type='text' name='login' id='login' />
				<input type='password' name='password' id='userPassword' />
				<input type='text' name='user_name' id='userName' />
				<input type='tel' name='user_phone' id='userPfone' />
				<button type='submit' />
			</form>
		</div>
	);
}
