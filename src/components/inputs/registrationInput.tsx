import React, { useRef, useState } from 'react';
import style from './registrationInput.module.scss';
import isValidUserAge from '../../utils/helpers';

interface IRegistrationInput {
	placeholder: string;
	type: string;
	onValueChange: (value: string, id: string) => void;
	id: string;
	errorMessage?: string;
	pattern?: string;
	defaultValue?: string;
}

function RegistrationInput(props: IRegistrationInput): React.JSX.Element {
	const {
		placeholder,
		type,
		onValueChange,
		id,
		errorMessage,
		pattern,
		defaultValue,
	} = props;

	const [value, setValue] = useState(defaultValue || '');
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const ref = useRef(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		onValueChange(newValue, id);

		if (id === 'date' && !isValidUserAge(newValue)) {
			setValue('');
			onValueChange('', id);
		}
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleBlur = () => {
		onValueChange(value, id);
	};

	return (
		<div className={style.inputBody}>
			<input
				className={style.input}
				type={isPasswordVisible ? 'text' : type}
				placeholder={placeholder}
				value={defaultValue || value}
				onChange={handleChange}
				id={id}
				required
				ref={ref}
				onFocus={() => setIsFocused(true)}
				onBlur={handleBlur}
				data-focused={isFocused}
				pattern={pattern}
				min='1'
				step='1'
			/>
			{type === 'password' && (
				<button
					type='button'
					className={style.toggle_visible_password}
					onClick={togglePasswordVisibility}
				>
					{isPasswordVisible ? 'Hide' : 'Show'}
				</button>
			)}
			<i className={style.underline} />
			<span className={style.error}>{errorMessage}</span>
		</div>
	);
}

export default RegistrationInput;
