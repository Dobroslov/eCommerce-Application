import React from 'react';
import s from './registrationInput.module.scss';

interface IRegistrationInput {
	placeholder: string;
	type: string;
}

function RegistrationInput(props: IRegistrationInput): React.JSX.Element {
	const { placeholder, type } = props;
	return (
		<div className={s.inputBody}>
			<input className={s.input} type={type} placeholder={placeholder} />
			<i className={s.underline} />
		</div>
	);
}
export default RegistrationInput;
