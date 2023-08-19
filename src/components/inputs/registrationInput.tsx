import React, { useRef, useState } from 'react';
import s from './registrationInput.module.scss';

interface IRegistrationInput {
	placeholder: string;
	type: string;
	onValueChange: (value: string, id: string) => void;
	id: string;
	errorMessage?: string;
	pattern?: string;
}

function RegistrationInput(props: IRegistrationInput): React.JSX.Element {
	const { placeholder, type, onValueChange, id, errorMessage, pattern } = props;
	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const ref = useRef(null);

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
				required
				ref={ref}
				onFocus={() => setIsFocused(true)}
				data-focused={isFocused}
				pattern={pattern}
			/>
			<i className={s.underline} />
			<span className={s.error}>{errorMessage}</span>
		</div>
	);
}
export default RegistrationInput;
