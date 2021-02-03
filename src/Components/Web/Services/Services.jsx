import useAuth from '../../../Hooks/useAuth';
import './Services.scss';

export default function Services() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='services' className='services'>
			<div className='container' data-aos='fade-up'>
				<div className='section-title'>{language ? <h2>Services</h2> : <h2>Servicios</h2>}</div>

				<div className='row'>
					<div
						className='col-xl-4 col-md-6 d-flex pt-3 pt-3 align-items-stretch'
						data-aos='zoom-in'
						data-aos-delay='100'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-home'></i>
							</div>
							<h4>{language ? <a href='/residences'>Residences</a> : <a href='/residences'>Residencias</a>}</h4>
							{language ? (
								<p>Residence renewal process with us in an easy and fast way! without complications</p>
							) : (
								<p>
									Tramite de renovacion de residencia con nosotros de una forma facil y rapida! sin
									complicaciones
								</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch mt-4 mt-md-0'
						data-aos='zoom-in'
						data-aos-delay='200'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bxs-city'></i>
							</div>
							<h4>
								{language ? <a href='/citizenship'>Citizenship</a> : <a href='/citizenship'>Ciudadania</a>}
							</h4>
							{language ? (
								<p>Citizenship process with us in an easy and fast way! without complicationss</p>
							) : (
								<p>Tramite de ciudadania con nosotros de una forma facil y rapida! sin complicaciones</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch mt-4 mt-xl-0'
						data-aos='zoom-in'
						data-aos-delay='300'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-money'></i>
							</div>
							<h4>ITIN</h4>
							{language ? (
								<p>ITIN renewal process with us in an easy and fast way! without complications</p>
							) : (
								<p>
									Tramite de renovacion de ITIN con nosotros de una forma facil y rapida! sin complicaciones
								</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch'
						data-aos='zoom-in'
						data-aos-delay='100'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-file'></i>
							</div>
							<h4>{language ? 'Notarized Letters' : 'Cartas Notariadas'}</h4>
							{language ? (
								<p>If you need a document Notarization service, we can help you!</p>
							) : (
								<p>Si necesitas un servicio de Notarizacion de documentos, nosotros te ayudamos!</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch mt-4 mt-md-0'
						data-aos='zoom-in'
						data-aos-delay='200'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-comment-detail'></i>
							</div>
							<h4>{language ? 'Translation' : 'Traducción'}</h4>
							{language ? (
								<p>Document translation service from Spanish to English and English to Spanish</p>
							) : (
								<p>Servicio de trauccion de documentos de Espanol a Ingles e Ingles a Espanol</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch mt-4 mt-xl-0'
						data-aos='zoom-in'
						data-aos-delay='300'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-id-card'></i>
							</div>
							<h4>{language ? 'Vehicle Permit' : 'Permiso de Vehículo'}</h4>
							{language ? (
								<p>We process your vehicle permit to take it to Mexico without complications</p>
							) : (
								<p>Tramitamos tu permiso de vehículo para llevarlo a México sin complicaciones</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch'
						data-aos='zoom-in'
						data-aos-delay='100'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-sticker'></i>
							</div>
							<h4>{language ? 'Apostilles' : 'Apostillas'}</h4>
							{language ? (
								<p>If you need to Apostille documents for worldwide validation, we will help you</p>
							) : (
								<p>Si necesitas Apostillar documentos para una validación mundial, nosotros te ayudamos</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch mt-4 mt-md-0'
						data-aos='zoom-in'
						data-aos-delay='200'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-glasses'></i>
							</div>
							<h4>{language ? 'Notarization' : 'Notarización'}</h4>
							{language ? (
								<p>Process your Notary services with us, we have a solution for you</p>
							) : (
								<p>Tramita con nosotros tus servicios de Notario, tenemos una solución para ti</p>
							)}
						</div>
					</div>

					<div
						className='col-xl-4 col-md-6 d-flex pt-3 align-items-stretch mt-4 mt-xl-0'
						data-aos='zoom-in'
						data-aos-delay='300'
					>
						<div className='icon-box'>
							<div className='icon'>
								<i className='bx bx-home-smile'></i>
							</div>
							<h4>{language ? 'Purchase of Sale of Houses' : 'Compra de Casas'}</h4>
							{language ? (
								<p>
									If you need to do paperwork for the sale of a house from owner to owner, we will help you
									with liens
								</p>
							) : (
								<p>
									Si necesita hacer tramites para compra venta de casa de dueño a dueño nosotros le ayudamos
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
