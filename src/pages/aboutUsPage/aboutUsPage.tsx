import React from 'react';
import { ReactSVG } from 'react-svg';
import rsschool from '../../../public/assets/svg/rs_school_js.svg';
import style from './aboutUsPage.module.scss';

export default function AboutUsPage() {
	return (
		<div className={style.about_us__page}>
			<h1 className={`${style.title} title_h1`}>Team members</h1>
			<ul className={style.list_members_team}>
				<li className={style.member}>
					<div className={style.member_container}>
						<div className={`${style.profile_photo} ${style.sergei}`} />
						<div>
							<h2 className={`${style.name} title_h2`}>Sergey Makhnach</h2>
							<p className={`${style.about} title_h5`}>
								I am 32 years old, I work as an engineer in a cellular operator company. I want to
								learn a new profession as a front-end developer.
							</p>
							<h3 className={`${style.title_h3} title_h3`}>Contribution:</h3>
							<ul className={style.contributions}>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Developed the interface for the header and footer of the website
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Organized the work of the team through the project task board using such a tool
										as Jira
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Set up the project in CommerceTools and created API applications for interaction
										with the server (including processing tokens received from CommerceTools).
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Integrated the registration form with CommerceTools authentication service
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created an API for getting the list of products, their search and filtering. I
										also configured sorting API for products on the store page
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Set up API for working with the shopping cart (calculating the total cost of
										goods, recalculating the cost, adding items to the cart and more)
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented the cart page with the following functionalities: adding items,
										deleting them, editing their quantity in the cart, displaying the total cost of
										goods, full cleaning of the cart
									</p>
								</li>
							</ul>
							<p className={`${style.color} title_h5`}>
								GitHub:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									https://github.com/sergey-mak1{' '}
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Email:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									sega0130290@gmail.com
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Discord:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									sergey-mak1#6749
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Telegram:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									@sergeymak1
								</a>
							</p>
						</div>
					</div>
				</li>
				<li className={style.member}>
					<div className={style.member_container}>
						<div className={`${style.profile_photo} ${style.marat}`} />
						<div>
							<h2 className={`${style.name} title_h2`}>Marat Nikolaev</h2>
							<p className={`${style.about} title_h5`}>
								My name is Marat Nikolaev, I am 22 years old, live in Belarus, Vitebskaya voblast,
								Vitebsk. In 2020 I am graduated from the Educational Institution `Vitebsk State
								Medical College named after Academician I.P. Antonov` / Medical-preventive business.
								After finishing my studies and starting my professional career, I realized that
								there is no future for my profession. I started looking for myself and after a while
								I found myself in programming. And now I really want to develop in this direction, I
								like to learn and cope with difficulties. My goal is to get all possible knowledge
								in the direction of frontend development and maybe change my life in the future.
							</p>
							<h3 className={`${style.title_h3} title_h3`}>Contribution:</h3>
							<ul className={style.contributions}>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Configured the development environment for the team: Webpack, TypeScript, React,
										ESLint, Prettier, Husky
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Prepared scripts to speed up the team`s work in the development environment
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created a detailed README.md file for the project
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented logging and user registration pages with necessary validation of
										fields, also connected these pages to Commercetools
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented product catalog page, configured filtering, sorting and search for
										products
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created an interactive product card page, including adding a modal image zoom
										with slider
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented a user`s cart page (added the ability to add, remove items, clear
										the cart, display total cost and user discount)
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Improved the product page to interact with the cart
									</p>
								</li>
							</ul>
							<p className={`${style.color} title_h5`}>
								GitHub:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									https://github.com/AkuLove
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Email:{' '}
								<a href='mailto:maratnikolaev556@gmail.com' className={`${style.link} title_h5`}>
									maratnikolaev556@gmail.com
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Telegram:{' '}
								<a href='mailto:maratnikolaev556@gmail.com' className={`${style.link} title_h5`}>
									@Aku_lovee
								</a>
							</p>
						</div>
					</div>
				</li>
				<li className={style.member}>
					<div className={style.member_container}>
						<div className={`${style.profile_photo} ${style.vladimir}`} />
						<div>
							<h2 className={`${style.name} title_h2`}>Arshinnikov Vladimir</h2>
							<p className={`${style.about} title_h5`}>
								I am 39 years old. Creative developer based in Ukrain. I am specializes in
								JavaScript, React and SCSS.
							</p>
							<h3 className={`${style.title_h3} title_h3`}>Contribution:</h3>
							<ul className={style.contributions}>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created and configured the project on GitHub, thought out and designed the basic
										structure of the application in the development environment
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented routing between application pages, including a 404 page for invalid
										route requests
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created and customized the main page of the application
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented routing between application pages, including a 404 page for invalid
										route requests.
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Configured routing for navigation between login, registration, and home pages
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented a user profile page that displays the user&#39;s personal
										information and addresses. Also added the ability to edit user&#39;s personal
										information
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created the About us page
									</p>
								</li>
							</ul>
							<p className={`${style.color} title_h5`}>
								GitHub:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									https://github.com/Dobroslov
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Email:{' '}
								<a href='mailto:lordofrain7@gmail.com' className={`${style.link} title_h5`}>
									lordofrain7@gmail.com
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								LinkedIn:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									https://www.linkedin.com/in/vladimir-arshinnikov-388853223/
								</a>
							</p>
							<p className={`${style.color} title_h5`}>
								Telegram:{' '}
								<a href='#contact' className={`${style.link} title_h5`}>
									https://t.me/Vladimir_Dobroslov
								</a>
							</p>
						</div>
					</div>
				</li>
			</ul>
			<div className={style.block_logo}>
				<div className={style.logo_container} />
				<p className={`${style.color} title_h5`}>
					The development team worked closely together throughout the project. We used the Trello
					task management system to organize tasks and control the progress of the project. We also
					held regular meetings and code reviews to discuss and improve the code.
				</p>
			</div>
			<p className={`${style.color} title_h5`}>
				The first sprint involved setting up the repository, creating tasks on the board, and
				customizing the development environment. Sergey successfully integrated CommerceTools and
				developed an API client for the application. Marat installed the tools necessary for
				development, ensuring that the code style complies with the standards. Vladimir developed
				the basic structure of the future application.
			</p>

			<p className={`${style.color} title_h5`}>
				In the second sprint, Marat focused on implementing the user interface for login and
				registration, while Sergey worked on the backend for authentication and user state
				management. Vladimir successfully implemented routing for site navigation using the React
				Router library, and created the homepage and user page.
			</p>

			<p className={`${style.color} title_h5`}>
				In the third sprint, Marat took on the development of the product page in the catalog, as
				well as the product detail page and user profile. Together with Sergey, integrated the
				commercetools API to retrieve, display and manage product data. Effectively implemented an
				image slider and interface for editing user profile.
			</p>

			<p className={`${style.color} title_h5`}>
				In the fourth sprint, Marat and Sergey made improvements to the product page, created a
				shopping cart page and improved the catalog page. They added features to manage the cart
				contents and optimized performance when dealing with a large number of products. Vladimir
				implemented the About us page and refactored the existing code.
			</p>

			<p className={`${style.color} title_h5`}>
				We followed Agile methodology and used sprints to organize work. In each sprint, we set
				specific goals and benchmarks that allowed us to measure our progress and quality of work.
			</p>
			<div className={style.block_logo}>
				<a href='https://rs.school/' aria-label='Visit rs.school'>
					<ReactSVG src={rsschool} className={style.social__link} />
				</a>
				<p className={`${style.text} title_h5`}>
					We would like to express our sincere gratitude to the entire{' '}
					<a className={style.link} href='https://rs.school/'>
						RS School
					</a>{' '}
					team for creating an ideal educational place for Front-end developers. This is the place
					where the future of our profession is being built, and we feel proud to be a part of this
					learning community. Thanks to the good organization of the educational process, RS School
					has become for us not just a school, but a place where we grow as professionals
				</p>
			</div>
		</div>
	);
}
