import React from 'react';
import Header from '../layouts/header/header';
import MainPage from '../pages/mainPage/mainPage';

import './App.scss';

function App(): React.ReactElement {
	return (
		<>
			<Header />
			<MainPage />
		</>
	);
}

export default App;
