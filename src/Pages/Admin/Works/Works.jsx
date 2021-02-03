import { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../API/auth';
import { getAllUserServicesApi } from '../../../API/userServ';
import ListServices from '../../../Components/Admin/Works/ListServices';
import './Works.scss';

export default function Works() {
	const [userService, setUserService] = useState([]);
	const [reloadServices, setReloadServices] = useState(false);
	const token = getAccessTokenApi();

	useEffect(() => {
		getAllUserServicesApi(token).then((response) => {
			setUserService(response.services);
		});
		setReloadServices(false);
	}, [token, reloadServices]);

	return (
		<div className='user-services'>
			<ListServices servicesActive={userService} setReloadServices={setReloadServices} />
		</div>
	);
}
