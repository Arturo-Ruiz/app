import useAuth from '../../../Hooks/useAuth';
import './Contact.scss';

export default function Contact() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='contact' className='contact'>
			<div className='container' data-aos='fade-up'>
				<div className='section-title'>{language ? <h2>Contact</h2> : <h2>Contacto</h2>}</div>

				<div className='row'>
					<div className='col-lg-5 d-flex align-items-stretch'>
						<div className='info'>
							<div className='address'>
								<i className='icofont-google-map'></i>
								{language ? <h4>Address:</h4> : <h4>Dirección:</h4>}
								<p>222 County Road 1534</p>
								<p>Jacksonville Texas 75766</p>
							</div>

							<div className='email'>
								<i className='icofont-envelope'></i>
								{language ? <h4>Email:</h4> : <h4>Correo:</h4>}
								<p>aalamilla71@gmail.com</p>
							</div>

							<div className='phone'>
								<i className='icofont-phone'></i>
								{language ? <h4>Phone:</h4> : <h4>Telefono:</h4>}
								<p>(903) 283-2875</p>
							</div>

							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.6476083244756!2d-95.21953448434748!3d31.916170681240438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864822cf6c78b8b5%3A0x6e4a8223c5d5be3f!2s222%20County%20Rd%201534%2C%20Jacksonville%2C%20TX%2075766%2C%20EE.%20UU.!5e0!3m2!1ses!2smx!4v1611982888270!5m2!1ses!2smx'
								title='This is a unique title'
								frameBorder='0'
								style={{
									border: '0',
									width: '100%',
									height: '290px',
								}}
								allowFullScreen
							></iframe>
						</div>
					</div>

					<div className='col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch'>
						<form action='forms/contact.php' method='post' className='php-email-form'>
							<div className='form-row'>
								<div className='form-group col-md-6'>
									{language ? <label htmlFor='name'>Name</label> : <label htmlFor='name'>Nombre</label>}
									<input
										type='text'
										name='name'
										className='form-control'
										id='name'
										data-rule='minlen:4'
										data-msg='Please enter at least 4 chars'
									/>
									<div className='validate'></div>
								</div>
								<div className='form-group col-md-6'>
									{language ? <label htmlFor='name'>Email</label> : <label htmlFor='name'>Correo</label>}
									<input
										type='email'
										className='form-control'
										name='email'
										id='email'
										data-rule='email'
										data-msg='Please enter a valid email'
									/>
									<div className='validate'></div>
								</div>
							</div>
							<div className='form-group'>
								{language ? <label htmlFor='name'>Subject</label> : <label htmlFor='name'>Asunto</label>}
								<input
									type='text'
									className='form-control'
									name='subject'
									id='subject'
									data-rule='minlen:4'
									data-msg='Please enter at least 8 chars of subject'
								/>
								<div className='validate'></div>
							</div>
							<div className='form-group'>
								{language ? <label htmlFor='name'>Message</label> : <label htmlFor='name'>Mensaje</label>}
								<textarea
									className='form-control'
									name='message'
									rows='10'
									data-rule='required'
									data-msg='Please write something for us'
								></textarea>
								<div className='validate'></div>
							</div>
							<div className='mb-3'>
								<div className='loading'>Loading</div>
								<div className='error-message'></div>
								<div className='sent-message'>Your message has been sent. Thank you!</div>
							</div>
							<div className='text-center'>
								{language ? (
									<button type='submit'>Send a Message</button>
								) : (
									<button type='submit'>Enviar mensaje</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
