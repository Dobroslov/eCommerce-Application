import React from 'react';
import s from './registrationButton.module.scss';

interface IRegistrationButton {
	value: string;
}

function RegistrationButton(props: IRegistrationButton): React.JSX.Element {
	const { value } = props;
	return (
		<button className={s.button} type='submit'>
			{value}
		</button>
	);
}
export default RegistrationButton;
