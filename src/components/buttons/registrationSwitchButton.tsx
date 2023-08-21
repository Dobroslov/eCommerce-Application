import React from 'react';
import { Link } from 'react-router-dom';

import style from './registrationSwitchButton.module.scss';

interface IRegistrationSwitchButton {
	value: string;
	active?: string;
}

function RegistrationSwitchButton(
	props: IRegistrationSwitchButton,
): React.JSX.Element {
	const { value, active } = props;

	return (
		<Link to={value === 'Sign in' ? '/login' : '/registration'} className={`${style.button} ${active ? style.active : ''}`}>{value}</Link>
	);
}

export default RegistrationSwitchButton;
