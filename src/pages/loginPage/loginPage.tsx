import React from 'react';
import s from './loginPage.module.scss';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import LoginButton from '../../components/buttons/loginButton';
import { getAnonimousToken } from '../../services/apiServices';
import { ILogin } from '../../utils/types';

const loginData: ILogin = {
	email: '',
	password: '',
};

function LoginPage(): React.ReactElement {
	if (!localStorage.getItem('token')) {
		getAnonimousToken();
	}

	const handleFirstNameChange = (value: string, id: string) => {
		console.log(loginData);
		switch (id) {
			case 'email':
				loginData.email = value;
				break;
			case 'password':
				loginData.password = value;
				break;
			default:
		}
	};

	return (
		<div>
			<div className={`${s.container} container`}>
				<div className={s.body}>
					<h1 className={s.title}>My account</h1>
					<div className={s.buttons}>
						<RegistrationSwitchButton value='Sign in' />
						<RegistrationSwitchButton value='Register' />
					</div>
					<div className={s.inputs}>
						<RegistrationInput placeholder='Email' type='email' onValueChange={handleFirstNameChange} id='email' />
						<RegistrationInput onValueChange={handleFirstNameChange} placeholder='Password' type='password' id='password' />
						<div className={s.remember}>
							<input type='checkbox' id='checkbox-2' className={s.formCheckBox} />
							<label htmlFor='checkbox-2' className={s.checkboxLabel}>
								Remember me
							</label>
						</div>
						<LoginButton onSubmit={loginData} value='Sign in' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
