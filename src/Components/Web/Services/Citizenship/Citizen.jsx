import Citizenship from '../../../../Assets/Img/Web/CITIZENSHIP-01.png';
import useAuth from '../../../../Hooks/useAuth';
import './Citizen.scss';

export default function Citizen() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='citizen' className='d-flex citizen'>
			<div className='container' data-aos='fade-up'>
				<div className='section-title'>
					<h2 className='citizen-title'>{language ? 'Citizenship' : 'Ciudadanía'}</h2>
				</div>

				<div className='row content'>
					<div
						className='col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1'
						data-aos='fade-up'
						data-aos-delay='200'
					>
						<h3 className='citizen-sub'>{language ? 'Citizenship Application' : 'Solicitud de Ciudadania'}</h3>
						{language ? (
							<p className='citizen-sub'>
								It is an optional tool to use as you fill out your form, but it does not replace the legal,
								regulatory, and form instructional requirements. We recommend that you review these requirements
								before completing and submitting your form.
							</p>
						) : (
							<p className='citizen-sub'>
								Es una herramienta opcional para usar a medida que usted llena su formulario, pero no reemplaza
								los requisitos legales, reglamentarios y de instrucción de formulario. Le recomendamos que
								revise estos requisitos antes de completar y enviar su formulario.
							</p>
						)}
						<ul>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Copy of Permanent Resident Card' : 'Copia de Tarjeta de Residente Permanente'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Copy of your birth certificate' : 'Copia de su certificado de nacimiento'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language
									? 'Copy of your marriage certificate (if applicable)'
									: 'Copia de su certificado de matrimonio (si corresponde)'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language
									? 'Form N-426, Application for Certification of Military or Naval Service (If applying for naturalization based on military service)'
									: 'Formulario N-426, Solicitud de Certificación del Servicio Militar o Naval (Si solicita naturalización basada en el servicio militar)'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language
									? 'DD Form 214, NGB Form 22, or discharge orders (If applying for naturalization based on military service and separate from service)'
									: 'Formulario DD 214, Formulario NGB 22, u órdenes de descarga (Si solicita naturalización basada en el servicio militar y separada del servicio)'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language
									? 'Copy of your official military orders (If applying for naturalization based on military service and currently serving)'
									: 'Copia de sus órdenes militares oficiales (Si solicita naturalización basada en el servicio militar y actualmente sirviendo)'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language
									? "Evidence of your foreign citizen spouse's employment (If applicable under 319 (b))"
									: 'Evidencia del empleo de su cónyuge ciudadano en el extranjero (Si se aplica bajo 319(b))'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language
									? 'Two passport-style photographs (If you reside outside the United States)'
									: 'Dos fotografías estilo pasaporte (Si reside fuera de los Estados Unidos)'}
							</li>
						</ul>
						<a href='#/' className='btn-get-started scrollto'>
							{language ? 'Contact Us' : 'Contáctanos'}
						</a>
					</div>
					<div className='col-lg-5 align-items-stretch order-1 order-lg-2' data-aos='zoom-in' data-aos-delay='200'>
						<img src={Citizenship} className='img-fluid animated' alt='Citizen' />
					</div>
				</div>
			</div>
		</section>
	);
}
