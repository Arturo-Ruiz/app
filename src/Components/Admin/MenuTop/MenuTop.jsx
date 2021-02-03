import React from 'react';
import { Button } from 'antd';
import { logout } from '../../../API/auth';
import Logo from '../../../Assets/Img/Admin/TLPV-LOGO.png';
import useAuth from '../../../Hooks/useAuth';
import { MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './MenuTop.scss';

const MenuTop = (props) => {
	const { menuCollapsed, setMenuCollapsed } = props;
	const { globalVar } = useAuth();
	const { globalUser, language } = globalVar;
	const { user } = globalUser;
	const logoutUser = () => {
		logout();
		window.location.reload();
	};

	return (
		<div className='menu-top'>
			<div className='menu-top__left'>
				<img src={Logo} alt='TLPV SERVICES' className='menu-top__left-logo' />
				<Button type='link' onClick={() => setMenuCollapsed(!menuCollapsed)}>
					{menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</div>
			<div className='menu-top__right'>
				<label style={{ color: '#fff' }} htmlFor=''>
					{language ? 'Welcome' : 'Bienvenido'} {user.name} {user.lastname}
				</label>
				<Button type='link' onClick={logoutUser}>
					<PoweroffOutlined />
				</Button>
			</div>
		</div>
	);
};

export default MenuTop;
