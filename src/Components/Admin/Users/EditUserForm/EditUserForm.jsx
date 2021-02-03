import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import NoAvatar from '../../../../Assets/Img/Admin/no-avatar.png';
import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../API/user';
import { getAccessTokenApi } from '../../../../API/auth';
import { logout } from '../../../../API/auth';

import './EditUserForm.scss';

const EditUserForm = (props) => {
	const { user, setIsVisibleModal, setReloadUsers } = props;
	const [avatar, setAvatar] = useState(null);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		setUserData({
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			role: user.role,
			avatar: user.avatar,
		});
	}, [user]);

	useEffect(() => {
		if (user.avatar) {
			getAvatarApi(user.avatar).then((response) => {
				setAvatar(response);
			});
		} else {
			setAvatar(null);
		}
	}, [user]);

	useEffect(() => {
		if (avatar) {
			setUserData({ ...userData, avatar: avatar.file });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [avatar]);

	const logoutUser = () => {
		logout();
		window.location.reload();
	};

	const updateUser = (e) => {
		const token = getAccessTokenApi();
		let userUpdate = userData;

		if (userUpdate.password || userUpdate.repeatPassword) {
			if (userUpdate.password !== userUpdate.repeatPassword) {
				notification['error']({
					message: 'Passwords must be the same',
				});
				return;
			} else {
				delete userUpdate.repeatPassword;
			}
		}

		if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
			notification['error']({
				message: 'The name, surname and email fields are required',
			});
			return;
		}

		if (typeof userUpdate.avatar === 'object') {
			uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
				userUpdate.avatar = response.avatarName;
				updateUserApi(token, userUpdate, user._id).then((result) => {
					notification['success']({
						message: result.message,
					});
					setIsVisibleModal(false);
					setReloadUsers(true);
				});
			});
		} else {
			updateUserApi(token, userUpdate, user._id).then((result) => {
				if (result.logout) {
					notification['success']({
						message: result.message,
					});
					setIsVisibleModal(false);
					setReloadUsers(true);
					logoutUser();
				} else {
					if (result.alert) {
						notification['warning']({
							message: result.message,
						});
						setIsVisibleModal(false);
						setReloadUsers(true);
					} else {
						notification['success']({
							message: result.message,
						});
						setIsVisibleModal(false);
						setReloadUsers(true);
					}
				}
			});
		}
	};

	return (
		<div className='edit-user-form'>
			<UploadAvatar avatar={avatar} setAvatar={setAvatar} />
			<EditForm
				// user={user}
				userData={userData}
				setUserData={setUserData}
				updateUser={updateUser}
			/>
		</div>
	);
};

export default EditUserForm;

function UploadAvatar(props) {
	const { avatar, setAvatar } = props;
	const [avatarUrl, setAvatarUrl] = useState(null);

	useEffect(() => {
		if (avatar) {
			if (avatar.preview) {
				setAvatarUrl(avatar.preview);
			} else {
				setAvatarUrl(avatar);
			}
		} else {
			setAvatarUrl(null);
		}
	}, [avatar]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			setAvatar({ file, preview: URL.createObjectURL(file) });
		},
		[setAvatar]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		onDrop,
	});

	return (
		<div className='uploadAvatar' {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Avatar size={150} src={NoAvatar} />
			) : (
				<Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
			)}
		</div>
	);
}

function EditForm(props) {
	const { userData, setUserData, updateUser } = props;
	const { Option } = Select;

	return (
		<Form className='form-edit-user' onFinish={updateUser}>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined className='icon-input' />}
							placeholder='Name'
							value={userData.name}
							onChange={(e) => setUserData({ ...userData, name: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined className='icon-input' />}
							placeholder='Lastname'
							value={userData.lastname}
							onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<MailOutlined className='icon-input' />}
							placeholder='Email'
							value={userData.email}
							onChange={(e) => setUserData({ ...userData, email: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Select
							placeholder='Select a role'
							onChange={(e) => setUserData({ ...userData, role: e })}
							value={userData.role}
						>
							<Option value='admin'>Administrator</Option>
							<Option value='user'>User</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<LockOutlined className='icon-input' />}
							type='password'
							placeholder='Password'
							onChange={(e) => setUserData({ ...userData, password: e.target.value })}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<LockOutlined className='icon-input' />}
							type='password'
							placeholder='Repeat Password'
							onChange={(e) =>
								setUserData({
									...userData,
									repeatPassword: e.target.value,
								})
							}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type='primary' htmlType='submit' className='btn-submit'>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
}
