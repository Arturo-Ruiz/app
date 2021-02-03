import { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../API/auth';
import { getServicesActiveApi } from '../../../API/serv';
import ListServices from '../../../Components/Admin/Services/ListServices';

import './Services.scss';

export default function Services() {
	const [servicesActive, setServicesActive] = useState([]);
	const [servicesInactive, setServicesInactive] = useState([]);
	const [reloadServices, setReloadServices] = useState(false);
	const token = getAccessTokenApi();

	useEffect(() => {
		getServicesActiveApi(token, true).then((response) => {
			setServicesActive(response.services);
		});
		getServicesActiveApi(token, false).then((response) => {
			setServicesInactive(response.services);
		});
		setReloadServices(false);
	}, [token, reloadServices]);

	return (
		<div className='services'>
			<ListServices
				servicesActive={servicesActive}
				servicesInactive={servicesInactive}
				setReloadServices={setReloadServices}
			/>
		</div>
	);
}
