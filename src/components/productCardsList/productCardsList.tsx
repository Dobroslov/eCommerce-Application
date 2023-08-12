import React from 'react';
import { IProductCard } from '../../utils/types';
import ProductCard from '../productCard/productCard';

interface IProductListProps {
	products: IProductCard[],
	handleProductClick: (id: number) => void
}

function ProductCardsList(props: IProductListProps): React.ReactElement {
	const { products, handleProductClick } = props;

	return (
		<ul className='main-products__list products products-flex'>
			{products.map((product) => (
				<ProductCard key={product.id} handleProductClick={handleProductClick} {...product} />
			))}
		</ul>
	);
}

export default ProductCardsList;
