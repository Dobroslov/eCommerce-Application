import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import { getAnonimousToken, checkAnonimousToken, getCart } from '../services/apiServices';
import useAuth from '../hooks/useAuth';
import RequireAuthorisation from '../hoc/requireAuthorisation';
import MainPage from '../pages/mainPage/mainPage';
import Layout from '../layouts/layout/layout';
import LoginPage from '../pages/loginPage/loginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import Shop from '../pages/shop/shop';
import ShopSinglPageProduct from '../pages/singlPageShop/singlPageShop';

import PrivateAccountPage from '../pages/userPageProfile/userPageProfile';
import UserDashboard from '../pages/userPageProfile/userDashboard/userDashBoard';
import AccountDetails from '../pages/userPageProfile/accountDetails/accountDetails';
import Addresses from '../pages/userPageProfile/address/address';
import NotFoundPage from '../pages/notFoundPage/notFoundPage';

import Modal from '../components/modal/modal';

import './App.scss';
import AboutUsPage from '../pages/aboutUsPage/aboutUsPage';
import CartPage from '../pages/cartPage/cart';

function App(): React.ReactElement {
	const { user, autoSignIn } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !localStorage.getItem('token')) {
			if (localStorage.getItem('anonimous')) {
				const anonimous = localStorage.getItem('anonimous') as string;
				checkAnonimousToken(anonimous);
			} else {
				getAnonimousToken().then(() => {
					getCart();
				});
			}
		}

		const token = localStorage.getItem('token');
		const userString = localStorage.getItem('userData');
		if (userString && token) {
			getCart();
			const { email } = JSON.parse(userString);
			autoSignIn(email, () => {
				if (location.state?.from) {
					navigate(location.state.from, {
						replace: true,
					});
				}
				if (localStorage.getItem('path')) {
					const path = localStorage.getItem('path') as string;
					navigate(path);
				} else {
					navigate('/');
				}
			});
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('path', window.location.pathname);
	}, [window.location.pathname]);

	useEffect(() => {
		document.addEventListener('DOMContentLoaded', () => {
			const currenPath = localStorage.getItem('path') as string;
			if (currenPath) {
				navigate(currenPath);
			}
		});

		return () => {
			document.removeEventListener('DOMContentLoaded', () => {
				const currenPath = localStorage.getItem('path') as string;
				if (currenPath) {
					navigate(currenPath);
				}
			});
		};
	}, []);

	// useEffect(() => {
	// 	first
	// 	return () => {
	// 		second
	// 	}
	// }, [third])

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
					<Route
						path='registration'
						element={user ? <Navigate to='/account_page' /> : <RegistrationPage />}
					/>
					<Route path='shop' element={<Shop />} />
					<Route path='cart' element={<CartPage />} />
					<Route path='shop/:id' element={<ShopSinglPageProduct />} />
					<Route
						path='account_page'
						element={
							<RequireAuthorisation>
								<PrivateAccountPage />
							</RequireAuthorisation>
						}
					>
						<Route index element={<UserDashboard />} />
						<Route path='addresses' element={<Addresses />} />
						<Route path='account-details' element={<AccountDetails />} />
					</Route>
					<Route path='about-us' element={<AboutUsPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Modal />
		</div>
	);
}

export default App;
