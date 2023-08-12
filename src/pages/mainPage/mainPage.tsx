import React from 'react';
import ProductCardsList from '../../components/productCardsList/productCardsList';
import { IProductCard } from '../../utils/types';
// import mainCss from './mainPage.module.scss';

function MainPage(): React.ReactElement {
	const sampleCardData: IProductCard[] = [
		{
			id: 1, title: 'Card 1', image: 'gold_ring_2.jpg', price: 20, altImage: 'gold ring',
		},
		{
			id: 2, title: 'Card 2', image: 'gold_ring.jpg', price: 30, altImage: 'gold ring',
		},
		{
			id: 3, title: 'Card 3', image: 'gold_ring_2.jpg', price: 40, altImage: 'gold ring',
		},
	];

	function handleProductClick(id: number): void {
		console.log('handleProductClick', id);
	}

	return (
		<main className='main-page'>
			<div className='wrapper main__wraopper'>
				<div className='main__img'>
					<h2>Gold bih hoops</h2>
					<h3>$ 63.00</h3>
				</div>
				<div className='catalog main__catalog'>
					<div className='catalog__products latest-products'>
						<h2 className='title catalor__title'>Shop The Latest</h2>
						<a href='#top' className='catalog__link'>View All</a>
					</div>
					<ProductCardsList
						products={sampleCardData}
						handleProductClick={handleProductClick}
					/>
				</div>
			</div>
		</main>
	);
}

export default MainPage;
