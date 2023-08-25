import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './loginPage.module.scss';
import useAuth from '../../hooks/useAuth';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import { IUserLogin } from '../../utils/types';
import SubmitButton from '../../components/buttons/submitButton';

function LoginPage(): React.ReactElement | null {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, signIn } = useAuth();

	const [loginData, setLoginData] = useState<IUserLogin>({
		email: '',
		password: '',
	});

	const handleInputChange = (value: string, id: string) => {
		switch (id) {
			case 'emailLogin':
				setLoginData({
					...loginData, email: value,
				});
				break;
			case 'passwordLogin':
				setLoginData({
					...loginData, password: value,
				});
				break;
			default:
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		signIn(
			{
				email: loginData.email,
				password: loginData.password,
			},
			() => {
				console.log('handleSubmit', user);
				if (user) {
					// Только если пользователь успешно авторизовался, тогда выполняйте редирект
					if (location.state?.from) {
						navigate(location.state.from, {
							replace: true,
						});
					} else {
						navigate('/account_page');
					}
				}
			},
		);
	};

	return (
		<div className={style.login}>
			<div className={`${style.container} container`}>
				<div className={style.body}>
					<h1 className={style.title}>My account</h1>
					<div className={style.buttons}>
						<RegistrationSwitchButton value='Sign in' active='active' />
						<RegistrationSwitchButton value='Register' />
					</div>
					<form className={style.form} onSubmit={handleSubmit}>
						<div className={style.inputs}>
							<RegistrationInput
								placeholder='Email'
								type='email'
								onValueChange={handleInputChange}
								id='emailLogin'
								errorMessage='It should be a valid email address!'
								pattern='^(?!\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Password'
								type='password'
								id='passwordLogin'
								errorMessage='It should be a valid password!'
								pattern='^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$'
							/>
							<div className={style.remember}>
								<input type='checkbox' id='checkbox-2' className={style.formCheckBox} />
								<label htmlFor='checkbox-2' className={style.checkboxLabel}>
									Remember me
								</label>
							</div>
							<SubmitButton value='Sign in' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
