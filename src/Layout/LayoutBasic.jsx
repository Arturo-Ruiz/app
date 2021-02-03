import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../Components/Web/Footer';
import HeaderEs from '../Components/Web/HeaderEs';
import HeaderUs from '../Components/Web/HeaderUs';
import Language from '../Components/Web/Language';
import useAuth from '../Hooks/useAuth';
import './LayoutBasic.scss';

const LayoutBasic = (props) => {
	const { globalVar } = useAuth();
	const { language } = globalVar;
	const { routes } = props;

	return (
		<div className='layout-basic'>
			<Language />
			{language ? <HeaderUs /> : <HeaderEs />}
			<LoadRoutes routes={routes} />
			<Footer />
		</div>
	);
};

export default LayoutBasic;

function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
