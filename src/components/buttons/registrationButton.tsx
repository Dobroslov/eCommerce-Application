import React from 'react';
import style from './registrationButton.module.scss';

interface IRegistrationButton {
	value: string;
}

function RegistrationButton(props: IRegistrationButton): React.JSX.Element {
	const { value } = props;
	return (
		<button className={style.button} type='submit'>
			{value}
		</button>
	);
}
export default RegistrationButton;
