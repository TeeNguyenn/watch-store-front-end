import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Orders.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CheckNoCircleIcon, RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import * as orderServices from '../../services/orderServices';
import { formatPrice, getCurrentDateWithHour } from '../../utils/Functions';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAll, setViewAll] = useState(false);
    const currentUser = localStorage.getItem('user_id');
    const [orderList, setOrderList] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            const fetchApi = async () => {
                const res = await orderServices.getAllOrderByUserId();

                setOrderList(res);
                setLoading(false);
            };

            fetchApi();
        }
    }, [currentUser]);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('order')}>
            <div className={cx('order__container')}>
                <table className={cx('order__table')}>
                    <thead>
                        <tr>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '140px' }}
                            >
                                order
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '180px' }}
                            >
                                status
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '20%', minWidth: '180px' }}
                            >
                                delivery method
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '160px' }}
                            >
                                date{' '}
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '160px' }}
                            >
                                total
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((orderItem: any, index: number) => (
                            <tr key={index}>
                                <td className={cx('order__number')}>
                                    <Link
                                        to={`/customer/order-details/${orderItem.id}`}
                                        className={cx('order__link')}
                                    >
                                        {`#OID${orderItem.id}`}
                                    </Link>
                                </td>
                                <td className={cx('order__status')}>
                                    <Label
                                        processing={
                                            orderItem.status === 'PENDING'
                                        }
                                        title={orderItem.status}
                                    ></Label>
                                </td>
                                <td className={cx('order__delivery')}>
                                    {orderItem.payment_method_name}
                                </td>
                                <td className={cx('order__date')}>
                                    {getCurrentDateWithHour(
                                        orderItem.order_date
                                    )}
                                </td>
                                <td className={cx('order__total')}>
                                    {formatPrice(
                                        orderItem.sub_total +
                                            orderItem.shipping_cost / 1000
                                    )}
                                </td>
                                <td className={cx('order__options')}>
                                    <div className={cx('order__dropdown')}>
                                        <Tippy
                                            interactive
                                            delay={[0, 300]}
                                            offset={[0, 0]}
                                            placement="bottom-end"
                                            trigger="click"
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'order__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to={`/customer/order-details/${orderItem.id}`}
                                                        className={cx(
                                                            'order__act-btn'
                                                        )}
                                                    >
                                                        view
                                                    </Button>
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'order__act-btn'
                                                        )}
                                                    >
                                                        export
                                                    </Button>
                                                    <hr />
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'order__act-btn'
                                                        )}
                                                    >
                                                        remove
                                                    </Button>
                                                </div>
                                            )}
                                        >
                                            <Button
                                                className={cx('order__btn')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </Button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('order__bottom')}>
                <div className={cx('order__view')}>
                    <p
                        className={cx('order__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        1 to 6 items of 9
                    </p>
                    {/* <Button
                        className={cx('order__view-btn')}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={() => setViewAll(!viewAll)}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button> */}
                </div>
                <div className={cx('order__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={5}
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Orders;
