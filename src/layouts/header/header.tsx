import React from 'react';
import header from './header.module.scss';
import Menu from './menu';
import Burger from './burger';

function Header(): React.JSX.Element {
	return (
		<header className={header.header}>
			<a href='#top' className={header.logo}>GLITTER</a>
			<Menu />
			<Burger />
		</header>
	);
}
export default Header;
