import React from 'react';
import header from './header.module.scss';
import Menu from './menu';
import Burger from './burger';

function Header(): React.JSX.Element {
	return (
		<header className={header.header}>
			<div className={header.container}>
				<h1 className={header.logo}><a href='#top'>GLITTER</a></h1>
				<Menu />
				<Burger />
			</div>
		</header>
	);
}
export default Header;
