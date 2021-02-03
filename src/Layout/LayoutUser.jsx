import { Layout } from 'antd';
import useAuth from '../Hooks/useAuth';
import { useState, Fragment } from 'react';
import FooterWeb from '../Components/Web/Footer';
import HeaderWeb from '../Components/Web/HeaderEs';
import AdminSignIn from '../Pages/Admin/SignIn/SigIn';
import MenuTop from '../Components/Admin/MenuTop/MenuTop';
import { Route, Switch, Redirect } from 'react-router-dom';
import MenuSider from '../Components/Admin/MenuSider/MenuSider';

import './LayoutUser.scss';

export default function LayoutUser(props) {
	const { routes } = props;
	const [menuCollapsed, setMenuCollapsed] = useState(false);
	const { Header, Content, Footer } = Layout;
	const { globalVar } = useAuth();
	const { globalUser, language } = globalVar;
	const { user, isLoading } = globalUser;

	if (user) {
		if (user.role !== 'user') {
			return <Redirect to='/admin/works' />;
		}
	}

	if (!user && !isLoading) {
		return (
			<Fragment>
				<HeaderWeb />
				<Route path='/admin/login' component={AdminSignIn} />
				<Redirect to='/admin/login' />
				<FooterWeb />
			</Fragment>
		);
	}

	if (user && !isLoading) {
		return (
			<Layout>
				<MenuSider menuCollapsed={menuCollapsed} />
				<Layout className='layout-user' style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}>
					<Header className='layout-user__header '>
						<MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
					</Header>
					<Content className='layout-user__content'>
						<LoadRoutes routes={routes} />
					</Content>
					<Footer className='layout-user__footer'>
						<div className='copyright'>
							&copy; 2020 Copyright{' '}
							<strong>
								<span>TLPV Services</span>
							</strong>
							{language ? '. All rights reserved' : '. Todos los derechos reservados'}
						</div>
						<div className='credits'>
							Power by{' '}
							<a target='_blank' rel='noreferrer' href='https://muvawd.com.mx/' className='muva'>
								MUVA WEB DESIGN
							</a>
						</div>
					</Footer>
				</Layout>
			</Layout>
		);
	}
	return null;
}

function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
