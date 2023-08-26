import React, { useState } from 'react';
import style from './defaultInput.module.scss';
import isValidUserAge from '../../utils/helpers';
import IMAGE from '../../../public/assets/svg/search.svg';

interface IRegistrationInput {
	placeholder: string;
	type: string;
	onValueChange: (value: string, id: string) => void;
	id: string;
}

function DefaultInput(props: IRegistrationInput): React.JSX.Element {
	const { placeholder, type, onValueChange, id } = props;
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		onValueChange(newValue, id);

		if (id === 'date' && !isValidUserAge(newValue)) {
			setValue('');
			onValueChange('', id);
		}
	};

	return (
		<div className={style.inputBody}>
			<div className={style.inputSearch}>
				<input
					className={style.input}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					id={id}
				/>
				<button type='button'>
					<img src={IMAGE} alt='' />
				</button>
			</div>
			<i className={style.underline} />
		</div>
	);
}

export default DefaultInput;
