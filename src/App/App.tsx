import React from 'react';
import Header from '../layouts/header/header';
import Main from '../layouts/main/main';
import RegistrationPage from '../pages/registrationPage/registrationPage';

import './App.scss';

function App(): React.ReactElement {
	return (
		<div className='wrapper'>
			<Header />
			<Main />
			<RegistrationPage />
		</div>
	);
}

export default App;
