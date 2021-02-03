import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../API/auth';
import { getUsersActiveApi } from '../../../API/user';
import ListUsers from '../../../Components/Admin/Users/ListUsers';

import './Users.scss';

const Users = () => {
	const [usersActive, setUsersActive] = useState([]);
	const [usersInactive, setUsersInactive] = useState([]);
	const [reloadUsers, setReloadUsers] = useState(false);
	const token = getAccessTokenApi();

	useEffect(() => {
		getUsersActiveApi(token, true).then((response) => {
			setUsersActive(response.users);
		});
		getUsersActiveApi(token, false).then((response) => {
			setUsersInactive(response.users);
		});
		setReloadUsers(false);
	}, [token, reloadUsers]);

	return (
		<div className='users'>
			<ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
		</div>
	);
};

export default Users;
