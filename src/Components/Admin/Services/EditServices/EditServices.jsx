import { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Row, Col } from 'antd';
import { FontColorsOutlined, DollarOutlined } from '@ant-design/icons';
import { updateServiceApi } from '../../../../API/serv';
import { getAccessTokenApi } from '../../../../API/auth';
import './EditServices.scss';

export default function EditServices(props) {
	const { service, setIsVisibleModal, setReloadServices } = props;
	const defaultState = '';
	const [rows, setRows] = useState([defaultState]);
	const [serviceData, setServiceData] = useState({});
	const { TextArea } = Input;

	useEffect(() => {
		setServiceData({
			name: service.name,
			description: service.description,
			requirements: service.requirements,
			price: service.price,
		});
		setRows(service.requirements);
	}, [service]);

	const updateService = (e) => {
		const token = getAccessTokenApi();
		if (!serviceData.name) {
			notification['error']({
				message: 'El nombre es obligatorio',
			});
			return;
		}
		serviceData.requirements = rows;

		updateServiceApi(token, serviceData, service._id).then((result) => {
			if (result.logout) {
				notification['success']({
					message: result.message,
				});
				setIsVisibleModal(false);
				setReloadServices(true);
			} else {
				notification['success']({
					message: result.message,
				});
				setIsVisibleModal(false);
				setReloadServices(true);
			}
		});
	};

	const handleOnChange = (index, value) => {
		const copyRows = [...rows];
		copyRows[index] = value;
		setRows(copyRows);
	};

	const handleOnAdd = () => {
		setRows(rows.concat(defaultState));
	};

	const handleOnRemove = (index) => {
		const copyRows = [...rows];
		copyRows.splice(index, 1);
		setRows(copyRows);
	};

	return (
		<Form className='form-edit-services' onFinish={updateService}>
			<Form.Item>
				<Input
					placeholder='Name'
					className='register-form__input'
					prefix={<FontColorsOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					value={serviceData.name}
					onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
				/>
			</Form.Item>
			<Form.Item>
				<TextArea
					rows={4}
					placeholder='Description'
					className='register-form__input'
					value={serviceData.description}
					onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
				/>
			</Form.Item>
			<Form.Item>
				<Row className='add-service-form__req'>
					{rows.map((row, index) => (
						<RowContent
							row={row}
							onChange={(value) => handleOnChange(index, value)}
							onRemove={() => handleOnRemove(index)}
							key={index}
						/>
					))}
				</Row>
				<Button onClick={handleOnAdd} className='add-service-form__btn'>
					Add
				</Button>
			</Form.Item>
			<Form.Item>
				<Input
					placeholder='Price'
					className='register-form__input'
					prefix={<DollarOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					value={serviceData.price}
					onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' className='register-form__button'>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
}

function RowContent({ row, onChange, onRemove }) {
	return (
		<>
			<Col span={19}>
				<Input value={row} onChange={(e) => onChange(e.target.value)} placeholder='Requirement' />
			</Col>
			<Col span={4}>
				<Button onClick={onRemove}>Remove</Button>
			</Col>
		</>
	);
}
