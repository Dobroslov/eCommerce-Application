import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Breadcrumbs from '../../components/breadCrumbs/breadCrumbs';

export default function Layout() {
	return (
		<>
			<Header />
			<Breadcrumbs />
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
