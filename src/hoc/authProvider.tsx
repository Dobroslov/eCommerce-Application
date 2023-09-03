/* eslint-disable indent */
import React, { createContext, useState, useMemo } from 'react';
import { IUserLogin } from '../utils/types';
import { getToken } from '../services/apiServices';

export const AuthContext = createContext<{
	user: IUserLogin | null;
	autoSignIn: (email: string, callback: () => void) => void;
	signIn: (newUser: IUserLogin, callback: () => void) => void;
	signOut: (callback: () => void) => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<IUserLogin | null>(null);

	async function signIn(newUser: IUserLogin, callback: () => void) {
		await getToken(newUser)
			.then(() => {
				const token = localStorage.getItem('token');
				const userString = localStorage.getItem('userData');
				if (userString && token) {
					const { email } = JSON.parse(userString);
					console.log('file: authProvider.tsx:21 ~ getToken ~ email:', email);
					setUser({
						email,
					});
					console.log('file: authProvider.tsx:14 ~ AuthProvider ~ user:', user);
					callback();
				}
			})
			.catch(() => {
				setUser(null);
				console.log('signIn error');
				callback();
			});
	}

	function signOut(callback: () => void) {
		setUser(null); // юзера больше нет, делаю переадресацию
		localStorage.removeItem('token');
		localStorage.removeItem('userData');
		callback();
		// в callback() функция navigate, для разлогинивания
		// пользователя можно было сделать переадресацию на главную
	}

	function autoSignIn(email: string, callback: () => void) {
		const userEmail = localStorage.getItem('userData');
		const userToken = localStorage.getItem('token');
		const userData = {
			email,
		};

		if (userEmail && userToken) {
			// Если есть сохраненная почта и токен, выполните "автоматическую" авторизацию
			setUser(userData);
			callback();
		}
	}

	const contextValue = useMemo(
		() => ({
			user,
			signIn,
			signOut,
			autoSignIn,
		}),
		[user, signIn, signOut, autoSignIn],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
