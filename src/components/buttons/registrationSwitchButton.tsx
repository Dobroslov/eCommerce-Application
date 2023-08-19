import React from 'react';
import style from './registrationSwitchButton.module.scss';

interface IRegistrationSwitchButton {
	value: string;
}

function RegistrationSwitchButton(
	props: IRegistrationSwitchButton,
): React.JSX.Element {
	const { value } = props;
	return (
		<button className={style.button} type='button'>
			{value}
		</button>
	);
}
export default RegistrationSwitchButton;
