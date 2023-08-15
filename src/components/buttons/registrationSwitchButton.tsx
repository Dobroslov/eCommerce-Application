import React from 'react';
import s from './registrationSwitchButton.module.scss';

interface IRegistrationSwitchButton {
	value: string;
}

function RegistrationSwitchButton(
	props: IRegistrationSwitchButton,
): React.JSX.Element {
	const { value } = props;
	return (
		<button className={s.button} type='button'>
			{value}
		</button>
	);
}
export default RegistrationSwitchButton;
