import React from 'react';
import { Link } from 'react-router-dom';
import header from './header.module.scss';
import Menu from './menu';
import Burger from './burger';
import useAuth from '../../hooks/useAuth';

import '../../styles/_global.scss';

function Header(): React.JSX.Element {
	const auth = useAuth();
	return (
		<header className={header.header}>
			<div className={header.container}>
				<h1 className={header.logo}><Link to='/'>GLITTER</Link></h1>
				{auth.user ? <div>{auth.user?.email}</div> : null}
				<Menu />
				<Burger />
			</div>
		</header>
	);
}
export default Header;
