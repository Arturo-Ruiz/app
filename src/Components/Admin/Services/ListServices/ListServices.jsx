import Modal from '../../../Modal';
import EditServices from '../EditServices';
import AddServices from '../AddServices';
import { useState } from 'react';
import { getAccessTokenApi } from '../../../../API/auth';
import { activateServiceApi, deleteServiceApi } from '../../../../API/serv';
import { Switch, List, Button, notification, Modal as ModalAntd } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import './ListServices.scss';

const { confirm } = ModalAntd;

export default function ListServices(props) {
	const { servicesActive, servicesInactive, setReloadServices } = props;
	const [viewServicesActive, setViewServicesActive] = useState(true);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalContent, steModalContent] = useState(null);

	const addServiceModal = () => {
		setIsVisibleModal(true);
		setModalTitle('Create Service ');
		steModalContent(<AddServices setIsVisibleModal={setIsVisibleModal} setReloadServices={setReloadServices} />);
	};

	return (
		<div className='list-services'>
			<div className='list-services__header'>
				<div className='list-services__header-switch'>
					<Switch defaultChecked onChange={() => setViewServicesActive(!viewServicesActive)} />
					<span>{viewServicesActive ? 'Active Services' : 'Inactive Services'}</span>
				</div>
				<Button type='primary' onClick={addServiceModal}>
					New Service
				</Button>
			</div>

			{viewServicesActive ? (
				<ServicesActive
					servicesActive={servicesActive}
					setIsVisibleModal={setIsVisibleModal}
					setModalTitle={setModalTitle}
					steModalContent={steModalContent}
					setReloadServices={setReloadServices}
				/>
			) : (
				<ServicesInactive servicesInactive={servicesInactive} setReloadServices={setReloadServices} />
			)}
			<Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>
		</div>
	);
}

function ServicesActive(props) {
	const { servicesActive, setIsVisibleModal, setModalTitle, steModalContent, setReloadServices } = props;

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
				<ServiceActive service={service} editService={editService} setReloadServices={setReloadServices} />
			)}
		/>
	);
}

function ServiceActive(props) {
	const { service, editService, setReloadServices } = props;

	const desactivateService = () => {
		const accesToken = getAccessTokenApi();
		activateServiceApi(accesToken, service._id, false)
			.then((response) => {
				notification['success']({
					message: response.message,
				});

				setReloadServices(true);
			})
			.catch((err) => {
				notification['error']({
					message: err,
				});
			});
	};

	const showDeleteConfirm = () => {
		const accesToken = getAccessTokenApi();

		confirm({
			title: 'Eliminar Servicio',
			content: `¿Estas seguro de eliminar a ${service.name} ?`,
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk() {
				deleteServiceApi(accesToken, service._id)
					.then((response) => {
						if (response.alert) {
							notification['warning']({
								message: response.message,
							});
						} else {
							notification['success']({
								message: response.message,
							});
						}
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

	return (
		<List.Item
			actions={[
				<Button type='primary' onClick={() => editService(service)}>
					<EditOutlined />
				</Button>,
				<Button type='danger' onClick={desactivateService}>
					<StopOutlined />
				</Button>,
				<Button type='danger' onClick={showDeleteConfirm}>
					<DeleteOutlined />
				</Button>,
			]}
		>
			<List.Item.Meta
				title={`
						${service.name ? service.name : '...'}						
					`}
				description={service.description}
			/>
		</List.Item>
	);
}

function ServicesInactive(props) {
	const { servicesInactive, setReloadServices } = props;
	return (
		<List
			className='services-active'
			itemLayout='horizontal'
			dataSource={servicesInactive}
			renderItem={(service) => <ServiceInactive service={service} setReloadServices={setReloadServices} />}
		/>
	);
}

function ServiceInactive(props) {
	const { service, setReloadServices } = props;

	const activateService = () => {
		const accesToken = getAccessTokenApi();
		activateServiceApi(accesToken, service._id, true)
			.then((response) => {
				notification['success']({
					message: response.message,
				});
				setReloadServices(true);
			})
			.catch((err) => {
				notification['error']({
					message: err,
				});
			});
	};

	const showDeleteConfirm = () => {
		const accesToken = getAccessTokenApi();

		confirm({
			title: 'Eliminar Servicio',
			content: `¿Estas seguro de eliminar a ${service.name}?`,
			okText: 'Eliminar',
			okType: 'danger',
			cancelText: 'Cancelar',
			onOk() {
				deleteServiceApi(accesToken, service._id)
					.then((response) => {
						notification['success']({
							message: response.message,
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

	return (
		<List.Item
			actions={[
				<Button type='primary' onClick={activateService}>
					<CheckOutlined />
				</Button>,
				<Button type='danger' onClick={showDeleteConfirm}>
					<DeleteOutlined />
				</Button>,
			]}
		>
			<List.Item.Meta
				title={`
							${service.name ? service.name : '...'}					
						`}
				description={service.description}
			/>
		</List.Item>
	);
}
