import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../Utils/formValidation';
import { signUpApi } from '../../../API/user';
import useAuth from '../../../Hooks/useAuth';
import './RegisterForm.scss';

const RegisterForm = () => {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	const [inputs, setInputs] = useState({
		name: '',
		lastname: '',
		email: '',
		password: '',
		repeatPassword: '',
		privacyPolicy: false,
	});

	const [formValid, setFomrValid] = useState({
		name: false,
		lastname: false,
		email: false,
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
		const name = inputs.name;
		const lastname = inputs.lastname;
		const emailVal = inputs.email;
		const passwordVal = inputs.password;
		const repeatPasswordVal = inputs.repeatPassword;
		const privacyPolicyVal = inputs.privacyPolicy;
		if (!name || !lastname || !emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
			notification['error']({
				message: 'Todos los campos son obligatorios',
			});
		} else {
			if (passwordVal !== repeatPasswordVal) {
				notification['error']({
					message: 'La contraseña no es igual',
				});
			} else {
				const result = await signUpApi(inputs);
				if (!result.ok) {
					notification['error']({
						message: result.message,
					});
				} else {
					notification['success']({
						message: result.message,
					});
					resetForm();
				}
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
			password: '',
			repeatPassword: '',
			privacyPolicy: false,
		});
		setFomrValid({
			name: false,
			lastname: false,
			email: false,
			password: false,
			repeatPassword: false,
			privacyPolicy: false,
		});
	};

	return (
		<Form className='register-form' onFinish={register} onChange={changeForm}>
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
					{language
						? 'I have read and accept the privacy policy.'
						: 'He leído y acepto la política de privacidad.'}
				</Checkbox>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' className='register-form__button'>
					{language ? 'Create Account' : 'Crear cuenta'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegisterForm;
