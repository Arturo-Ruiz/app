import Us from '../../../Assets/Img/Web/us.png';
import Mx from '../../../Assets/Img/Web/mx.png';
import useAuth from '../../../Hooks/useAuth';
import './Language.scss';

export default function Language() {
	const { globalVar } = useAuth();
	const { language, setLanguage } = globalVar;
	return (
		<section className='flag-language'>
			<div className='container flag-language__container'>
				{language ? (
					<img onClick={() => setLanguage(!language)} src={Mx} alt='' className='img-fluid' />
				) : (
					<img onClick={() => setLanguage(!language)} src={Us} alt='' className='img-fluid' />
				)}
			</div>
		</section>
	);
}
