import React, {
	useState, FormEvent, ChangeEvent, JSX,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IUserLogin } from '../../utils/types';

export default function LoginPage(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn, signOut } = useAuth();

	const fromPage = location.state?.from?.pathname || '/';

	const [loginData, setLoginData] = useState<IUserLogin>({
		email: '',
		password: '',
	});

	function handleSubmit(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		signIn(
			{
				email: loginData.email,
				password: loginData.password,
			},
			() => navigate(fromPage, { replace: true }),
		);
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<div>
			<h1>Login page</h1>
			<button type='button' onClick={() => signOut(() => navigate('/', { replace: true }))}>Logout</button>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					value={loginData.email}
					onChange={handleInputChange}
				/>
				<input
					type='password'
					name='password'
					value={loginData.password}
					onChange={handleInputChange}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}
