import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontColorsOutlined, DollarOutlined } from '@ant-design/icons';
import { createServiceApi } from '../../../../API/serv';
import { getAccessTokenApi } from '../../../../API/auth';
import './AddServices.scss';

export default function AddServices(props) {
	const { TextArea } = Input;
	const { setIsVisibleModal, setReloadServices } = props;
	const [inputs, setInputs] = useState({
		name: '',
		description: '',
		requirements: '',
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
				message: 'The name field is required',
			});
		} else {
			const token = getAccessTokenApi();

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
			requirements: '',
			price: '',
		});
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
				<TextArea
					rows={4}
					type='text'
					name='requirements'
					placeholder='Requirements'
					className='register-form__input'
					value={inputs.requirements}
				/>
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
