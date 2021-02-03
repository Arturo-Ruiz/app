import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, MenuOutlined, BarChartOutlined, FolderOpenOutlined } from '@ant-design/icons';
import useAuth from '../../../Hooks/useAuth';
import './MenuSider.scss';

const MenuSider = (props) => {
	const { menuCollapsed, location } = props;
	const { globalVar } = useAuth();
	const { globalUser, language } = globalVar;
	const { user } = globalUser;
	const { Sider } = Layout;

	return (
		<Sider className='admin-sider' collapsed={menuCollapsed}>
			{user.role === 'admin' ? (
				<Menu theme='dark' mode='inline' defaultOpenKeys={[location.pathname]}>
					<Menu.Item key='/admin/works'>
						<Link to={'/admin/works'}>
							<FolderOpenOutlined />
							<span className='nav-text'>{language ? 'Works' : 'Trabajos'}</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='/admin/users'>
						<Link to={'/admin/users'}>
							<UserOutlined />
							<span className='nav-text'>{language ? 'Users' : 'Usuarios'}</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='/admin/services'>
						<Link to={'/admin/services'}>
							<BarChartOutlined />
							<span className='nav-text'>{language ? 'Serices' : 'Servicios'}</span>
						</Link>
					</Menu.Item>
				</Menu>
			) : (
				<Menu theme='dark' mode='inline' defaultOpenKeys={[location.pathname]}>
					<Menu.Item key='/user'>
						<Link to={'/user/services'}>
							<MenuOutlined />
							<span className='nav-text'>{language ? 'Services' : 'Servicios'}</span>
						</Link>
					</Menu.Item>
				</Menu>
			)}
		</Sider>
	);
};

export default withRouter(MenuSider);
