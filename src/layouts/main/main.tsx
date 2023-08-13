import React from 'react';

import styles from './Main.module.scss';
import MainPage from '../../pages/mainPage/mainPage';

function Main() {
	return (
		<main>
			<div className={styles.container}>
				<MainPage />
			</div>
		</main>
	);
}
export default Main;
