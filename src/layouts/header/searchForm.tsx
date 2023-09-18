import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import header from './header.module.scss';
import { IProduct } from '../../utils/types';
import { getFilter } from '../../services/apiServices';
import store from '../../store/store';
import { hideSearch } from '../../store/actions';
import { RootState } from '../../store/reducers';

interface Props {
	className: string;
	onClick?: () => void;
}
function SearchForm({ ...props }: Props): React.JSX.Element {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [search, setSearch] = useState<string>('');
	const input = useRef<HTMLInputElement | null>(null);
	const s = useSelector((state: RootState) => state.search.search);
	useEffect(() => {
		if (search.length > 0 && s) {
			getFilter(100, 0, `&text.en-US=${search}`).then((data) => {
				if (data) {
					setProducts(data.productsArr);
				}
			});
		} else {
			if (input.current) {
				input.current.value = '';
			}
			setSearch('');
			getFilter(100, 0, '&text.en-US=""').then((data) => {
				if (data) {
					setProducts(data.productsArr);
				}
			});
		}
	}, [search, s]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const closeSearch = (): void => {
		store.dispatch(hideSearch());
		if (input.current) {
			input.current.value = '';
		}
		setSearch('');
	};
	return (
		<form {...props}>
			<input
				type='text'
				className={header.search__input}
				placeholder='Search'
				onChange={handleSearch}
				ref={input}
			/>
			<button aria-label='text' type='submit' className={header.search__button} />
			<div className={products.length > 0 ? header.list : header.listNone}>
				{products?.map((product) => (
					<Link key={product.id + 20} to={`/shop/${product.id}`} onClick={closeSearch}>
						<div className={header.body}>
							<div>
								<img src={product.image} alt='product-logo' />
							</div>
							<div>
								<p className={header.name}>{product.name}</p>
								<div>
									{product.discount !== 'NaN' ? (
										<>
											{product.discount} {product.currencyCode}{' '}
											<p className={header.lineThrough}>
												{product.price} {product.currencyCode}
											</p>
										</>
									) : (
										`${product.price} ${product.currencyCode}`
									)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</form>
	);
}
export default SearchForm;
