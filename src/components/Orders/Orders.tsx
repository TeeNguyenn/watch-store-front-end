import React, { useState } from 'react';
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

const cx = classNames.bind(styles);

// fake orderList
// const orderList = [1];
const orderList = [1, 2, 3, 4, 5, 6];

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAll, setViewAll] = useState(false);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };
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
                        {orderList.map((orderItem, index) => (
                            <tr key={index}>
                                <td className={cx('order__number')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('order__link')}
                                    >
                                        #2453
                                    </Link>
                                </td>
                                <td className={cx('order__status')}>
                                    <Label unfulfilled title="Shipped"></Label>
                                </td>
                                <td className={cx('order__delivery')}>
                                    Cash on delivery
                                </td>
                                <td className={cx('order__date')}>
                                    Dec 12, 12:56 PM
                                </td>
                                <td className={cx('order__total')}>$87</td>
                                <td className={cx('order__options')}>
                                    <div className={cx('order__dropdown')}>
                                        <Tippy
                                            // visible={showDropdownProfile}
                                            interactive
                                            delay={[0, 300]}
                                            offset={[0, 0]}
                                            placement="bottom-end"
                                            trigger="click"
                                            // onClickOutside={() => setShowDropdownProfile(false)}
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'order__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to="#!"
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
                        {/* Order list hide */}
                        {orderList.map((orderItem, index) => (
                            <tr
                                key={index}
                                className={cx('order__item-hide', {
                                    show: viewAll,
                                })}
                            >
                                <td className={cx('order__number')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('order__link')}
                                    >
                                        #2455
                                    </Link>
                                </td>
                                <td className={cx('order__status')}>
                                    <Label unfulfilled title="Shipped"></Label>
                                </td>
                                <td className={cx('order__delivery')}>
                                    Cash on delivery
                                </td>
                                <td className={cx('order__date')}>
                                    Dec 12, 12:56 PM
                                </td>
                                <td className={cx('order__total')}>$87</td>
                                <td className={cx('order__options')}>
                                    <div className={cx('order__dropdown')}>
                                        <Tippy
                                            // visible={showDropdownProfile}
                                            interactive
                                            delay={[0, 300]}
                                            offset={[0, 0]}
                                            placement="bottom-end"
                                            trigger="click"
                                            // onClickOutside={() => setShowDropdownProfile(false)}
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'order__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to="#!"
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
