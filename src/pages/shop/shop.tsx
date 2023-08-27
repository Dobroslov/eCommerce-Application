import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './shop.module.scss';
import Filter from './filter/filter';
import { getProducts } from '../../services/apiServices';
import { IProduct } from '../../utils/types';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shop(): React.ReactElement {
	const [products, setProducts] = useState<IProduct[]>([]);
	// const navigate = useNavigate();

	// const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });

	useEffect(() => {
		getProducts(4, 0, 'createdAt', 'desc')
			.then((data) => {
				console.log(data);
				if (data) setProducts(data);
			})
			.catch((error) => error);
	}, []);

	return (
		<section className={style.catalog}>
			<h1 className={style.catalogTitle}>Shop The Latest</h1>
			<div className={style.body}>
				<Filter />
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
