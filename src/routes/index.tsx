import config from '../config';

import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Faq from '../pages/Faq';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import ActiveAccount from '../pages/ActiveAccount';

const publicRoutes: Array<any> = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.shop,
        component: Shop,
    },
    {
        path: config.routes.about,
        component: About,
    },
    {
        path: config.routes.blog,
        component: Blog,
    },
    {
        path: config.routes.faq,
        component: Faq,
    },
    {
        path: config.routes.contact,
        component: Contact,
    },
    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.detail,
        component: Detail,
    },
    {
        path: config.routes.accountStatus,
        component: ActiveAccount,
    },
];
const privateRoutes: Array<any> = [];

export { publicRoutes, privateRoutes };
