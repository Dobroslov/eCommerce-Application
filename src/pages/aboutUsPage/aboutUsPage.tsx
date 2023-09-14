import React from 'react';

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
								I am 32 years old, I work as an engineer in a cellular operator company. I want to learn a new profession as a front-end developer.
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
										Organized the work of the team through the project task board using such a tool as Jira
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Set up the project in CommerceTools and created API applications for interaction with the server (including processing tokens received from CommerceTools).
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Integrated the registration form with CommerceTools authentication service
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created an API for getting the list of products, their search and filtering. I also configured sorting API for products on the store page
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Set up API for working with the shopping cart (calculating the total cost of goods, recalculating the cost, adding items to the cart and more)
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented the cart page with the following
										functionalities: adding items, deleting them, editing their quantity in the cart, displaying the total cost of goods, full cleaning of the cart
									</p>
								</li>
							</ul>
							<p className={`${style.color} title_h5`}>GitHub: <a href='#contact' className={`${style.link} title_h5`}>https://github.com/sergey-mak1 </a>
							</p>
							<p className={`${style.color} title_h5`}>Email: <a href='#contact' className={`${style.link} title_h5`}>sega0130290@gmail.com</a>
							</p>
						</div>
					</div>
				</li>
				<li className={style.member}>
					<div className={style.member_container}>
						<div className={`${style.profile_photo} ${style.sergei}`} />
						<div>
							<h2 className={`${style.name} title_h2`}>Arshinnikov Vladimir</h2>
							<p className={`${style.text} title_h5`}>
								I am 39 years old. Creative developer based in Ukrain. I am specializes in JavaScript, React and SCSS.
							</p>
							<h3 className={`${style.title_h3} title_h3`}>Contribution:</h3>
							<ul className={style.contributions}>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created and configured the project on GitHub, thought out and designed the basic structure of the application in the development environment
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented routing between application pages, including a 404 page for invalid route requests
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created and customized the main page of the application
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented routing between application pages, including a 404 page for invalid route requests.
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Configured routing for navigation between login, registration, and home pages
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented a user profile page that displays the user&#39;s personal information and addresses. Also added the ability to edit user&#39;s personal information
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created the About us page
									</p>
								</li>
							</ul>
							<p className={`${style.color} title_h5`}>GitHub: <a href='#contact' className={`${style.link} title_h5`}>https://github.com/AkuLove</a>
							</p>
							<p className={`${style.color} title_h5`}>Email: <a href='#contact' className={`${style.link} title_h5`}>sega0130290@gmail.com</a>
							</p>
						</div>
					</div>
				</li>
				<li className={style.member}>
					<div className={style.member_container}>
						<div className={style.profile_photo} />
						<div>
							<h2 className={`${style.name} title_h2`}>Arshinnikov Vladimir</h2>
							<p className={`${style.text} title_h5`}>
								I am 39 years old. Creative developer based in Ukrain. I am specializes in JavaScript, React and SCSS.
							</p>
							<h3 className={`${style.title_h3} title_h3`}>Contribution:</h3>
							<ul className={style.contributions}>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created and configured the project on GitHub, thought out and designed the basic structure of the application in the development environment
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented routing between application pages, including a 404 page for invalid route requests
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created and customized the main page of the application
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented routing between application pages, including a 404 page for invalid route requests.
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Configured routing for navigation between login, registration, and home pages
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Implemented a user profile page that displays the user&#39;s personal information and addresses. Also added the ability to edit user&#39;s personal information
									</p>
								</li>
								<li className={style.contributions__item}>
									<p className={`${style.contributions__text} title_h5`}>
										Created the About us page
									</p>
								</li>
							</ul>
							<p className={`${style.color} title_h5`}>GitHub: <a href='#contact' className={`${style.link} title_h5`}>https://github.com/Dobroslov</a>
							</p>
							<p className={`${style.color} title_h5`}>Email: <a href='#contact' className={`${style.link} title_h5`}>lordofrain7@gmail.com</a>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}
