import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOnClickOutside from '../../hooks/hooks';
import header from './header.module.scss';
import Navigation from './navigation';
import HeaderButton from '../../components/buttons/headerButton';
import SearchForm from './searchForm';
import { RootState } from '../../store/reducers';
import { hideSearch, showSearch } from '../../store/actions';
import store from '../../store/store';

function Menu(): React.JSX.Element {
	const [activesearch, setActiveSearch] = useState(false);

	const toggleSearch = (): void => {
		store.dispatch(showSearch());
		setActiveSearch(true);
	};
	const search = useSelector((state:RootState) => state.search.search);

	const closeSearch = (): void => {
		if (search) {
			store.dispatch(hideSearch());
			setActiveSearch(false);
		}
	};

	const quantity = useSelector((state: RootState) => state.data.cart?.quantity);
	const node = useRef<HTMLDivElement>(null);
	useOnClickOutside(node, (): void => closeSearch());

	return (
		<div className={header.menu} ref={node}>
			<Navigation />
			<div className={header.cards}>
				<HeaderButton
					area-label='Search'
					className={`${header.search} ${header.button__header}`}
					onClick={toggleSearch}
				/>
				<Link to='/cart' className={`${header.basket} ${header.button__header}`}>
					<span className={header.quantity}>{quantity}</span>
				</Link>
				<Link to='/account_page' className={`${header.profile} ${header.button__header}`} />
			</div>
			<SearchForm
				activesearch={activesearch}
				className={search ? `${header.search__form} ${header.open}` : header.search__form}
			/>
		</div>
	);
}
export default Menu;
