import React, { useState } from 'react';
import s from './registrationInput.module.scss';

interface IRegistrationInput {
	placeholder: string;
	type: string;
	onValueChange: (value: string, id: string) => void;
	id: string;
}

function RegistrationInput(props: IRegistrationInput): React.JSX.Element {
	const { placeholder, type, onValueChange, id } = props;
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		onValueChange(newValue, id);
	};

	return (
		<div className={s.inputBody}>
			<input
				className={s.input}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				id={id}
			/>
			<i className={s.underline} />
		</div>
	);
}
export default RegistrationInput;
