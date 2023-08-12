import React, { ReactNode } from 'react';

interface Props {
    children?: ReactNode,
    className:string,
	onClick?: () => void;
}
function HeaderButton({ children, ...props }:Props): React.JSX.Element {
	return (
		<button type='button' {...props}>
			{children}
		</button>
	);
}
export default HeaderButton;
