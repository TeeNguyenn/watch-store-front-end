import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import Widget from './components/widget';
import Featured from './components/featured';
import Chart from './components/chart';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import * as orderServices from '../../services/orderServices';
import * as userServices from '../../services/userServices';
import UserModel from '../../models/UserModel';
import { isToday } from '../../utils/Functions';
import PreLoader from '../../components/PreLoader';

const cx = classNames.bind(styles);

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [totalSaleToday, setTotalSaleToday] = useState(0);

    // get all orders
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const res = await orderServices.getAllOrder(1, 1);
            setTotalOrders(res.totalPage);

            const responseData = await userServices.getAllUser();
            setTotalUsers(responseData.result.length);

            let totalEarning = 0;
            let totalSaleNow = 0;
            let count = 0;

            const fetchApi1 = async (userItem: UserModel) => {
                const res = await orderServices.getAllOrderByUserId(userItem.userId + '');

                count++
                if (res.totalOrders > 0) {
                    const resData = await orderServices.getAllOrderByUserId(userItem.userId + '', 1, res.totalOrders);

                    const totalSpent = resData.result.reduce((accumulator: any, currentItem: any) => {
                        if (isToday(currentItem.order_date)) {
                            totalSaleNow += currentItem.total_money;
                        }
                        return accumulator + currentItem.total_money;
                    }, 0);


                    totalEarning += totalSpent;
                }

                if (count === responseData.result.length) {
                    setTotalSaleToday(totalSaleNow);
                    setEarnings(totalEarning);
                    setLoading(false);
                    return;
                }

            }

            async function fetchSequentially(responseData: any) {
                for (const userItem of responseData.result) {
                    await fetchApi1(userItem);
                }
            }

            fetchSequentially(responseData);
        };

        fetchApi();
    }, []);

    if (loading) {
        return <PreLoader show />
    }

    return (
        <>
            <div className={cx('dashboard__widgets')}>
                <Widget type="customer" amount={totalUsers}></Widget>
                <Widget type="order" amount={totalOrders}></Widget>
                <Widget type="earning" amount={earnings}></Widget>
                <Widget type="balance"></Widget>
            </div>
            <div className={cx('dashboard__charts')}>
                <Featured totalSaleToday={totalSaleToday}></Featured>
                <Chart title="Last 6 Months ( Revenue )" aspect={2 / 1}></Chart>
            </div>
            <div className={cx('dashboard__bottom')}>
                <div className="container">
                    <div className="row">
                        <div className="col col-5">
                            <div className={cx('block')}>
                                <h2 className={cx('block__title')}>
                                    Top Customers
                                </h2>
                                <div className={cx('block__list')}>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div>
                                                <div
                                                    className={cx(
                                                        'block__name'
                                                    )}
                                                >
                                                    Leonel Tee
                                                </div>
                                                <div
                                                    className={cx(
                                                        'block__email'
                                                    )}
                                                >
                                                    tee0805@gmail.com
                                                </div>
                                            </div>
                                            <div
                                                className={cx('block__counter')}
                                            >
                                                5 orders
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div>
                                                <div
                                                    className={cx(
                                                        'block__name'
                                                    )}
                                                >
                                                    Tee{' '}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'block__email'
                                                    )}
                                                >
                                                    tee0805@gmail.com
                                                </div>
                                            </div>
                                            <div
                                                className={cx('block__counter')}
                                            >
                                                89 orders
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div>
                                                <div
                                                    className={cx(
                                                        'block__name'
                                                    )}
                                                >
                                                    Nguyen Duc Thiep
                                                </div>
                                                <div
                                                    className={cx(
                                                        'block__email'
                                                    )}
                                                >
                                                    jully23032003@gmail.com
                                                </div>
                                            </div>
                                            <div
                                                className={cx('block__counter')}
                                            >
                                                89 orders
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div>
                                                <div
                                                    className={cx(
                                                        'block__name'
                                                    )}
                                                >
                                                    Tee{' '}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'block__email'
                                                    )}
                                                >
                                                    tee0805@gmail.com
                                                </div>
                                            </div>
                                            <div
                                                className={cx('block__counter')}
                                            >
                                                89 orders
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div>
                                                <div
                                                    className={cx(
                                                        'block__name'
                                                    )}
                                                >
                                                    Nguyen Minh Tien
                                                </div>
                                                <div
                                                    className={cx(
                                                        'block__email'
                                                    )}
                                                >
                                                    tien10102024@gmail.com
                                                </div>
                                            </div>
                                            <div
                                                className={cx('block__counter')}
                                            >
                                                89 orders
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-7">
                            <div className={cx('block')}>
                                <h2 className={cx('block__title')}>
                                    Latest Reviews
                                </h2>
                                <div className={cx('block__list')}>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div
                                                className={cx('block__name', {
                                                    'line-clamp': true,
                                                })}
                                            >
                                                As others mentioned, the team
                                                behind this theme is super
                                                responsive.
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div
                                                className={cx('block__name', {
                                                    'line-clamp': true,
                                                })}
                                            >
                                                As others mentioned, the team
                                                behind this theme is super
                                                responsive. I sent a message
                                                during the weekend, fully
                                                expecting a response As others
                                                mentioned, the team behind this
                                                theme is super responsive. I
                                                sent a message during the
                                                weekend, fully expecting a
                                                response
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div
                                                className={cx('block__name', {
                                                    'line-clamp': true,
                                                })}
                                            >
                                                I sent a message during the
                                                weekend, fully expecting a
                                                response As others mentioned,
                                                the team behind this theme is
                                                super responsive.
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div
                                                className={cx('block__name', {
                                                    'line-clamp': true,
                                                })}
                                            >
                                                I sent a message during the
                                                weekend, fully expecting a
                                                response
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('block__item')}>
                                        <div
                                            className={cx('block__img-wrapper')}
                                        >
                                            <Image
                                                src={images.defaultAvatar}
                                                alt="avatar"
                                            ></Image>
                                        </div>
                                        <div className={cx('block__body')}>
                                            <div
                                                className={cx('block__name', {
                                                    'line-clamp': true,
                                                })}
                                            >
                                                Very good product.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
