import React from 'react';
import Header from '../layouts/header/header';
import Main from '../layouts/main/main';

import './App.scss';
import Footer from '../layouts/footer/footer';

function App(): React.ReactElement {
	return (
		<div className='wrapper'>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
