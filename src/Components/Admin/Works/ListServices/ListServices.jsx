import Modal from '../../../Modal';
import EditServices from '../EditServices';
import { Fragment, useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { getAccessTokenApi } from '../../../../API/auth';
import { getDocumentsByUserApi, deleteDocumentsByIdApi } from '../../../../API/doc';
import { updateStatusServiceApi, deleteService } from '../../../../API/userServ';
import { List, Button, notification, Modal as ModalAntd } from 'antd';
import {
	WarningOutlined,
	CheckOutlined,
	MinusCircleOutlined,
	CheckCircleOutlined,
	CloudDownloadOutlined,
} from '@ant-design/icons';
import './ListServices.scss';

const { confirm } = ModalAntd;

export default function ListServices(props) {
	const { servicesActive, setReloadServices } = props;
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalContent, steModalContent] = useState(null);
	const { globalVar } = useAuth();
	const { globalUser } = globalVar;
	const { user } = globalUser;

	return (
		<div className='list-services'>
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
		setModalTitle(`Download Documents ${service.name}`);
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
	const { service, editService, setReloadServices } = props;
	const token = getAccessTokenApi();
	const dateContract = getDateService(service.updatedAt);

	const acceptService = (token, service) => {
		service.status = 'Aceptado';
		updateStatusServiceApi(token, service)
			.then((response) => {
				notification['success']({
					message: response.message,
				});
			})
			.catch((err) => {
				notification['error']({
					message: err,
				});
			});
		setReloadServices(true);
	};

	const finishService = (service) => {
		confirm({
			title: 'Finish Service',
			content: `Are you sure to terminate the ${service.name} service? Once the service is terminated, it cannot be activated again!`,
			okText: 'Finish',
			okType: 'danger',
			cancelText: 'Cancel',
			onOk() {
				service.status = 'Terminado';
				getDocumentsByUserApi(token, { user: service.userId, service: service.serviceId }).then((result) => {
					for (let i = 0; i <= result.length; i++) {
						deleteDocumentsByIdApi(token, result[i]).then((result) => {
							updateStatusServiceApi(token, service)
								.then((response) => {
									deleteService(token, service._id).then((response) => {
										notification['success']({
											message: 'Finished Service',
										});
										setReloadServices(true);
									});
								})
								.catch((err) => {
									notification['error']({
										message: err,
									});
								});
						});
					}
				});
			},
		});
	};

	return (
		<Fragment>
			{service.status === 'Pendiente' ? (
				<List.Item
					actions={[
						<Button type='primary' onClick={() => acceptService(token, service)}>
							<CheckCircleOutlined />
						</Button>,
					]}
				>
					<List.Item.Meta
						title={`
						${service.name} - $${service.price} - Hiring date: ${dateContract} - Client: ${service.nameUser} - Status: ${service.status}
					`}
						description={service.description}
					/>
				</List.Item>
			) : service.status === 'Aceptado' ? (
				<List.Item
					actions={[
						<Button type='primary' onClick={() => editService(service)}>
							<CloudDownloadOutlined />
						</Button>,
						<Button type='danger' onClick={() => finishService(service)}>
							<MinusCircleOutlined />
						</Button>,
					]}
				>
					<List.Item.Meta
						title={`
						${service.name} - $${service.price} - Hiring date: ${dateContract} - Client: ${service.nameUser} - Status: ${service.status}		
					`}
						description={service.description}
					/>
				</List.Item>
			) : service.status === 'Terminado' ? (
				<List.Item
					actions={[
						<Button disabled>
							<CheckOutlined />
						</Button>,
					]}
				>
					<List.Item.Meta
						title={`
						${service.name} - $${service.price} - Hiring date: ${dateContract} - Client: ${service.nameUser} - Status: ${service.status}		
					`}
						description={service.description}
					/>
				</List.Item>
			) : (
				<List.Item
					actions={[
						<Button disabled>
							<WarningOutlined />
						</Button>,
					]}
				>
					<List.Item.Meta
						title={`
						${service.name} - $${service.price} - Hiring date: ${dateContract} - Client: ${service.nameUser} - Status: ${service.status}		
					`}
						description={service.description}
					/>
				</List.Item>
			)}
		</Fragment>
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
