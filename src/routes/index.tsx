import About from '../pages/About';
import Home from '../pages/Home';
import Shop from '../pages/Shop';

const publicRoutes: Array<any> = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/shop',
        component: Shop,
    },
    {
        path: '/about',
        component: About,
    },
];
const privateRoutes: Array<any> = [];

export { publicRoutes, privateRoutes };
