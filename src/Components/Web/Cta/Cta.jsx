import useAuth from '../../../Hooks/useAuth';
import './Cta.scss';

export default function Cta() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<div>
			<section id='cta' className='cta'>
				<div className='container' data-aos='zoom-in'>
					<div className='row'>
						<div className='col-lg-9 text-center text-lg-left'>
							{language ? <h3>Contact Us</h3> : <h3>Comunicate con nosotros</h3>}
							{language ? (
								<p>
									If you have any questions about our services or require that one of our advisors guide you to
									carry out any of these procedures, please send us a message and we will gladly assist you.
								</p>
							) : (
								<p>
									Si tienes alguna duda acerca de nuestros servicios o requieres que uno de nuestros asesores
									te oriente para realizar alguno de estos trámites por favor envianos un mensaje y con gusto
									te atenderemos.
								</p>
							)}
						</div>
						<div className='col-lg-3 cta-btn-container text-center'>
							{language ? (
								<a className='cta-btn align-middle' href='/#contact'>
									Send a Message
								</a>
							) : (
								<a className='cta-btn align-middle' href='/#contact'>
									Envía un mensaje
								</a>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
