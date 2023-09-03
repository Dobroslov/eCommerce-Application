import React, { FormEvent, useEffect, useState } from 'react';
import ChangeInput from '../../../components/inputs/changeInput/changeInput';
import SubmitButton from '../../../components/buttons/submitButton';

import style from './accountDetails.module.scss';
import { changeCustomerValues, changePassword } from '../../../services/apiServices';
import { IUpdateUserData } from '../../../utils/types';

interface IUpdatePassword {
	oldPassword: string;
	newPassword: string;
}

export default function AccountDetails(): React.ReactElement {
	const [userData, setUserData] = useState<IUpdateUserData>({
		firstName: '',
		lastName: '',
		email: '',
		dateOfBirth: '',
		id: '',
	});

	const [datePassword, setDatePassword] = useState<IUpdatePassword>({
		oldPassword: '',
		newPassword: '',
	});

	const [isUserDataChanged, setIsUserDataChanged] = useState(false);
	const [isPasswordChanged, setisPasswordChanged] = useState(false);

	// При загрузке компонента загружаем данные из Local Storage
	useEffect(() => {
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData);
			setUserData({
				firstName: parsedUserData.firstName || '',
				lastName: parsedUserData.lastName || '',
				email: parsedUserData.email || '',
				dateOfBirth: parsedUserData.dateOfBirth || '',
				id: parsedUserData.id || '',
			});
		}
	}, []);

	const handleInputChange = (newValue: string, id: string): void => {
		if (id === 'oldPassword' || id === 'newPassword' || id === 'newCopyPassword') {
			setDatePassword((prevUserData) => ({
				...prevUserData, [id]: newValue,
			}));
			setisPasswordChanged(true);
		} else {
			setUserData((prevUserData) => ({
				...prevUserData,
				[id]: newValue,
			}));
			setIsUserDataChanged(true);
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (isUserDataChanged) {
			try {
				changeCustomerValues(userData);
			} catch (error) {
				console.error('Error updating user data:', error);
				// Обработка ошибки, если что-то пошло не так при изменении данных пользователя
			}
		}

		if (isPasswordChanged) {
			try {
				changePassword(datePassword);
			} catch (error) {
				console.error('Error changing password:', error);
				// Обработка ошибки, если что-то пошло не так при изменении пароля
			}
		}
	};

	return (
		<div className={`${style.container} container`}>
			<div className={style.body}>
				<h2 className={style.title_h2}>Account details</h2>
				<form className={style.form} onSubmit={handleSubmit}>
					<div className={style.inputs}>
						<ChangeInput
							placeholder='First name'
							type='text'
							onValueChange={handleInputChange}
							id='firstName'
							errorMessage="First name should be 1-16 characters and shoudn'nt include any special character"
							pattern='^[A-Za-zА-Яа-я]{1,16}$'
							initValue={userData.firstName}
						/>
						<ChangeInput
							placeholder='Last Name'
							type='text'
							onValueChange={handleInputChange}
							id='lastName'
							errorMessage="Last Name should be 1-16 characters and shoudn'nt include any special character"
							pattern='^[A-Za-zА-Яа-я]{1,16}$'
							initValue={userData.lastName}
						/>
						<ChangeInput
							placeholder='Email'
							type='email'
							onValueChange={handleInputChange}
							id='email'
							errorMessage='It should be a valid email address!'
							pattern='^(?!\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
							initValue={userData.email}
						/>
						<ChangeInput
							placeholder='Date of birth'
							type='date'
							onValueChange={handleInputChange}
							id='dateOfBirth'
							errorMessage='Need a user over the age of 13 ;-)'
							initValue={userData.dateOfBirth}
						/>

						<h3 className={style.title_h3}>Password change</h3>

						<ChangeInput
							onValueChange={handleInputChange}
							placeholder='Current password (leave blank to leave unchanged)'
							type='password'
							id='oldPassword'
							errorMessage='The entered password does`t match the current password'
							pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$' // todo добавить текущий пароль
						/>
						<ChangeInput
							onValueChange={handleInputChange}
							placeholder='New password (leave blank to leave unchanged)'
							type='password'
							id='newPassword'
							errorMessage="Passwords don't match!"
							pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$'
						/>
						<ChangeInput
							onValueChange={handleInputChange}
							placeholder='Confirm new password'
							type='password'
							id='newCopyPassword'
							errorMessage="Passwords don't match!"
							pattern={datePassword.newPassword}
						/>

						{/* <SubmitButton value='Save changes' /> */}
						<SubmitButton value='Save changes' />
					</div>
				</form>
			</div>
		</div>
	);
}
