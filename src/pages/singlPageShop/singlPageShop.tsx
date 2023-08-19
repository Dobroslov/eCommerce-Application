import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface IProductRespons {
	body?: string;
	id?: number;
	title?: string;
	userId?: number;
}

export default function ShopSinglPageProduct(): React.ReactElement {
	const { id } = useParams(); // получаем параметры ссылки
	const navigate = useNavigate();
	// два параметра: 1)куда перенаправить пользователя 2)
	const [product, setProduct] = useState<IProductRespons | null>(null);

	const goBack = () => navigate(-1);
	const goHome = () => navigate('/', { replace: true });
	// const goForward = () => navigate(1); // вперёд по истории

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((res) => res.json())
			.then((data: IProductRespons) => setProduct(data));
	}, [id]);

	return (
		<div>
			<button type='button' onClick={goBack}>Back</button>
			<button type='button' onClick={goHome}>Home</button>
			<h2>Карточка продукта (для примера пост)</h2>
			{product && (
				<>
					<h2>{product.title}</h2>
					<p>{product.body}</p>
				</>
			)}
		</div>
	);
}
