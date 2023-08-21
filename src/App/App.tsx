import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/loginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import NotFoundPage from '../pages/notFoundPage/notFoundPage';
import Layout from '../layouts/layout/layout';
import ShopSinglPageProduct from '../pages/singlPageShop/singlPageShop';
import Shop from '../pages/shop/shop';
import RequireAuthorisation from '../hoc/requireAuthorisation';
import { AuthProvider } from '../hoc/authProvider';
import './App.scss';
import PrivateAccountPage from '../pages/accountPage/accountPage';
import { getAnonimousToken } from '../services/apiServices';
import Modal from '../components/modal/modal';



function App(): React.ReactElement {


	if (!localStorage.getItem('token')) {
		useEffect(() => {
			getAnonimousToken();
		},[])
	}
	return (
		<div className='wrapper'>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Layout />}>
						{/* общая обёртка в которой хранится header и футер
					 между ними мы динамически меняем содержание */}
						<Route index path='/' element={<MainPage />} />
						{/* ключевое слово "index" во вложенном роуте говорит о том,
					 что это значение используется по умолчанию */}
						<Route path='login' element={<LoginPage />} />
						<Route path='registration' element={<RegistrationPage />} />
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
			</AuthProvider>
			<Modal  />
		</div>
	);
}

export default App;
