import React, { createContext, useState, useMemo } from 'react';
import { IUserLogin } from '../utils/types';
import { getToken } from '../services/apiServices';

export const AuthContext = createContext<{
	user: IUserLogin | null;
	signIn:(newUser: IUserLogin, callback: () => void) => void;
	signInError: (error: Error) => void;
	signOut: (callback: () => void) => void;
		} | null>(null);

function signInError(error: Error) {
	// Обработка ошибки аутентификации
	console.error('Ошибка аутентификации:', error);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<IUserLogin | null>(null);

	function signIn(newUser: IUserLogin, callback: () => void) {
		getToken(newUser).then(() => {
			setUser(newUser); // добавить нового юзера
			callback();
		})
			.catch((error) => {
				signInError(error);
			});
	}

	function signOut(callback: () => void) {
		setUser(null); // юзера больше нет, делаю переадресацию
		callback();
		// ожидается функция navigate, чтоб после работы с
		// пользователем можно было сделать переадресацию
	}

	const contextValue = useMemo(() => ({
		user, signIn, signOut, signInError,
	}), [user, signIn, signOut, signInError]);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
