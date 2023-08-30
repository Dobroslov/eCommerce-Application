import React, { FormEvent, useEffect, useState } from 'react';
import ChangeInput from '../../../components/inputs/changeInput/changeInput';
import SubmitButton from '../../../components/buttons/submitButton';

import style from './accountDetails.module.scss';

interface IUpdateUserData {
	firstName: string;
	lastName: string;
	email: string;
	id: string;
}

export default function AccountDetails(): React.ReactElement {
	const [userData, setUserData] = useState<IUpdateUserData>({
		firstName: '',
		lastName: '',
		email: '',
		id: '',
	});

	// const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
	// const [oldPassword, setOldPassword] = useState<string>('');

	// При загрузке компонента загружаем данные из Local Storage
	useEffect(() => {
		const storedUserData = localStorage.getItem('userData');
		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData);

			setUserData({
				firstName: parsedUserData.firstName || '',
				lastName: parsedUserData.lastName || '',
				email: parsedUserData.email || '',
				id: parsedUserData.id || '',
			});
		}

		// setIsDataChanged(false);
	}, []);

	useEffect(() => {
		console.log(userData);
	}, [userData]);

	const handleInputChange = (id: string, newValue: string): void => {
		setUserData((prevUserData) => ({
			...prevUserData,
			[id]: newValue,
		}));
		// setIsDataChanged(true);
	};

	// const handlePasswordChange = (newValue: string): void => {
	// 	setOldPassword(newValue);
	// };

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		console.log('handleSubmit', userData);

		try {
			// const updatedFields: Partial<IUpdateUserData> = {
			// };

			// setIsDataChanged(false);
		} catch (error) {
			console.error('Error handleSubmit:', error);
			// Ошибка, если что-то пошло не так
		}
	};

	return (
		<div className={style.registration}>
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
								valueInput={userData.firstName}
							/>
							<ChangeInput
								placeholder='Last Name'
								type='text'
								onValueChange={handleInputChange}
								id='lastName'
								errorMessage="Last Name should be 1-16 characters and shoudn'nt include any special character"
								pattern='^[A-Za-zА-Яа-я]{1,16}$'
								valueInput={userData.lastName}
							/>
							<ChangeInput
								placeholder='Email'
								type='email'
								onValueChange={handleInputChange}
								id='email'
								errorMessage='It should be a valid email address!'
								pattern='^(?!\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
								valueInput={userData.email}
							/>
							{/* <ChangeInput
								placeholder='Date of birth'
								type='date'
								onValueChange={handleInputChange}
								id='date'
								errorMessage='Need a user over the age of 13 ;-)'
							/> */}

							<h3 className={style.title_h3}>Password change</h3>

							{/* <ChangeInput
								onValueChange={handleInputChange}
								placeholder='Current password (leave blank to leave unchanged)'
								type='password'
								id='password'
								errorMessage='The entered password does`t match the current password'
								pattern='^[A-Za-zА-Яа-я]{1,16}$' // todo добавить текущий пароль
							/>
							<ChangeInput
								onValueChange={handlePasswordChange}
								placeholder='New password (leave blank to leave unchanged)'
								type='password'
								id='newPassword'
								errorMessage="Passwords don't match!"
	pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$'
							/>
							<ChangeInput
								onValueChange={handlePasswordChange}
								placeholder='Confirm new password'
								type='password'
								id='newCopyPassword'
								errorMessage="Passwords don't match!"
							// pattern={registrationFormData.password}
							/> */}
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
