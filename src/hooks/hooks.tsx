import { useEffect, RefObject } from 'react';

const useOnClickOutside = (
	ref: RefObject<HTMLDivElement>,
	closeMenu: () => void,
) => {
	useEffect(() => {
		const close = (event: MouseEvent): void => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return;
			}
			closeMenu();
		};

		document.addEventListener('mousedown', close);
		return () => {
			document.removeEventListener('mousedown', close);
		};
	}, [ref, closeMenu]);
};
export default useOnClickOutside;
