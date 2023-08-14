import React from 'react';
import Header from '../layouts/header/header';
import Main from '../layouts/main/main';

import './App.scss';

function App(): React.ReactElement {
	return (
		<div className='wrapper'>
			<Header />
			<Main />
		</div>
	);
}

export default App;
