//Layout
import LayoutAdmin from '../Layout/LayoutAdmin.jsx';
import LayoutUser from '../Layout/LayoutUser';
import LayoutBasic from '../Layout/LayoutBasic.jsx';

//Admin Pages
import AdminSigIn from '../Pages/Admin/SignIn/SigIn';
import AdminUsers from '../Pages/Admin/Users';
import AdminServices from '../Pages/Admin/Services';
import AdminWorks from '../Pages/Admin/Works';

//User Panel Pages
import UserServices from '../Pages/User/Services';

//Pages
import Home from '../Pages/Home';
import Error404 from '../Pages/Error404';
import Residences from '../Pages/Residences';
import Citizenship from '../Pages/Citizenship';

const routes = [
	{
		path: '/admin',
		component: LayoutAdmin,
		exact: false,
		routes: [
			{
				path: '/admin/works',
				component: AdminWorks,
				exact: true,
			},
			{
				path: '/admin/users',
				component: AdminUsers,
				exact: true,
			},
			{
				path: '/admin/services',
				component: AdminServices,
				exact: true,
			},
			{
				path: '/admin/login',
				component: AdminSigIn,
				exact: true,
			},
			{
				component: Error404,
			},
		],
	},
	{
		path: '/user',
		component: LayoutUser,
		exact: false,
		routes: [
			{
				path: '/user/services',
				component: UserServices,
				exact: true,
			},
			{
				component: Error404,
			},
		],
	},
	{
		path: '/',
		component: LayoutBasic,
		exact: false,
		routes: [
			{
				path: '/',
				component: Home,
				exact: true,
			},
			{
				path: '/residences',
				component: Residences,
				exact: true,
			},
			{
				path: '/citizenship',
				component: Citizenship,
				exact: true,
			},
			{
				component: Error404,
			},
		],
	},
];

export default routes;
