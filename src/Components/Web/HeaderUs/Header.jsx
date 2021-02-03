/* eslint-disable eqeqeq */
import { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './Header.scss';

export default class Header extends Component {
	componentDidMount() {
		// Smooth scroll for the navigation menu and links with .scrollto classes
		var scrolltoOffset = $('#header').outerHeight() - 2;
		$(document).on('click', '.nav-menu a, .nav-menu-footer a, .mobile-nav a, .scrollto', function (e) {
			if (
				window.location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
				window.location.hostname == this.hostname
			) {
				try {
					var target = $(this.hash);
				} catch (error) {
					target = 0;
				}
				if (target.length) {
					e.preventDefault();

					var scrollto = target.offset().top - scrolltoOffset;
					if ($(this).attr('href') == '#header') {
						scrollto = 0;
					}

					$('html, body').animate(
						{
							scrollTop: scrollto,
						},
						1500,
						'easeInOutExpo'
					);

					if ($(this).parents('.nav-menu, .mobile-nav').length) {
						$('.nav-menu .active, .mobile-nav .active').removeClass('active');
						$(this).closest('li').addClass('active');
					}

					if ($('body').hasClass('mobile-nav-active')) {
						$('body').removeClass('mobile-nav-active');
						$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
						$('.mobile-nav-overly').fadeOut();
					}
					return false;
				}
			}
		});

		// Mobile Navigation
		if ($('.nav-menu').length) {
			var $mobile_nav = $('.nav-menu').clone().prop({
				class: 'mobile-nav d-lg-none',
			});
			$('body').append($mobile_nav);
			$('body').prepend(
				'<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
			);
			$('body').append('<div class="mobile-nav-overly"></div>');

			$(document).on('click', '.mobile-nav-toggle', function (e) {
				$('body').toggleClass('mobile-nav-active');
				$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
				$('.mobile-nav-overly').toggle();
			});

			$(document).on('click', '.mobile-nav .drop-down > a', function (e) {
				e.preventDefault();
				$(this).next().slideToggle(300);
				$(this).parent().toggleClass('active');
			});

			$(document).click(function (e) {
				var container = $('.mobile-nav, .mobile-nav-toggle');
				if (!container.is(e.target) && container.has(e.target).length === 0) {
					if ($('body').hasClass('mobile-nav-active')) {
						$('body').removeClass('mobile-nav-active');
						$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
						$('.mobile-nav-overly').fadeOut();
					}
				}
			});
		} else if ($('.mobile-nav, .mobile-nav-toggle').length) {
			$('.mobile-nav, .mobile-nav-toggle').hide();
		}

		// Navigation active state on scroll
		var nav_sections = $('section');
		var main_nav = $('.nav-menu, #mobile-nav');

		$(window).on('scroll', function () {
			var cur_pos = $(this).scrollTop() + 200;

			nav_sections.each(function () {
				var top = $(this).offset().top,
					bottom = top + $(this).outerHeight();

				if (cur_pos >= top && cur_pos <= bottom) {
					if (cur_pos <= bottom) {
						main_nav.find('li').removeClass('active');
					}
					main_nav
						.find('a[href="#' + $(this).attr('id') + '"]')
						.parent('li')
						.addClass('active');
				}
				if (cur_pos < 300) {
					$('.nav-menu ul:first li:first').addClass('active');
				}
			});
		});

		// Toggle .header-scrolled class to #header when page is scrolled
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#header').addClass('header-scrolled');
			} else {
				$('#header').removeClass('header-scrolled');
			}
		});

		if ($(window).scrollTop() > 100) {
			$('#header').addClass('header-scrolled');
		}
	}
	render() {
		return (
			<header id='header' className='fixed-top'>
				<div className='container d-flex align-items-center fixed-top__container'>
					<h1 className='logo mr-auto'>
						<a href='/'>TLPV Services</a>
					</h1>
					<nav className='nav-menu d-none d-lg-block'>
						<ul>
							<li className='active'>
								<Link to={'/#hero'}>Home</Link>
							</li>
							<li>
								<Link to={'/#about'}>About</Link>
							</li>
							<li className='drop-down'>
								<Link to={'/#services'}>Services</Link>
								<ul>
									<li>
										<Link to={'/#services'}>Apostilles</Link>
									</li>
									<li>
										<Link to={'/#services'}>Notarized Letters</Link>
									</li>
									<li>
										<Link to={'/#services'}>Purchase of Sale of Houses</Link>
									</li>
									<li>
										<Link to={'/#services'}>Notarization</Link>
									</li>
									<li>
										<Link to={'/#services'}>Vehicle Permits</Link>
									</li>
									<li>
										<Link to={'/residences'}>Residence Renewal</Link>
									</li>
									<li>
										<Link to={'/#services'}>ITIN Renewal</Link>
									</li>
									<li>
										<Link to={'/citizenship'}>Citizenship Application</Link>
									</li>
									<li>
										<Link to={'/#services'}>Translation of Documents</Link>
									</li>
								</ul>
							</li>
							<li>
								<Link to={'/#faq'}>Questions</Link>
							</li>
							<li>
								<Link to={'/#contact'}>Contact</Link>
							</li>
							<li>
								<Link to={'/admin/login'}>Sign In</Link>
							</li>
						</ul>
					</nav>
					<Link to={'/admin/login'} className='get-started-btn scrollto'>
						Login
					</Link>
				</div>
			</header>
		);
	}
}
