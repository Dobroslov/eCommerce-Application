import React from 'react';
import { Link } from 'react-router-dom';
import style from './loginButton.module.scss';
import { IUserLogin } from '../../utils/types';
import { getToken } from '../../services/apiServices';

interface ILoginButton {
	value: string;
	onSubmit: IUserLogin;
}

function LoginButton(props: ILoginButton): React.JSX.Element {
	const { value, onSubmit } = props;
	return (
		<Link to='/' replace={ true }>
			<button onClick={() => getToken(onSubmit)} className={style.button} type='submit'>
				{value}
			</button>
		</Link>
	);
}
export default LoginButton;
