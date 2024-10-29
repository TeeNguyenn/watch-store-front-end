import classNames from 'classnames/bind';

import styles from './AdminOrderDetails.module.scss';
import Navbar from '../Dashboard/components/navbar';
import OrderDetails from '../OrderDetails';

const cx = classNames.bind(styles);

const AdminOrderDetails = () => {
    return (
        <>
            <OrderDetails modifier></OrderDetails>
        </>
    );
};

export default AdminOrderDetails;
