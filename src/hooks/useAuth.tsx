import { useContext } from 'react';
import { AuthContext } from '../hoc/authProvider';

export default function useAuth() {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return authContext;
}
