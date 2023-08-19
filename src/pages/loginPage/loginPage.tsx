import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './loginPage.module.scss';
import useAuth from '../../hooks/useAuth';
import RegistrationSwitchButton from '../../components/buttons/registrationSwitchButton';
import RegistrationInput from '../../components/inputs/registrationInput';
import LoginButton from '../../components/buttons/loginButton';
import { getAnonimousToken } from '../../services/apiServices';
import { IUserLogin } from '../../utils/types';

// export default function LoginPage(): JSX.Element {
// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	const { signIn } = useAuth();

// 	const fromPage = location.state?.from?.pathname || '/';

// 	const [loginData, setLoginData] = useState<IUserLogin>({
// 		email: '',
// 		password: '',
// 	});

// 	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
// 		e.preventDefault();

// 		signIn(
// 			{
// 				email: loginData.email,
// 				password: loginData.password,
// 			},
// 			() => navigate(fromPage, {
// 				replace: true,
// 			}),
// 		);
// 	}

// 	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
// 		const { name, value } = e.target;

// 		setLoginData((prevData) => ({
// 			...prevData,
// 			[name]: value,
// 		}));
// 	};

// 	return (
// 		<div>
// 			<h1>Login page</h1>
// 			<form onSubmit={handleSubmit}>
// 				<input
// 					type='email'
// 					name='email'
// 					value={loginData.email}
// 					onChange={handleInputChange}
// 				/>
// 				<input
// 					type='password'
// 					name='password'
// 					value={loginData.password}
// 					onChange={handleInputChange}
// 				/>
// 				<button type='submit'>Login</button>
// 			</form>
// 		</div>
// 	);
// }

// const loginData: IUserLogin = {
// 	email: '',
// 	password: '',
// };

function LoginPage(): React.ReactElement {
	const location = useLocation();
	const navigate = useNavigate();
	const { signIn } = useAuth();

	const [loginData, setLoginData] = useState<IUserLogin>({
		email: '',
		password: '',
	});

	if (!localStorage.getItem('token')) {
		getAnonimousToken();
	}

	const handleInputChange = (value: string, id: string) => {
		// управляемый инпут
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
				if (location.state?.from) {
					// Если есть информация о предыдущей странице, перейдите туда
					navigate(location.state.from, {
						replace: true,
					});
				} else {
					// В противном случае перейдите на домашнюю страницу
					navigate('/');
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
						<RegistrationSwitchButton value='Sign in' />
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
								pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
							/>
							<RegistrationInput
								onValueChange={handleInputChange}
								placeholder='Password'
								type='password'
								id='passwordLogin'
								errorMessage='It should be a valid email password!'
								pattern='^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'
							/>
							<div className={style.remember}>
								<input type='checkbox' id='checkbox-2' className={style.formCheckBox} />
								<label htmlFor='checkbox-2' className={style.checkboxLabel}>
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
