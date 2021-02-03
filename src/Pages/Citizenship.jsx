import { Fragment } from 'react';
import Questions from '../Components/Web/Questions';
import Citizen from '../Components/Web/Services/Citizenship';

const Citizenship = () => {
	return (
		<Fragment>
			<Citizen />
			<Questions />
		</Fragment>
	);
};

export default Citizenship;
