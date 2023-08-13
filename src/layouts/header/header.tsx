import React from 'react';
import header from './header.module.scss';
import Menu from './menu';
import Burger from './burger';
import '../../styles/_global.scss';

function Header(): React.JSX.Element {
	return (
		<header className={header.header}>
			<div className={header.container}>
				<a href='#top' className={header.logo}>GLITTER</a>
				<Menu />
				<Burger />
			</div>
		</header>
	);
}
export default Header;
