import { Fragment } from 'react';
import Questions from '../Components/Web/Questions';
import Resident from '../Components/Web/Services/Residences';

const Residences = () => {
	return (
		<Fragment>
			<Resident />
			<Questions />
		</Fragment>
	);
};

export default Residences;
