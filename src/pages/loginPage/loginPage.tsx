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
			case 'emailLogin':
				loginData.email = value;
				break;
			case 'passwordLogin':
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
					<form className={s.form} action=''>
						<div className={s.inputs}>
							<RegistrationInput
								placeholder='Email'
								type='email'
								onValueChange={handleFirstNameChange}
								id='emailLogin'
								errorMessage='It should be a valid email address!'
								pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
							/>
							<RegistrationInput
								onValueChange={handleFirstNameChange}
								placeholder='Password'
								type='password'
								id='passwordLogin'
								errorMessage='It should be a valid email password!'
								pattern='^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'
							/>
							<div className={s.remember}>
								<input type='checkbox' id='checkbox-2' className={s.formCheckBox} />
								<label htmlFor='checkbox-2' className={s.checkboxLabel}>
									Remember me
								</label>
							</div>
							<LoginButton onSubmit={loginData} value='Sign in' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
