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
import Checkout from '../pages/Checkout';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import OrderSuccess from '../pages/OrderSuccess';
import Compare from '../pages/Compare';
import PageNotFound from '../pages/PageNotFound';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import OrderDetails from '../pages/OrderDetails';

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
    {
        path: config.routes.checkout,
        component: Checkout,
        layout: null,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.wishlist,
        component: Wishlist,
    },
    {
        path: config.routes.orderSuccessful,
        component: OrderSuccess,
    },
    {
        path: config.routes.compare,
        component: Compare,
    },
    {
        path: config.routes.pageNotFound,
        component: PageNotFound,
    },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.orderDetails,
        component: OrderDetails,
    },
];
const privateRoutes: Array<any> = [];

export { publicRoutes, privateRoutes };
