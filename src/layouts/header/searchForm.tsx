import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import header from './header.module.scss';
import { IProduct } from '../../utils/types';
import { getFilter } from '../../services/apiServices';

interface Props {
	className: string;
	onClick?: () => void;
	activeSearch: boolean;
}
function SearchForm({ ...props }: Props): React.JSX.Element {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [search, setSearch] = useState<string>('');
	const input = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (search.length > 0 && props.activeSearch) {
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
	}, [search, props.activeSearch]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
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
					<Link key={product.id + 20} to={`/shop/${product.id}`}>
						<div className={header.body}>
							<div>
								<img src={product.image} alt='product-logo' />
							</div>
							<div>
								<p className={header.name}>{product.name}</p>
								<p>
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
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</form>
	);
}
export default SearchForm;
