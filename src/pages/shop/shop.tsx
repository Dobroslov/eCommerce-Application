import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './shop.module.scss';
import Filter from './filter/filter';
import { getSortingProducts } from '../../services/apiServices';
import { IProduct } from '../../utils/types';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shop(): React.ReactElement {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [sorting, setSorting] = useState<string>('createdAt');
	const [sortLimit, setSortLimit] = useState<string>('9');
	const [sortOrder, setSortOrder] = useState<string>('desc');
	const [sortOffset, setSortOffset] = useState<string>('0');

	// const navigate = useNavigate();

	// const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });
	const handleSortChange = (value: string) => {
		console.log(value);
		const sortArray = value.split(' ');
		setSortLimit(sortArray[0]);
		setSortOffset(sortArray[1]);
		setSorting(sortArray[2]);
		setSortOrder(sortArray[3]);
	};

	useEffect(() => {
		getSortingProducts(sortLimit, sortOffset, sorting, sortOrder)
			.then((data) => {
				console.log(data);
				if (data) setProducts(data);
			})
			.catch((error) => error);
	}, [sorting, sortOrder]);

	return (
		<section className={style.catalog}>
			<h3 className={style.catalogTitle}>Shop The Latest</h3>
			<div className={style.body}>
				<Filter onValueChange={handleSortChange} />
				<div className={style.products}>
					{/* <button type='button' onClick={goBack}>Back</button> */}
					{/* <button type='button' onClick={goHome}>Home</button> */}
					{products.map((product) => (
						<Link key={product.id} to={`/shop/${product.id}`}>
							<div className={style.item}>
								<div className={style.image}>
									<img src={product.image} alt='ring' />
								</div>
								<div className={style.title}>{product.name}</div>
								<div className={style.price}>
									{product.price} {product.currencyCode}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
