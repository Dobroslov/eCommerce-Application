import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../services/apiServices';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import { IRegistrationForm } from '../../utils/types';

import style from './registrationPage.module.scss';
import RegistrationButton from '../../components/buttons/registrationButton';

export default function RegistrationPage(): React.ReactElement {
	localStorage.removeItem('path');
	const navigate = useNavigate();
	// Создаем состояние для хранения значений полей формы
	const [registrationFormData, setRegistrationFormData] = useState<IRegistrationForm>({
		firstName: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		password: '',
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			await createCustomer(registrationFormData, navigate);
		} catch (error) {
			console.error('Error handleSubmit:', error);
			// Обработайте ошибку, если что-то пошло не так
		}
	};

	const handleInputChange = (newValue: string, id: string): void => {
		setRegistrationFormData((prevUserData) => ({
			...prevUserData,
			[id]: newValue,
		}));
	};

	return (
		<div className={style.registration}>
			<div className={`${style.container} container`}>
				<div className={style.body}>
					<h1 className={style.title}>Registration</h1>
					<div className={style.buttons}>
						<RegistrationSwitchButton value='Sign in' />
						<RegistrationSwitchButton value='Register' active='active' />
					</div>
					<form className={style.form} onSubmit={handleSubmit}>
						<div className={style.inputs}>
							<RegistrationInput
								placeholder='First name'
								type='text'
								onValueChange={handleInputChange}
								id='firstName'
								errorMessage="First name should be 1-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{1,16}$'
							/>
							<RegistrationInput
								placeholder='Last Name'
								type='text'
								onValueChange={handleInputChange}
								id='lastName'
								errorMessage="Last Name should be 1-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{1,16}$'
							/>
							<RegistrationInput
								placeholder='Email'
								type='email'
								onValueChange={handleInputChange}
								id='email'
								errorMessage='It should be a valid email address!'
								pattern='^(?!\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
							/>
							<RegistrationInput
								placeholder='Date of birth'
								type='date'
								onValueChange={handleInputChange}
								id='dateOfBirth'
								errorMessage='Need a user over the age of 13 ;-)'
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Password'
								type='password'
								id='password'
								errorMessage='Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character'
								pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$'
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Copy your password'
								type='password'
								id='copy_password'
								errorMessage="Passwords don't match!"
								pattern={registrationFormData.password}
							/>
							<div className={style.remember}>
								<input type='checkbox' id='checkbox-1' className={style.formCheckBox} />
								<label htmlFor='checkbox-1' className={style.checkboxLabel}>
									Remember me
								</label>
							</div>
							<RegistrationButton value='Register' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
