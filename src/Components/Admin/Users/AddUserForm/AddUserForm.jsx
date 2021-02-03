import React, { useState } from 'react';
import { Form, Input, Select, Button, Checkbox, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { signUpAdminApi } from '../../../../API/user';
import { getAccessTokenApi } from '../../../../API/auth';
import { emailValidation, minLengthValidation } from '../../../../Utils/formValidation';

import './AddUserForm.scss';

const AddUserForm = (props) => {
	const { Option } = Select;
	const { setIsVisibleModal, setReloadUsers } = props;
	const [userRole, setUserRole] = useState({});
	const [inputs, setInputs] = useState({
		name: '',
		lastname: '',
		email: '',
		role: '',
		password: '',
		repeatPassword: '',
		privacyPolicy: false,
	});

	const [formValid, setFomrValid] = useState({
		name: false,
		lastname: false,
		email: false,
		role: false,
		password: false,
		repeatPassword: false,
		privacyPolicy: false,
	});

	const changeForm = (e) => {
		if (e.target.name === 'privacyPolicy') {
			setInputs({
				...inputs,
				[e.target.name]: e.target.checked,
			});
		} else {
			setInputs({
				...inputs,
				[e.target.name]: e.target.value,
			});
		}
	};

	const inputValidation = (e) => {
		const { type, name } = e.target;

		if (type === 'email') {
			setFomrValid({
				...formValid,
				[name]: emailValidation(e.target),
			});
		}

		if (type === 'password') {
			setFomrValid({
				...formValid,
				[name]: minLengthValidation(e.target, 6),
			});
		}

		if (type === 'checkbox') {
			setFomrValid({
				...formValid,
				[name]: e.target.checked,
			});
		}
	};

	const register = async (e) => {
		inputs.role = userRole.role;
		const name = inputs.name;
		const lastname = inputs.lastname;
		const emailVal = inputs.email;
		const passwordVal = inputs.password;
		const repeatPasswordVal = inputs.repeatPassword;
		const privacyPolicyVal = inputs.privacyPolicy;
		const roleVal = inputs.role;
		if (!name || !lastname || !emailVal || !roleVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
			notification['error']({
				message: 'All fields are required',
			});
		} else {
			if (passwordVal !== repeatPasswordVal) {
				notification['error']({
					message: 'The password is not the same',
				});
			} else {
				const accesToken = getAccessTokenApi();

				signUpAdminApi(accesToken, inputs)
					.then((response) => {
						notification['success']({
							message: response,
						});
						setIsVisibleModal(false);
						setReloadUsers(true);
						setInputs({});
					})
					.catch((err) => {
						notification['error']({
							message: err.message,
						});
					});
				resetForm();
			}
		}
	};

	const resetForm = () => {
		const input = document.getElementsByTagName('input');
		for (let i = 0; i < input.length; i++) {
			input[i].classList.remove('success');
			input[i].classList.remove('error');
		}
		setInputs({
			name: '',
			lastname: '',
			email: '',
			role: '',
			password: '',
			repeatPassword: '',
			privacyPolicy: false,
		});
		setFomrValid({
			name: false,
			lastname: false,
			role: false,
			email: false,
			password: false,
			repeatPassword: false,
			privacyPolicy: false,
		});
	};

	return (
		<Form className='add-user-form' onFinish={register} onChange={changeForm}>
			<Form.Item>
				<Input
					type='name'
					name='name'
					placeholder='Name'
					className='register-form__input'
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					onChange={inputValidation}
					value={inputs.name}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					type='lastname'
					name='lastname'
					placeholder='Lastname'
					className='register-form__input'
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					onChange={inputValidation}
					value={inputs.lastname}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					type='email'
					name='email'
					placeholder='Email'
					className='register-form__input'
					prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					onChange={inputValidation}
					value={inputs.email}
				/>
			</Form.Item>
			<Form.Item>
				<Select
					className='register-form__input'
					placeholder='Select a role'
					onChange={(e) => setUserRole({ ...userRole, role: e })}
					value={userRole.role}
				>
					<Option value='admin'>Administrator</Option>
					<Option value='user'>User</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Input
					type='password'
					name='password'
					placeholder='Password'
					className='register-form__input'
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					onChange={inputValidation}
					value={inputs.password}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					type='password'
					name='repeatPassword'
					placeholder='Repeat Password'
					className='register-form__input'
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} className='icon-input' />}
					onChange={inputValidation}
					value={inputs.repeatPassword}
				/>
			</Form.Item>
			<Form.Item>
				<Checkbox name='privacyPolicy' onChange={inputValidation} checked={inputs.privacyPolicy}>
					I have read and accept the privacy policy.
				</Checkbox>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' className='register-form__button'>
					Create Account
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddUserForm;
