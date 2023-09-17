import React, { useState } from 'react';

import style from './addressInput.module.scss';

interface AddressInputProps {
	label: string;
	id: string;
	placeholder: string;
	pattern: string;
	errorMessage: string;
	onInputChange: (id: string, value: string) => void;
}

export default function AddressInput({
	label,
	id,
	placeholder,
	pattern,
	errorMessage,
	onInputChange,
}: AddressInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState('');
	const [error, setError] = useState<string | null>(null);

	const validateInput = (inputValue: string) => {
		if (!inputValue) {
			setError(`${label} обязателен для заполнения.`);
		} else if (!new RegExp(pattern).test(inputValue)) {
			setError(errorMessage);
		} else {
			setError(null);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setValue(inputValue);
		validateInput(inputValue);
		onInputChange(inputValue, id);
	};

	return (
		<div>
			<label htmlFor={id}>{label}:</label>
			<input
				className={style.input}
				type='text'
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={handleInputChange}
				onFocus={() => setIsFocused(true)}
				required
				data-focused={isFocused}
			/>
			<i className={style.underline} />
			{/* <span className={style.error}>{errorMessage}</span> */}
			{error && <p className='error'><span className={style.error}>{error}</span></p>}
		</div>
	);
}
