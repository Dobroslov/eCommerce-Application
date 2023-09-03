import React, { useState } from 'react';
// import isValidUserAge from '../../../utils/helpers';
import style from './changeInput.module.scss';

interface IChangeInput {
	placeholder: string;
	type: string;
	onValueChange: (value: string, id: string) => void;
	id: string;
	errorMessage?: string;
	pattern?: string;
	initValue?: string;
}

export default function ChangeInput(props: IChangeInput): React.JSX.Element {
	const {
		placeholder,
		type,
		onValueChange,
		id,
		errorMessage,
		pattern,
		initValue,
	} = props;

	// console.log('file: changeInput.tsx:25 ~ ChangeInput ~ initValue:', initValue, typeof initValue);

	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onValueChange(newValue, id);

		// if (id === 'date' && !isValidUserAge(newValue)) {
		// 	onValueChange(newValue, id);
		// }
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
				value={initValue}
				onChange={handleChange}
				id={id}
				onFocus={() => setIsFocused(true)}
				data-focused={isFocused}
				pattern={pattern}
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
