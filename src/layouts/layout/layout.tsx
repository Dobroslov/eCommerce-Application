import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../header/header';

export default function Layout() {
	return (
		<>
			<Header />
			{/* этот блок статичен и не обновляется при переходах на другую страницу */}

			<main>
				<div className='container'>
					<Outlet />
				</div>
			</main>

			{/* Тут обновляются разные страницы - mainPage, login, magazine */}

			{/* TODO: <Footer /> Его нужно добавить, когда будет готов  */}
			{/* этот блок статичен и не обновляется при переходах на
			другую страницу */}
		</>
	);
}
