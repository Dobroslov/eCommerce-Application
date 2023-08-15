import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div>
			This page doesnt exitst.Go
			{' '}
			<Link to='/'>Home</Link>
		</div>
	);
}
