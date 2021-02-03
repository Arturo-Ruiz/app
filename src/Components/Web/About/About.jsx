import useAuth from '../../../Hooks/useAuth';
import './About.scss';

export default function About() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='about' className='about'>
			<div className='container' data-aos='fade-up'>
				<div className='section-title'>{language ? <h2>About us</h2> : <h2>Acerca de Nosotros</h2>}</div>

				<div className='row content'>
					<div className='col-lg-12 pt-4 pt-lg-0'>
						{language ? (
							<p>
								We offer services in both Spanish languages as English, with experience of almost 20 years at
								the service of our community. You are fully sure that all the procedures carried out by us will
								be done in a respectful manner and with the utmost discretion. We also offer a pleasant and
								reliable atmosphere.
							</p>
						) : (
							<p>
								Ofrecemos servicios en los dos idiomas español como ingles, con experiencia de casi 20 anos al
								servicio de nuestra comunidad. Tenga usted la plena seguridad de que todos los tramites
								realizados por nosotros se harán de una manera respetuosa y con la mayor discreción. Ofrecemos
								También un ambiente agradable y confiable.
							</p>
						)}
						{language ? (
							<a href='/#contact' className='btn-learn-more'>
								Saber mas
							</a>
						) : (
							<a href='/#contact' className='btn-learn-more'>
								More
							</a>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
