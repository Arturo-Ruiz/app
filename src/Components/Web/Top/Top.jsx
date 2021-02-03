import { Component } from 'react';
import $ from 'jquery';
import './Top.scss';

export default class Top extends Component {
	componentDidMount() {
		// Back to top button
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.back-to-top').fadeIn('slow');
			} else {
				$('.back-to-top').fadeOut('slow');
			}
		});

		$('.back-to-top').click(function () {
			$('html, body').animate(
				{
					scrollTop: 0,
				},
				1500,
				'easeInOutExpo'
			);
			return false;
		});
	}

	render() {
		return (
			<a href='#/' className='back-to-top'>
				<i className='ri-arrow-up-line'></i>
			</a>
		);
	}
}
