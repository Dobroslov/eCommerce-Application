import React from 'react';

import styles from './main.module.scss';
import MainPage from '../../pages/mainPage/mainPage';

function Main() {
	return (
		<main className={styles.main__page}>
			<div className={styles.container}>
				<MainPage />
			</div>
		</main>
	);
}
export default Main;
