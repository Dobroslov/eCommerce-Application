import React, { FormEvent } from 'react';
import RegistrationInput from '../../../components/inputs/registrationInput';
import SubmitButton from '../../../components/buttons/submitButton';

import style from './accountDetails.module.scss';

export default function AccountDetails(): React.ReactElement {
	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			// await createCustomer(registrationFormData, navigate);
		} catch (error) {
			console.error('Error handleSubmit:', error);
			// Обработайте ошибку, если что-то пошло не так
		}
	};

	const handleInputChange = () => {
		console.log('handleInputChange');

		// Клонируем текущее состояние, чтобы не изменять его напрямую
		// const updatedData = {
		// 	...registrationFormData,
		// };

		// switch (id) {
		// 	case 'firstName':
		// 		updatedData.firstName = value;
		// 		break;
		// 	case 'lastName':
		// 		updatedData.lastName = value;
		// 		break;
		// 	case 'email':
		// 		updatedData.email = value;
		// 		break;
		// 	case 'date':
		// 		updatedData.dateOfBirth = value;
		// 		break;
		// 	case 'password':
		// 		updatedData.password = value;
		// 		break;
		// 	case 'city':
		// 		updatedData.addresses[0].city = value;
		// 		break;
		// 	case 'streetName':
		// 		updatedData.addresses[0].streetName = value;
		// 		break;
		// 	case 'streetNumber':
		// 		updatedData.addresses[0].streetNumber = value;
		// 		break;
		// 	case 'postalCode':
		// 		updatedData.addresses[0].postalCode = value;
		// 		break;
		// 	default:
		// 		break;
		// }

		// Обновляем состояние с обновленными данными
		// setRegistrationFormData(updatedData);
	};

	return (
		<div className={style.registration}>
			<div className={`${style.container} container`}>
				<div className={style.body}>
					<h2 className={style.title_h2}>Account details</h2>
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
							{/* <RegistrationInput
								placeholder='Date of birth'
								type='date'
								onValueChange={handleInputChange}
								id='date'
								errorMessage='Need a user over the age of 13 ;-)'
							/> */}

							<h3 className={style.title_h3}>Password change</h3>

							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Current password (leave blank to leave unchanged)'
								type='password'
								id='password'
								errorMessage='The entered password does`t match the current password'
								pattern='' // todo добавить текущий пароль
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='New password (leave blank to leave unchanged)'
								type='password'
								id='copy_password'
								errorMessage="Passwords don't match!"
								pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$'
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Confirm new password'
								type='password'
								id='copy_password'
								errorMessage="Passwords don't match!"
							// pattern={registrationFormData.password}
							/>
							<div className={style.remember}>
								<input type='checkbox' id='checkbox-1' className={style.formCheckBox} />
								<label htmlFor='checkbox-1' className={style.checkboxLabel}>
									Remember me
								</label>
							</div>
							<SubmitButton value='Save changes' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
