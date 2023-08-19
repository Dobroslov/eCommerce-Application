import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './registrationPage.module.scss';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import { createCustomer, getAnonimousToken } from '../../services/apiServices';
import { IRegistrationForm } from '../../utils/types';
import SubmitButton from '../../components/buttons/submitButton';

function RegistrationPage(): React.ReactElement {
	// Проверка наличия токена в localStorage и получение анонимного токена при необходимости
	if (!localStorage.getItem('token')) {
		getAnonimousToken();
	}

	const navigate = useNavigate();

	// Создаем состояние для хранения значений полей формы
	const [registrationFormData, setRegistrationFormData] = useState<IRegistrationForm>({
		firstName: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		addresses: [
			{
				city: '',
				streetName: '',
				streetNumber: '',
				postalCode: '',
				country: 'RU',
			},
		],
		password: '',
	});

	// Создаем состояние для выбранной страны
	const [selectedCountry, setSelectedCountry] = useState('RU');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		// Вызываем функцию для создания пользователя с данными из формы
		try {
			await createCustomer(registrationFormData);
			// После успешной регистрации перенаправляем на главную страницу
			navigate('/', {
				replace: true,
			});
		} catch (error) {
			console.error('Registration failed:', error);
		}
	};

	const handleInputChange = (value: string, id: string) => {
		// Клонируем текущее состояние, чтобы не изменять его напрямую
		const updatedData = {
			...registrationFormData,
		};

		switch (id) {
			case 'firstName':
				updatedData.firstName = value;
				break;
			case 'lastName':
				updatedData.lastName = value;
				break;
			case 'email':
				updatedData.email = value;
				break;
			case 'date':
				updatedData.dateOfBirth = value;
				break;
			case 'password':
				updatedData.password = value;
				break;
			case 'city':
				updatedData.addresses[0].city = value;
				break;
			case 'streetName':
				updatedData.addresses[0].streetName = value;
				break;
			case 'streetNumber':
				updatedData.addresses[0].streetNumber = value;
				break;
			case 'postalCode':
				updatedData.addresses[0].postalCode = value;
				break;
			default:
				break;
		}

		console.log(updatedData);
		// Обновляем состояние с обновленными данными
		setRegistrationFormData(updatedData);
	};

	return (
		<div className={style.registration}>
			<div className={`${style.container} container`}>
				<div className={style.body}>
					<h1 className={style.title}>Registration</h1>
					<div className={style.buttons}>
						<RegistrationSwitchButton value='Sign in' />
						<RegistrationSwitchButton value='Register' />
					</div>
					<form className={style.form} onSubmit={handleSubmit}>
						<div className={style.inputs}>
							<RegistrationInput
								placeholder='First name'
								type='text'
								onValueChange={handleInputChange}
								id='firstName'
								errorMessage="First name should be 3-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{3,16}$'
							/>
							<RegistrationInput
								placeholder='Last Name'
								type='text'
								onValueChange={handleInputChange}
								id='lastName'
								errorMessage="Last Name should be 3-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{3,16}$'
							/>
							<RegistrationInput
								placeholder='Email'
								type='email'
								onValueChange={handleInputChange}
								id='email'
								errorMessage='It should be a valid email address!'
								pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
							/>
							<RegistrationInput
								placeholder='Date of birth'
								type='date'
								onValueChange={handleInputChange}
								id='date'
								errorMessage='It should be a valid date!'
								pattern='^\s*{10}$'
							/>
							<select
								className={style.select}
								value={selectedCountry}
								onChange={(e) => setSelectedCountry(e.target.value)}
								name='country'
								id='country'
							>
								<option value='RU'>Russia</option>
								<option value='BY'>Belarus</option>
								<option value='UA'>Ukraine</option>
								<option value='PL'>Poland</option>
								<option value='CN'>China</option>
								<option value='AM'>Armenia</option>
								<option value='GE'>Georgia</option>
								<option value='RO'>Romania</option>
								<option value='NL'>Netherlands</option>
								<option value='KZ'>Kazakhstan</option>
								<option value='KG'>Kyrgyzstan</option>
								<option value='DE'>Germany</option>
								<option value='GR'>Greece</option>
								<option value='EU'>Other</option>
							</select>
							<i className={style.underline} />
							<RegistrationInput
								placeholder='City'
								type='text'
								onValueChange={handleInputChange}
								id='city'
								errorMessage="City should be 3-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{3,16}$'
							/>
							<RegistrationInput
								placeholder='Street name'
								type='text'
								onValueChange={handleInputChange}
								id='streetName'
								errorMessage="Street name should be 3-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{3,16}$'
							/>
							<RegistrationInput
								placeholder='Street number'
								type='number'
								onValueChange={handleInputChange}
								id='streetNumber'
								errorMessage='Street number should contains only numbers'
								pattern='^[0-9]$'
							/>
							<RegistrationInput
								placeholder='Postal code'
								type='number'
								onValueChange={handleInputChange}
								id='postalCode'
								errorMessage='Street number should contains only numbers'
								pattern='^[0-9]$'
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Password'
								type='password'
								id='password'
								errorMessage='Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character'
								pattern='^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'
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
							<SubmitButton value='Register' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RegistrationPage;
