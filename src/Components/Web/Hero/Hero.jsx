import heroImg from '../../../Assets/Img/Web/hero-img.png';
import useAuth from '../../../Hooks/useAuth';
import './Hero.scss';

export default function Hero() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='hero' className='d-flex align-items-center'>
			<div className='container'>
				<div className='row'>
					<div
						className='col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1'
						data-aos='fade-up'
						data-aos-delay='200'
					>
						{language ? <h1>Better solutions for your business</h1> : <h1>Mejores soluciones para su negocio</h1>}
						{language ? (
							<h2>You need to process a permit or renewal, we will do it for you</h2>
						) : (
							<h2>Necesitas tramitar algun permiso o renovación, nosotros lo hacemos por ti</h2>
						)}

						<div className='d-lg-flex'>
							<a href='#about' className='btn-get-started scrollto'>
								{language ? 'Get Started' : 'Comencemos'}
							</a>
						</div>
					</div>
					<div className='col-lg-6 order-1 order-lg-2 hero-img' data-aos='zoom-in' data-aos-delay='200'>
						<img src={heroImg} className='img-fluid animated' alt='' />
					</div>
				</div>
			</div>
		</section>
	);
}
