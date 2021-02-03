import whyUs from '../../../Assets/Img/Web/why-us.png';
import useAuth from '../../../Hooks/useAuth';
import './WhyUs.scss';

export default function WhyUs() {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	return (
		<section id='why-us' className='why-us section-bg'>
			<div className='container-fluid' data-aos='fade-up'>
				<div className='row'>
					<div className='col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1'>
						<div className='content'>
							{language ? (
								<h3>
									Leaders in the market <strong>Why are we different?</strong>
								</h3>
							) : (
								<h3>
									Lideres en el mercado <strong>¿Porque somos diferentes?</strong>
								</h3>
							)}

							{language ? (
								<p>
									Our experience and professionalism will give you full confidence that we will do an excellent
									job for you. We answer your questions promptly and effectively.
								</p>
							) : (
								<p>
									Nuestra experiencia y profesionalismo lo hará tener la plena confianza de que haremos un
									excelente trabajo para usted. Contestamos sus dudas con prontitud y eficacia.
								</p>
							)}
						</div>
						<div className='accordion-list'>
							<ul>
								<li>
									<a data-toggle='collapse' className='collapse' href='#accordion-list-1'>
										<span>01</span>{' '}
										{language
											? 'What documents do I need to renew my ITIN'
											: 'Cuales documentos necesito para renovar mi ITIN'}
										<i className='bx bx-chevron-down icon-show'></i>
										<i className='bx bx-chevron-up icon-close'></i>
									</a>
									<div id='accordion-list-1' className='collapse show' data-parent='.accordion-list'>
										{language ? (
											<p>
												You will need (choose) a) current passport or b) a photo ID and his birth
												certificate
											</p>
										) : (
											<p>
												Usted necesitara (escoja) a) pasaporte vigente o b) una identificación con
												fotografía y su acta de Nacimiento
											</p>
										)}
									</div>
								</li>

								<li>
									<a data-toggle='collapse' href='#accordion-list-2' className='collapsed'>
										<span>02</span>{' '}
										{language
											? 'What documents do I need to renovate my Residence'
											: 'Cuales documentos Necesito para renovar mi Residencia'}
										<i className='bx bx-chevron-down icon-show'></i>
										<i className='bx bx-chevron-up icon-close'></i>
									</a>
									<div id='accordion-list-2' className='collapse' data-parent='.accordion-list'>
										{language ? (
											<p>
												You will need your green card RESIDENCE RENEWAL (GREEN CARD) DOCUMENTS NECESSARY TO
												PROCESS RESIDENCE RENEWAL (ELECTRONIC PROCEDURE) - GREEN CARD - CURRENT ADDRESS -
												NAME OF YOUR PARENTS - NAME OF WHERE YOU HAD YOUR INTERVIEW - PLACE OF BIRTH -
												CREDIT AND/OR DEBIT CARD - THE COST IS (TO THIS DAY ASSUMED PRICES TO BE EXCHANGED
												BY THE IMMIGRATION OFFICE) - Biometrics - $85.00 - I-90 - $455.00 - Total - $540.00
												PLUS, THE COST OF THE PROCESS (MY WORK)
											</p>
										) : (
											<p>
												Documentos necesarios para tramitar la renovación de residencias (Procedimiento
												Electrónico) - Tarjeta de Residenciá (Green Card) - Dirección Actual - Nombre de sus
												padres - Nombre del lugar donde usted tuvo su entrevista - Lugar de nacimiento -
												Tarjeta de credito / debito - El costo es de: (Hasta hoy preciso sujetos a cambios
												por la oficina de inmigración) - Biometrics - $85.00 - I-90 - $455.00 - Total -
												$540.00 MAS EL COSTO DE EL TRAMITE (MI TRABAJO)
											</p>
										)}
									</div>
								</li>

								<li>
									<a data-toggle='collapse' href='#accordion-list-3' className='collapsed'>
										<span>03</span>
										{language
											? 'What documents do I need to process my citizenship'
											: 'Cuales documentos necesito para tramitar mi Ciudadanía'}
										<i className='bx bx-chevron-down icon-show'></i>
										<i className='bx bx-chevron-up icon-close'></i>
									</a>
									<div id='accordion-list-3' className='collapse' data-parent='.accordion-list'>
										{language ? (
											<p>
												If you submit any documents (copies or original documents, if requested) in a
												foreign language, you must include a full English translation along with a
												certification from the translator verifying that the translation is complete and
												accurate, and that the translator is competent to translate from the foreign
												language to English. - A copy of your Permanent Resident Card - A copy of your birth
												certificate - A copy of your marriage certificate (if applicable) - Form N-426,
												Request for Certification of Military or Naval Service (if applying for
												naturalization based on military service) - DD Form 214, NGB Form 22, or discharge
												orders (if applying for naturalization based on military service and separated from
												service) - A copy of your official military orders (if applying for naturalization
												based on military service and currently serving) - Evidence of your citizen spouse’s
												employment abroad (if applying under 319(b)) - Two passport-style photographs (if
												you reside outside the United States) Add the $85 biometric fee for a total of $725,
												where applicable
											</p>
										) : (
											<p>
												Copias o documentos originales, (si se solicita) en un idioma extranjero, debe
												incluir una traducción completa al inglés junto con una certificación del traductor
												que verifique que la traducción es completa y precisa, y que el traductor es
												competente para traducir del idioma extranjero al inglés. - Una copia de su Tarjeta
												de Residente Permanente - Una copia de su certificado de nacimiento - Una copia de
												su certificado de matrimonio (si corresponde) - Formulario N-426, Solicitud de
												Certificación del Servicio Militar o Naval (si solicita naturalización basada en el
												servicio militar) - Formulario DD 214, Formulario NGB 22, u órdenes de descarga (si
												solicita naturalización basada en el servicio militar y separada del servicio) - Una
												copia de sus órdenes militares oficiales (si solicita naturalización basada en el
												servicio militar y actualmente sirviendo) - Evidencia del empleo de su cónyuge
												ciudadano en el extranjero (si se aplica bajo 319(b)) - Dos fotografías estilo
												pasaporte (si reside fuera de los Estados Unidos)
											</p>
										)}
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div
						className='col-lg-5 align-items-stretch order-1 order-lg-2 img'
						style={{
							backgroundImage: `url(${whyUs})`,
						}}
						data-aos='zoom-in'
						data-aos-delay='150'
					>
						&nbsp;
					</div>
				</div>
			</div>
		</section>
	);
}
