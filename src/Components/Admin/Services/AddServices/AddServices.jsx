import { useState } from 'react';
import { Form, Input, Button, notification, Row, Col } from 'antd';
import { FontColorsOutlined, DollarOutlined } from '@ant-design/icons';
import { createServiceApi } from '../../../../API/serv';
import { getAccessTokenApi } from '../../../../API/auth';
import './AddServices.scss';

export default function AddServices(props) {
	const defaultState = '';
	const { TextArea } = Input;
	const { setIsVisibleModal, setReloadServices } = props;
	const [rows, setRows] = useState([defaultState]);
	const [inputs, setInputs] = useState({
		name: '',
		description: '',
		requirements: [],
		price: '',
	});

	const changeForm = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const register = async (e) => {
		const name = inputs.name;
		if (!name) {
			notification['error']({
				message: 'El campo nombre es requerido',
			});
		} else {
			const token = getAccessTokenApi();
			inputs.requirements = convertRequirements(rows);
			createServiceApi(token, inputs)
				.then((response) => {
					notification['success']({
						message: response,
					});
					setIsVisibleModal(false);
					setReloadServices(true);
					setInputs({});
				})
				.catch((err) => {
					notification['error']({
						message: err.message,
					});
				});
			resetForm();
		}
	};

	const resetForm = () => {
		setInputs({
			name: '',
			description: '',
			requirements: [],
			price: '',
		});
		setRows([defaultState]);
	};

	const handleOnChange = (index, requirement, value) => {
		const copyRows = [...rows];
		copyRows[index] = {
			...copyRows[index],
			[requirement]: value,
		};
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
		<Form className='add-service-form' onFinish={register} onChange={changeForm}>
			<Form.Item>
				<Input
					type='text'
					name='name'
					placeholder='Name'
					className='register-form__input'
					prefix={<FontColorsOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					value={inputs.name}
				/>
			</Form.Item>
			<Form.Item>
				<TextArea
					rows={4}
					type='text'
					name='description'
					placeholder='Description'
					className='register-form__input'
					value={inputs.description}
				/>
			</Form.Item>
			<Form.Item>
				<Row className='add-service-form__req'>
					{rows.map((row, index) => (
						<RowContent
							{...row}
							onChange={(requirement, value) => handleOnChange(index, requirement, value)}
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
					type='text'
					name='price'
					placeholder='Price'
					className='register-form__input'
					prefix={<DollarOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					value={inputs.price}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' className='register-form__button'>
					Create service
				</Button>
			</Form.Item>
		</Form>
	);
}

function RowContent({ onChange, onRemove, requirement }) {
	return (
		<>
			<Col span={19}>
				<Input
					value={requirement}
					onChange={(e) => onChange('requirement', e.target.value)}
					placeholder='Requirement'
				/>
			</Col>
			<Col span={4}>
				<Button onClick={onRemove}>Remove</Button>
			</Col>
		</>
	);
}

function convertRequirements(rows) {
	const req = rows.map(function (row) {
		return row.requirement;
	});
	return req;
}
