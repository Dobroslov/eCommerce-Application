// import React, { useRef, useState } from 'react';
// import s from './registrationInput.module.scss';
// import isValidUserAge from '../../utils/helpers';

// interface IRegistrationInput {
// 	placeholder: string;
// 	type: string;
// 	onValueChange: (value: string, id: string) => void;
// 	id: string;
// 	errorMessage?: string;
// 	pattern?: string;
// }

// function RegistrationInput(props: IRegistrationInput): React.JSX.Element {
// 	const { placeholder, type, onValueChange, id, errorMessage, pattern } = props;
// 	const [value, setValue] = useState('');
// 	const [isFocused, setIsFocused] = useState(false);
// 	const ref = useRef(null);

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const newValue = e.target.value;
// 		setValue(newValue);
// 		onValueChange(newValue, id);

// 		if (id === 'date' && !isValidUserAge(newValue)) {
// 			onValueChange('', id);
// 		}
// 	};

// 	return (
// 		<div className={s.inputBody}>
// 			<input
// 				className={s.input}
// 				type={type}
// 				placeholder={placeholder}
// 				value={value}
// 				onChange={handleChange}
// 				id={id}
// 				required
// 				ref={ref}
// 				onFocus={() => setIsFocused(true)}
// 				data-focused={isFocused}
// 				pattern={pattern}
// 			/>
// 			<i className={s.underline} />
// 			<span className={s.error}>{errorMessage}</span>
// 		</div>
// 	);
// }
// export default RegistrationInput;
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
}

function RegistrationInput(props: IRegistrationInput): React.JSX.Element {
	const {
		placeholder,
		type,
		onValueChange,
		id,
		errorMessage,
		pattern,
	} = props;
	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const ref = useRef(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		onValueChange(newValue, id);

		if (id === 'date' && !isValidUserAge(newValue)) {
			onValueChange('', id);
		}
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<div className={style.inputBody}>
			<input
				className={style.input}
				type={isPasswordVisible ? 'text' : type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				id={id}
				required
				ref={ref}
				onFocus={() => setIsFocused(true)}
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
