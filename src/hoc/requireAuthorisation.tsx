import React, { JSX } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RequireAuthorisation({ children }: { children: JSX.Element }) {
	const location = useLocation();
	const { user } = useAuth(); // инфо об авторизации

	if (!user) {
		// проверка есть авторизация или нет
		return (
			<Navigate
				to='/login'
				state={{
					from: location,
				}}
			/>
		);
		// если авторизации нет, то перенаправляем на страницу логирования(авторизации),
		// а state={{ from: location }} - нужен для того,
		// чтоб мы вернулись обратно после того как логирование произойдёт
	}

	return children; // если можем авторизоваться, то сюда передаём страницу для отрисовки
}
