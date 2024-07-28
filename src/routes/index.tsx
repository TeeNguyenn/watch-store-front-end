import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Faq from '../pages/Faq';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import config from '../config';

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
];
const privateRoutes: Array<any> = [];

export { publicRoutes, privateRoutes };
