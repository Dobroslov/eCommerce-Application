import React from 'react';
import header from './header.module.scss';

interface Props {
	className: string;
	onClick?: () => void;
}
function SearchForm({ ...props }: Props): React.JSX.Element {
	return (
		<form {...props}>
			<input
				type='text'
				className={header.search__input}
				placeholder='Search'
			/>
			<button
				aria-label='text'
				type='submit'
				className={header.search__button}
			/>
		</form>
	);
}
export default SearchForm;
