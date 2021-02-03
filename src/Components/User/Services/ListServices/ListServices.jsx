import Modal from '../../../Modal';
import EditServices from '../EditServices';
import EditUserForm from '../EditUserForm';
import { useState, useEffect } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { getAccessTokenApi } from '../../../../API/auth';
import { contractServiceApi, deleteService } from '../../../../API/userServ';
import { getDocumentsByUserApi } from '../../../../API/doc';
import { getUserActiveApi } from '../../../../API/user';
import { List, Button, notification, Modal as ModalAntd } from 'antd';
import { EditOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import './ListServices.scss';

const { confirm } = ModalAntd;

export default function ListServices(props) {
	const { servicesActive, setReloadServices } = props;
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [userDb, setUserDb] = useState({});
	const [modalTitle, setModalTitle] = useState('');
	const [modalContent, steModalContent] = useState(null);
	const token = getAccessTokenApi();
	const { globalVar } = useAuth();
	const { globalUser } = globalVar;
	const { user } = globalUser;

	useEffect(() => {
		getUserActiveApi(token, user).then((result) => {
			setUserDb(result);
		});
	}, [token, user]);

	const editUser = (userDb) => {
		setIsVisibleModal(true);
		setModalTitle(`Edit ${user.name ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`);
		steModalContent(<EditUserForm user={userDb} setIsVisibleModal={setIsVisibleModal} />);
	};

	return (
		<div className='list-services'>
			<div className='list-services__header'>
				<div className='list-services__header-switch'></div>
				<Button type='primary' onClick={() => editUser(userDb)}>
					Profile
				</Button>
			</div>
			<div className='list-services__header'></div>
			<ServicesActive
				servicesActive={servicesActive}
				setIsVisibleModal={setIsVisibleModal}
				setModalTitle={setModalTitle}
				steModalContent={steModalContent}
				setReloadServices={setReloadServices}
				user={user}
			/>
			<Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>
		</div>
	);
}

function ServicesActive(props) {
	const { servicesActive, setIsVisibleModal, setModalTitle, steModalContent, setReloadServices, user } = props;

	const editService = (service) => {
		setIsVisibleModal(true);
		setModalTitle(`Edit ${service.name ? service.name : '...'}`);
		steModalContent(
			<EditServices service={service} setIsVisibleModal={setIsVisibleModal} setReloadServices={setReloadServices} />
		);
	};

	return (
		<List
			className='services-active'
			itemLayout='horizontal'
			dataSource={servicesActive}
			renderItem={(service) => (
				<ServiceActive
					service={service}
					editService={editService}
					setReloadServices={setReloadServices}
					user={user}
				/>
			)}
		/>
	);
}

function ServiceActive(props) {
	const { service, editService, setReloadServices, user } = props;
	const token = getAccessTokenApi();
	const dateContract = getDateService(service.updatedAt);
	const contractService = () => {
		confirm({
			title: `Contract ${service.name}`,
			content: `Are you sure to hire the service of ${service.name} for a price of $${service.price}?`,
			okText: 'Contract',
			okType: 'primary',
			cancelText: 'Cancel',
			onOk() {
				service.userId = user.id;
				contractServiceApi(token, service)
					.then((response) => {
						notification['success']({
							message: response,
						});

						setReloadServices(true);
					})
					.catch((err) => {
						notification['error']({
							message: err,
						});
					});
			},
		});
	};

	const deleteContractService = () => {
		confirm({
			title: `Cancel ${service.name}`,
			content: `Are you sure to cancel the ${service.name} service?`,
			okText: 'Cancel',
			okType: 'primary',
			cancelText: 'Close',
			onOk() {
				getDocumentsByUserApi(token, { user: service.userId, service: service.serviceId }).then((result) => {
					const array = result[0];
					if (!array) {
						deleteService(token, service._id)
							.then((response) => {
								notification['success']({
									message: response,
								});
								setReloadServices(true);
							})
							.catch((err) => {
								notification['error']({
									message: err,
								});
							});
					} else {
						notification['error']({
							message: 'Delete documents first',
						});
					}
				});
			},
		});
	};

	return (
		<>
			{service.contract ? (
				<List.Item
					actions={[
						<Button type='primary' onClick={() => editService(service)}>
							<EditOutlined />
						</Button>,
						<Button type='danger' onClick={deleteContractService}>
							<DeleteOutlined />
						</Button>,
					]}
				>
					<List.Item.Meta
						title={`
						${service.name} - $${service.price} - Hiring date: ${dateContract} - Status: ${service.status}
					`}
						description={service.description}
					/>
				</List.Item>
			) : (
				<List.Item
					actions={[
						<Button type='primary' onClick={contractService}>
							<DollarOutlined />
						</Button>,
					]}
				>
					<List.Item.Meta
						title={`
						${service.name ? service.name : '...'} - $${service.price}				
					`}
						description={service.description}
					/>
				</List.Item>
			)}
		</>
	);
}

function getDateService(updatedAt) {
	const created_date = new Date(updatedAt);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const year = created_date.getFullYear();
	const month = months[created_date.getMonth()];
	const date = created_date.getDate();
	const hour = created_date.getHours();
	const min = created_date.getMinutes();
	const sec = created_date.getSeconds();
	const time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}
