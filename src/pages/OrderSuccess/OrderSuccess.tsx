import React from 'react';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
import { OrderSuccessIcon } from '../../components/Icons';
import Image from '../../components/Image';
import images from '../../assets/images';
import Button from '../../components/Button';
import config from '../../config';
const cx = classNames.bind(styles);

const OrderSuccess = () => {
    return (
        <div className={cx('', { 'container-spacing': true })}>
            <div className={cx('order')}>
                <div className={cx('order__inner')}>
                    <div className={cx('order__top')}>
                        <OrderSuccessIcon></OrderSuccessIcon>
                        <h1 className={cx('order__title')}>Order Successful</h1>
                    </div>
                    <div className={cx('order__body')}>
                        <p className={cx('order__text')}>
                            Your order has been successfully processed. Please
                            check your email for more details.
                        </p>
                        <div className={cx('order__info')}>
                            <h3 className={cx('order__info-title')}>
                                Order Details
                            </h3>
                            <div className={cx('order__buyer-info')}>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Order ID:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        DH3995
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Date:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        August 20, 2024
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Consignee:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        Tee
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Mobile phone number:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        0334897632
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Email:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        Tee@gmail.com
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Payment method:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        Cash on Delivery
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Shipping address:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        0334897632, Thị trấn Văn Điển, Huyện
                                        Thanh Trì, Hà Nội
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('order__products')}>
                            <h3 className={cx('order__product-title')}>
                                Product
                            </h3>
                            <div className={cx('order__product-list')}>
                                <div className={cx('order__product-item')}>
                                    <div className={cx('order__product-media')}>
                                        <Image
                                            src={images.productImg}
                                            className={cx('order__product-img')}
                                        ></Image>
                                        <p
                                            className={cx(
                                                'order__product-quantity'
                                            )}
                                        >
                                            1
                                        </p>
                                    </div>
                                    <div
                                        className={cx('order__product-content')}
                                    >
                                        <p
                                            className={cx(
                                                'order__product-name'
                                            )}
                                        >
                                            Digital Smartwatch
                                        </p>
                                        <p
                                            className={cx(
                                                'order__product-styles'
                                            )}
                                        >
                                            Dusty Grey / 1.5 Inches / Leather
                                        </p>
                                    </div>
                                    <div className={cx('order__product-price')}>
                                        $1000
                                    </div>
                                </div>
                                <div className={cx('order__product-item')}>
                                    <div className={cx('order__product-media')}>
                                        <Image
                                            src={images.productImg}
                                            className={cx('order__product-img')}
                                        ></Image>
                                        <p
                                            className={cx(
                                                'order__product-quantity'
                                            )}
                                        >
                                            1
                                        </p>
                                    </div>
                                    <div
                                        className={cx('order__product-content')}
                                    >
                                        <p
                                            className={cx(
                                                'order__product-name'
                                            )}
                                        >
                                            Digital Smartwatch
                                        </p>
                                        <p
                                            className={cx(
                                                'order__product-styles'
                                            )}
                                        >
                                            Dusty Grey / 1.5 Inches / Leather
                                        </p>
                                    </div>
                                    <div className={cx('order__product-price')}>
                                        $1000
                                    </div>
                                </div>
                            </div>
                            <div className={cx('order__total')}>
                                <h3 className={cx('order__total-label')}>
                                    Total
                                </h3>
                                <p className={cx('order__total-price')}>
                                    $17.86
                                </p>
                            </div>
                        </div>
                        <div className={cx('order__btn-wrapper')}>
                            <Button
                                to={config.routes.shop}
                                rounded
                                primary
                                className={cx('order__btn')}
                            >
                                Continue shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
