import React from 'react';
import { ReactSVG } from 'react-svg';
import footer from './footer.module.scss';
import rsschool from '../../../public/assets/svg/rs_school_js.svg';
import linkedin from '../../../public/assets/svg/linkedin.svg';
import facebook from '../../../public/assets/svg/facebook.svg';
import instagram from '../../../public/assets/svg/instagram.svg';
import twitter from '../../../public/assets/svg/twitter.svg';

function Footer(): React.JSX.Element {
	return (

		<footer className={footer.footer}>
			<div className={footer.container}>
				<a href='https://rs.school/js/' className={footer.rss}><ReactSVG src={rsschool} className={footer.social__link} /></a>
				<p>© 2023 RSSchool. Created by Ctrl-C Ctrl-V gang.</p>
				<div className={footer.social}>
					<a href='https://www.linkedin.com/'>
						{' '}
						<ReactSVG src={linkedin} className={footer.social__link} />
					</a>
					<a href='https://www.facebook.com/'><ReactSVG src={facebook} className={footer.social__link} /></a>
					<a href='https://www.instagram.com/'><ReactSVG src={instagram} className={footer.social__link} /></a>
					<a href='https://twitter.com/'><ReactSVG src={twitter} className={footer.social__link} /></a>

				</div>
			</div>
		</footer>
	);
}
export default Footer;
