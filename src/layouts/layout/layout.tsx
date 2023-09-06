import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function Layout() {
	return (
		<>
			<Header />
			{/* этот блок статичен и не обновляется при переходах на другую страницу */}
			<main>
				<div className='container'>
					<Outlet />
					{/* В Outlet обновляются разные страницы - mainPage, login, magazine */}
				</div>
			</main>
			<Footer />
			{/* этот блок статичен и не обновляется при переходах на
			другую страницу */}
		</>
	);
}
