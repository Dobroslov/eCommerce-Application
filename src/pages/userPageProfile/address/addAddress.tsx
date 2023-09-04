// import React, { useState, FormEvent } from 'react';
// import { addAddress, addressActions } from '../../../services/apiServices';
// import RegistrationInput from '../../../components/inputs/registrationInput';
// import RegistrationButton from '../../../components/buttons/registrationButton';

// import style from './address.module.scss';

// export default function RegistrationPage(): React.ReactElement {
// 	// Создаем состояние для хранения значений полей формы
// 	const [address, setAddress] = useState({
// 		country: '',
// 		city: '',
// 		streetName: '',
// 		streetNumber: '',
// 		postalCode: '',
// 	});

// 	// Создаем состояние для выбранной страны
// 	const [selectedCountry, setSelectedCountry] = useState('RU');

// 	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
// 		e.preventDefault();

// 		try {
// 			addAddress(address);
// 			if (true) { //todo добавить проверку есть ли галочка
// 				// addressActions(addressActions, addressId);
// 			}
// 		} catch (error) {
// 			console.error('Error handleSubmit:', error);
// 			// Обработайте ошибку, если что-то пошло не так
// 		}
// 	};

// 	const handleInputChange = (newValue: string, id: string): void => {
// 		setAddress((prevUserData) => ({
// 			...prevUserData,
// 			[id]: newValue,
// 		}));
// 	}

// 	return (
// 		<div className={style.registration}>
// 			<div className={`${style.container} container`}>
// 				<div className={style.body}>
// 					<h1 className={style.title}>Registration</h1>
// 					<form className={style.form} onSubmit={handleSubmit}>
// 						<div className={style.inputs}>
// 							<select
// 								className={style.select}
// 								value={selectedCountry}
// 								onChange={(e) => setSelectedCountry(e.target.value)}
// 								name='country'
// 								id='country'
// 							>
// 								<option value='RU'>Russia</option>
// 								<option value='BY'>Belarus</option>
// 								<option value='UA'>Ukraine</option>
// 								<option value='PL'>Poland</option>
// 								<option value='CN'>China</option>
// 								<option value='AM'>Armenia</option>
// 								<option value='GE'>Georgia</option>
// 								<option value='RO'>Romania</option>
// 								<option value='NL'>Netherlands</option>
// 								<option value='KZ'>Kazakhstan</option>
// 								<option value='KG'>Kyrgyzstan</option>
// 								<option value='DE'>Germany</option>
// 								<option value='GR'>Greece</option>
// 								<option value='EU'>Other</option>
// 							</select>
// 							<RegistrationInput
// 								placeholder='City'
// 								type='text'
// 								onValueChange={handleInputChange}
// 								id='city'
// 								errorMessage="City should be 1-16 characters and shoudn'nt include any special character"
// 								pattern='^[A-Za-zА-Яа-я]{1,16}$'
// 							/>
// 							<RegistrationInput
// 								placeholder='Street name'
// 								type='text'
// 								onValueChange={handleInputChange}
// 								id='streetName'
// 								errorMessage="Street name should be 1-16 characters and shoudn'nt include any special character"
// 								pattern='^[A-Za-zА-Яа-я]{1,16}$'
// 							/>
// 							<RegistrationInput
// 								placeholder='Street number'
// 								type='number'
// 								onValueChange={handleInputChange}
// 								id='streetNumber'
// 								errorMessage='Street number should contains only positive numbers'
// 								pattern='^[0-9]+$'
// 							/>
// 							<RegistrationInput
// 								placeholder='Postal code'
// 								type='text'
// 								onValueChange={handleInputChange}
// 								id='postalCode'
// 								errorMessage='The postal code must be like this ("12345" or
// 								"12345-6789" or "K1M 1E3").'
// 								pattern='^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z] \d[A-Z]\d)$'
// 							/>
// 							<RegistrationInput
// 								onValueChange={handleInputChange}
// 								placeholder='Password'
// 								type='password'
// 								id='password'
// 								errorMessage='Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character'
// 								pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$'
// 							/>
// 							<RegistrationInput
// 								onValueChange={handleInputChange}
// 								placeholder='Copy your password'
// 								type='password'
// 								id='copy_password'
// 								errorMessage="Passwords don't match!"
// 								pattern={registrationFormData.password}
// 							/>
// 							<div className={style.remember}>
// 								<input type='checkbox' id='checkbox-1' className={style.formCheckBox} />
// 								<label htmlFor='checkbox-1' className={style.checkboxLabel}>
// 									Remember me
// 								</label>
// 							</div>
// 							<RegistrationButton value='Register' />
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
