import React from 'react';
import s from './registrationPage.module.scss';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import SubmitButton from '../../components/buttons/submitButton';
import getAccessToken from '../../services/apiServices';

interface IRegistration {
	firstName: string;
	lastName: string;
	email: string;
	date: string;
	address: string;
	password: string;
}

const data: IRegistration = {
	firstName: '',
	lastName: '',
	email: '',
	date: '',
	address: '',
	password: '',
};

function RegistrationPage(): React.ReactElement {
	const handleFirstNameChange = (value: string, id: string) => {
		switch (id) {
			case 'firstName':
				data.firstName = value;
				break;
			case 'lastName':
				data.lastName = value;
				break;
			case 'email':
				data.email = value;
				break;
			case 'date':
				data.date = value;
				break;
			case 'address':
				data.address = value;
				break;
			case 'password':
				data.password = value;
				break;
			default:
		}
	};

	getAccessToken();

	return (
		<div>
			<div className={`${s.container} container`}>
				<div className={s.body}>
					<h1 className={s.title}>Registration</h1>
					<div className={s.buttons}>
						<RegistrationSwitchButton value='Sign in' />
						<RegistrationSwitchButton value='Register' />
					</div>
					<div className={s.inputs}>
						<RegistrationInput
							placeholder='Fist name'
							type='text'
							onValueChange={handleFirstNameChange}
							id='firstName'
						/>
						<RegistrationInput
							placeholder='Last Name'
							type='text'
							onValueChange={handleFirstNameChange}
							id='lastName'
						/>
						<RegistrationInput
							placeholder='Email'
							type='email'
							onValueChange={handleFirstNameChange}
							id='email'
						/>
						<RegistrationInput
							placeholder='Date of birth'
							type='date'
							onValueChange={handleFirstNameChange}
							id='date'
						/>
						<RegistrationInput
							placeholder='Address'
							type='text'
							onValueChange={handleFirstNameChange}
							id='address'
						/>
						<RegistrationInput
							placeholder='Password'
							type='password'
							onValueChange={handleFirstNameChange}
							id='password'
						/>
						<RegistrationInput
							onValueChange={handleFirstNameChange}
							placeholder='Copy your password'
							type='password'
							id='copy_password'
						/>
						<div className={s.remember}>
							<input
								type='checkbox'
								id='checkbox-2'
								className={s.formCheckBox}
							/>
							<label htmlFor='checkbox-2' className={s.checkboxLabel}>
								Remember me
							</label>
						</div>
						<SubmitButton value='Register' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegistrationPage;
