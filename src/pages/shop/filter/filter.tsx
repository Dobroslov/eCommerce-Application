/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import style from './filter.module.scss';
import DefaultInput from '../../../components/inputs/defaultInput';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

const handleInputChange = (value: string, id: string) => {
	console.log(value, id);
};

export default function Filter(): React.ReactElement {
	const [value, setValue] = useState<number[]>([30, 1200]);
	return (
		<div className={style.filter}>
			<div className={style.search}>
				<DefaultInput
					placeholder='Search...'
					type='text'
					onValueChange={handleInputChange}
					id='1'
				/>
			</div>
			<select className={style.select} name='Sort' id=''>
				<option value=''>Sort by newest</option>
				<option value=''>Sort by latest</option>
				<option value=''>Sort from A to Z</option>
				<option value=''>Sort from Z to A</option>
				<option value=''>Sort by price: high to low</option>
				<option value=''>Sort by price: low to high</option>
			</select>
			<ReactSlider
				className={style.slider}
				defaultValue={[30, 1200]}
				max={1200}
				min={30}
				onChange={(newValue) => setValue(newValue)}
			/>
			<div className={style.price}>
				Price: ${value[0]} - ${value[1]}
			</div>
			<div className={style.onSaleBody}>
				<p>On sale</p>
				<label className={style.switch} htmlFor='sale'>
					<input type='checkbox' name='sale' id='sale' className={style.onSale} />
					<span className={style.slider} />
				</label>
			</div>
		</div>
	);
}
