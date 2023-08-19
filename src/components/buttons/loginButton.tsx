import React from 'react';
import style from './loginButton.module.scss';

interface ILoginButton {
	value: string;
}

function LoginButton(props: ILoginButton): React.JSX.Element {
	const { value } = props;
	return (
		<button className={style.button} type='submit'>
			{value}
		</button>
	);
}
export default LoginButton;
