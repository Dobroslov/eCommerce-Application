import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/loginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import NotFoundPage from '../pages/notFoundPage/notFoundPage';
import Layout from '../layouts/layout/layout';
import ShopSinglPageProduct from '../pages/singlPageShop/singlPageShop';
import Shop from '../pages/shop/shop';
import RequireAuthorisation from '../hoc/requireAuthorisation';
import './App.scss';
import PrivateAccountPage from '../pages/accountPage/accountPage';
import { getAnonimousToken } from '../services/apiServices';
import Modal from '../components/modal/modal';
import useAuth from '../hooks/useAuth';
// import store from '../store/store';

function App(): React.ReactElement {
	const { user, autoSignIn } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	//	const selected = store.getState().data.data;
	// console.log(selected?.sortLimit);
	useEffect(() => {
		if (!user && !localStorage.getItem('token')) {
			getAnonimousToken();
		}
		const token = localStorage.getItem('token');
		const userString = localStorage.getItem('userData');
		if (userString && token) {
			const { email } = JSON.parse(userString);
			autoSignIn(email, () => {
				if (location.state?.from) {
					navigate(location.state.from, {
						replace: true,
					});
				} else {
					// В противном случае перейдите на домашнюю страницу
					navigate('/');
				}
			});
		}
	}, []);

	return (
		<div className='wrapper'>
			<Routes>
				<Route path='/' element={<Layout />}>
					{/* общая обёртка в которой хранится header и футер
					 между ними мы динамически меняем содержание */}
					<Route index path='/' element={<MainPage />} />
					{/* ключевое слово "index" во вложенном роуте говорит о том,
					 что это значение используется по умолчанию */}
					<Route path='login' element={user ? <Navigate to='/account_page' /> : <LoginPage />} />
					<Route path='registration' element={user ? <Navigate to='/account_page' /> : <RegistrationPage />} />
					<Route path='shop' element={<Shop />} />
					<Route path='shop/:id' element={<ShopSinglPageProduct />} />
					<Route
						path='account_page'
						element={(
							<RequireAuthorisation>
								<PrivateAccountPage />
							</RequireAuthorisation>
						)}
					/>
					{/* <Route path='about' element={<AboutUs />} />
					<Route path='about-us' element={<Navigate to='/about' replace />} /> */}
					{/* About - эти две строки это пример редиректа, если он нужен будет в дальнейшем
					import { Routes, Route, Navigate } from 'react-router-dom'; - добавить в импортах
					*/}
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Modal />
		</div>
	);
}

export default App;
