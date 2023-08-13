import React from 'react';
import Header from '../layouts/header/header';
import MainPage from '../pages/mainPage/mainPage';

import './App.scss';

function App(): React.ReactElement {
	return (
		<div className='wrapper'>
			<Header />
			<MainPage />
		</div>
	);
}

export default App;
