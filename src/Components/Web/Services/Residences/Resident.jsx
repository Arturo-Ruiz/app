import GreenCard from '../../../../Assets/Img/Web/GREEN-CARD-01.png';
import useAuth from '../../../../Hooks/useAuth';
import './Resident.scss';

export default function Resident() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='resident' className='d-flex resident'>
			<div className='container' data-aos='fade-up'>
				<div className='section-title'>
					<h2 className='resident-title'>{language ? 'Residences' : 'Residencias'}</h2>
				</div>

				<div className='row content'>
					<div
						className='col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1'
						data-aos='fade-up'
						data-aos-delay='200'
					>
						<h3 className='resident-sub'>
							{language ? 'Residence Renewal (Green Card)' : 'Renovación de Residencia (Green Card)'}
						</h3>
						<p className='resident-sub'>
							{language
								? 'Documents necessary to process the renewal of the residence (Electronic Procedure)'
								: 'Documentos necesarios para tramitar la renovación de la residencia (Procedimiento Electrónico)'}
						</p>
						<ul>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Residence card (Green Card)' : 'Tarjeta de residencia (Green Card)'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Current Address' : 'Dirección Actual'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Parents name' : 'Nombre de padres'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Interview Location' : 'Lugar de la entrevista'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Place of birth' : 'Lugar de nacimiento'}
							</li>
							<li>
								<i className='ri-check-double-line'></i>
								{language ? 'Credit / Debit Card' : 'Tarjeta de Credito/Debito'}
							</li>
						</ul>
						<a href='#/' className='btn-get-started scrollto'>
							{language ? 'Contact us' : 'Contáctanos'}
						</a>
					</div>
					<div className='col-lg-5 align-items-stretch order-1 order-lg-2' data-aos='zoom-in' data-aos-delay='200'>
						<img src={GreenCard} className='img-fluid animated' alt='' />
					</div>
				</div>
			</div>
		</section>
	);
}
