import React, { createContext, useState, useMemo } from 'react';
import { IUserLogin } from '../utils/types';

export const AuthContext = createContext<{
	user: IUserLogin | null;
	signIn:(newUser: IUserLogin, callback: () => void) => void;
	signOut: (callback: () => void) => void;
		} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<IUserLogin | null>(null);

	const signIn = (newUser: IUserLogin, callback: () => void) => {
		console.log('file: authProvider.tsx:13 ~ signIn ~ newUser:', newUser);
		setUser(newUser); // добавить нового юзера
		callback();
	};

	const signOut = (callback: () => void) => {
		setUser(null); // юзера больше нет, делаю переадресацию
		callback();
		// ожидается функция navigate, чтоб после работы с
		// пользователем можно было сделать переадресацию
	};

	const contextValue = useMemo(() => ({
		user, signIn, signOut,
	}), [user, signIn, signOut]);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
