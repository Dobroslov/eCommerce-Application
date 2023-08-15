import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/mainPage/mainPage';
import LoginPage from '../pages/loginPage/LoginPage';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import NotFoundPage from '../pages/notFoundPage/notFoundPage';
import Layout from '../layouts/layout/layout';
// import Header from '../layouts/header/header';
// import Main from '../layouts/main/main';

import './App.scss';
import ShopSinglPage from '../pages/singlPageShop/singlPageShop';
import Shop from '../pages/shop/shop';

function App(): React.ReactElement {
	return (
		<div className='wrapper'>
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
					<Route path='shop/:id' element={<ShopSinglPage />} />

					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			{/* <Header /> */}
			{/* <Main /> */}
		</div>
	);
}

export default App;
