import { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../API/auth';
import { getServicesActiveApi } from '../../../API/serv';
import { getUserServicesApi } from '../../../API/userServ';
import useAuth from '../../../Hooks/useAuth';
import ListServices from '../../../Components/User/Services/ListServices';
import './Services.scss';

export default function Services() {
	const [servicesActive, setServicesActive] = useState([]);
	const [userService, setUserService] = useState([]);
	const [reloadServices, setReloadServices] = useState(false);
	const token = getAccessTokenApi();
	const { globalVar } = useAuth();
	const { globalUser } = globalVar;
	const { user } = globalUser;

	useEffect(() => {
		getServicesActiveApi(token, true).then((response) => {
			setServicesActive(response.services);
		});
		getUserServicesApi(token, user.id).then((response) => {
			setUserService(response.services);
		});
		setReloadServices(false);
	}, [token, reloadServices, user]);

	const listService = servicesActive?.map(function (service) {
		const list = userService.find((userDb) => userDb.serviceId === service._id);
		if (list) {
			return list;
		} else {
			return service;
		}
	});

	return (
		<div className='user-services'>
			<ListServices servicesActive={listService} setReloadServices={setReloadServices} />
		</div>
	);
}
