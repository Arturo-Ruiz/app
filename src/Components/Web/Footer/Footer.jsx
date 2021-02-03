import useAuth from '../../../Hooks/useAuth';
import './Footer.scss';

export default function Footer() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<footer id='footer'>
			<div className='footer-top'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-3 col-md-6 footer-contact'>
							<h3>TLPV Services</h3>
							<p>
								222 County Road 1534 <br />
								Jacksonville Texas 75766 <br />
								United States <br /> <br />
								<strong>{language ? 'Phone:' : 'Teléfono:'}</strong> (903) 283-2875
								<br />
								<strong>{language ? 'Email:' : 'Correo:'}</strong> aalamilla71@gmail.com
								<br />
							</p>
						</div>
						<div className='col-lg-3 col-md-6 footer-links'>
							<h4>Navegación</h4>
							<nav className='nav-menu-footer'>
								<ul>
									<li>
										<i className='bx bx-chevron-right'></i> <a href='/'>{language ? 'Home' : 'Inicio'}</a>
									</li>
									<li>
										<i className='bx bx-chevron-right'></i>{' '}
										<a href='/#about'>{language ? 'About' : 'Acerca'}</a>
									</li>
									<li>
										<i className='bx bx-chevron-right'></i>{' '}
										<a href='/#services'>{language ? 'Services' : 'Servicios'}</a>
									</li>
									<li>
										<i className='bx bx-chevron-right'></i>{' '}
										<a href='/#contact'>{language ? 'Contact' : 'Contacto'}</a>
									</li>
								</ul>
							</nav>
						</div>

						<div className='col-lg-3 col-md-6 footer-links'>
							{language ? <h4>Our services</h4> : <h4>Nuestros Servicios</h4>}

							<ul>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/apostilles'>{language ? 'Apostilles' : 'Apostillas'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/notarized'>{language ? 'Notarized letters' : 'Cartas Notariadas'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/houses'>{language ? 'Purchase of Sale of Houses' : 'Compra de Casas'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/notarization'>{language ? 'Notarization' : 'Notarización'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/vehicle'>{language ? 'Vehicle Permits' : 'Permiso de Vehículos'}</a>
								</li>
							</ul>
						</div>

						<div className='col-lg-3 col-md-6 footer-links'>
							<ul>
								<li className='pt-4'>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/residences'>{language ? 'Residence Renewal' : 'Renovación de Recidencias'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/itin'>{language ? 'ITIN Renewal' : 'Renovación de ITIN'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/citizenship'>{language ? 'Citizenship Application' : 'Solicitud de Ciudadanía'}</a>
								</li>
								<li>
									<i className='bx bx-chevron-right'></i>{' '}
									<a href='/translation'>
										{language ? 'Translation of documents' : 'Traducción de Documentos'}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className='container footer-bottom clearfix'>
				<div className='copyright'>
					&copy; 2020 Copyright{' '}
					<strong>
						<span>TLPV Services</span>
					</strong>
					. {language ? 'All rights reserved' : 'Todos los derechos reservados'}
				</div>
				<div className='credits'>
					Designed by{' '}
					<a target='_blank' rel='noreferrer' href='https://muvawd.com.mx/' className='muva'>
						MUVA WEB DESIGN
					</a>
				</div>
			</div>
		</footer>
	);
}
