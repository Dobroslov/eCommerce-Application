import React from 'react';
import s from './loginButton.module.scss';
import { ILogin } from '../../utils/types';
import { getToken } from '../../services/apiServices';

interface ILoginButton {
	value: string;
	onSubmit: ILogin;
}

function LoginButton(props: ILoginButton): React.JSX.Element {
	const { value, onSubmit } = props;
	return (
		<button onClick={() => getToken(onSubmit)} className={s.button} type='submit'>
			{value}
		</button>
	);
}
export default LoginButton;
