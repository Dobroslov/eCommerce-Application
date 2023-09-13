import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import header from './header.module.scss';
// import HeaderButton from '../../components/buttons/headerButton';
import Popup from './popup';
import useOnClickOutside from '../../hooks/hooks';
import { RootState } from '../../store/reducers';
import store from '../../store/store';
import { hideBurger, showBurger } from '../../store/actions';

function Burger(): React.JSX.Element {
	const burger = useSelector((state:RootState) => state.burger.burger);
	const toggleBurger = ():void => {
		if (burger) {
			store.dispatch(hideBurger());
		} else {
			store.dispatch(showBurger());
		}
	};
	const closeBurger = ():void => {
		if (burger) {
			store.dispatch(hideBurger());
		}
	};
	const node = useRef<HTMLDivElement>(null);
	useOnClickOutside(node, ():void => closeBurger());
	const quantity = useSelector((state:RootState) => state.data.cart?.quantity);
	return (
		<div className={burger ? `${header.burger} ${header.activate}` : header.burger} ref={node}>
			<Link to='/cart' className={`${header.basket} ${header.button__header}`} onClick={closeBurger}><span className={header.quantity}>{quantity}</span></Link>
			{/* <HeaderButton className={header.basket}><span className={header.quantity}>{quantity}</span></HeaderButton> */}
			<div className={burger ? `${header.nav__button} ${header.activate}` : header.nav__button} role='presentation' onClick={toggleBurger}>
				<span className={header.nav__line} />
				<span className={header.nav__line} />
				<span className={header.nav__line} />
			</div>
			<div className={`${header.popup} ${burger ? header.open : ''}`}>
				<Popup />
			</div>
		</div>
	);
}
export default Burger;
