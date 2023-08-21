import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IProductsRespons {
	body?: string;
	id?: number;
	title?: string;
	userId?: number;
}

export default function Shop(): React.ReactElement {
	const [products, setProducts] = useState<IProductsRespons[]>([]);
	// const navigate = useNavigate();

	// const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((res) => res.json())
			.then((data: IProductsRespons[]) => setProducts(data));
	}, []);

	return (
		<div>
			{/* <button type='button' onClick={goBack}>Back</button> */}
			{/* <button type='button' onClick={goHome}>Home</button> */}
			<h2>Продукты (для примера посты)</h2>
			{products.map((post) => (
				<Link key={post.id} to={`/shop/${post.id}`}>
					<div>{post.title}</div>
				</Link>
			))}
		</div>
	);
}
