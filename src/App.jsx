import { useEffect } from 'react';
import routes from './Config/Routes';
import AuthProvider from './Providers/AuthProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AOS from 'aos';
import './App.scss';

function App() {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
	}, []);
	return (
		<AuthProvider>
			<Router>
				<Switch>
					{routes.map((route, index) => (
						<RouteWithSubRoutes key={index} {...route} />
					))}
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;

function RouteWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => <route.component routes={route.routes} {...props} />}
		/>
	);
}
