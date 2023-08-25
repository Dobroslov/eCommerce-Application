import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './shop.module.scss';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IProduct {
	id: string;
	image: string;
	price: string;
	title: string;
}

const exampleProducts = [
	{
		id: '1',
		image: 'https://i.etsystatic.com/9582948/r/il/ad5911/1189499644/il_1588xN.1189499644_s8ex.jpg',
		price: '200 EUR',
		title: 'Golden ring',
	},
	{
		id: '2',
		image:
			'https://cs2.livemaster.ru/storage/ca/01/2119471c14a529ddac172141c8wz--ukrasheniya-koltso-zolotoe.jpg',
		price: '100 EUR',
		title: 'Golden ring with diamond',
	},
	{
		id: '3',
		image:
			'https://alexbrosjewellers.com.au/wp-content/uploads/2018/09/engagement-ring-melbourne.jpg',
		price: '100 EUR',
		title: 'Golden ring with diamond',
	},
	{
		id: '4',
		image:
			'https://cs2.livemaster.ru/storage/ca/01/2119471c14a529ddac172141c8wz--ukrasheniya-koltso-zolotoe.jpg',
		price: '100 EUR',
		title: 'Golden ring with diamond',
	},
];

export default function Shop(): React.ReactElement {
	const [products, setProducts] = useState<IProduct[]>([]);
	// const navigate = useNavigate();

	// const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });

	useEffect(() => {
		setProducts(exampleProducts);
	}, []);

	return (
		<section className={style.catalog}>
			<h1>Shop The Latest</h1>
			<div className={style.body}>
				<div className={style.filters}>123</div>
				<div className={style.products}>
					{/* <button type='button' onClick={goBack}>Back</button> */}
					{/* <button type='button' onClick={goHome}>Home</button> */}
					{products.map((product) => (
						<Link key={product.id} to={`/shop/${product.id}`}>
							<div className={style.item}>
								<div className={style.image}>
									<img src={product.image} alt='ring' />
								</div>
								<div className={style.title}>{product.title}</div>
								<div className={style.price}>{product.price}</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
