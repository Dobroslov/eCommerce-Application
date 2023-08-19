import React, {
	useState, ChangeEvent, FormEvent, JSX,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegistrationForm } from '../../utils/types';

export default function RegistrationPage(): JSX.Element {
	const navigate = useNavigate();

	// Создаем состояние для хранения значений полей формы
	const [formData, setFormData] = useState<IRegistrationForm>({
		login: '',
		password: '',
		userName: '',
		userPhone: '',
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		// Остальная логика регистрации

		// После успешной регистрации перенаправляем на главную страницу
		navigate('/', { replace: true });
	};

	// Обработчик изменения полей формы
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		// Обновляем состояние с новыми значениями
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div>
			<h1>Registration page</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='login'
					id='login'
					placeholder='login'
					value={formData.login}
					onChange={handleInputChange}
				/>
				<input
					type='password'
					name='password'
					id='userPassword'
					placeholder='password'
					value={formData.password}
					onChange={handleInputChange}
				/>
				<input
					type='text'
					name='userName'
					id='userName'
					placeholder='user name'
					value={formData.userName}
					onChange={handleInputChange}
				/>
				<input
					type='tel'
					name='userPhone'
					id='userPhone'
					placeholder='user phone'
					value={formData.userPhone}
					onChange={handleInputChange}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}
