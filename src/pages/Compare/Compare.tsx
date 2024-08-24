import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import styles from './Compare.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Image from '../../components/Image';
import images from '../../assets/images';
import { CloseIcon } from '../../components/Icons';
import config from '../../config';

const cx = classNames.bind(styles);

// fake compare list
const compareList: any[] = [1, 2, 3, 4];

const Compare = () => {
    return (
        <div className={cx('compare', { 'container-spacing': true })}>
            <Breadcrumb
                title="Compare"
                links={['home', 'compare']}
            ></Breadcrumb>
            <div
                className={cx('compare__list', {
                    'd-none': compareList.length === 0,
                })}
            >
                <table className={cx('compare__table')}>
                    <tbody className={cx('compare__body')}>
                        <tr className={cx('', { 'd-sm-none': true })}>
                            <th className={cx('compare__title')}> Product </th>
                            <th>Availability</th>
                            <th>Type</th>
                            <th>Sku</th>
                            <th>Add to Cart</th>
                        </tr>
                        {compareList.map((compareItem, index) => (
                            <tr>
                                <td
                                    key={index}
                                    className={cx('product__thumbnail')}
                                >
                                    <Link
                                        to={'#!'}
                                        className={cx(
                                            'product__thumbnail-wrapper'
                                        )}
                                    >
                                        <Image
                                            src={images.cartItem}
                                            alt="Product image"
                                            className={cx('product__img')}
                                        ></Image>
                                    </Link>
                                    <p className={cx('product__caption')}>
                                        Sennheiser
                                    </p>
                                    <Link
                                        to={'#!'}
                                        className={cx('product__name', {
                                            'primary-hover': true,
                                        })}
                                    >
                                        Analog Wrist Watch
                                    </Link>
                                    <p className={cx('product__price')}>
                                        $17.87
                                    </p>
                                    <Button
                                        className={cx('product__close-btn', {
                                            'primary-hover': true,
                                        })}
                                    >
                                        <CloseIcon
                                            width="1.3rem"
                                            height="1.3rem"
                                        ></CloseIcon>
                                    </Button>
                                </td>
                                <td className={cx('product__availability')}>
                                    In stock
                                </td>
                                <td className={cx('product__type')}>
                                    SmartWatch
                                </td>
                                <td className={cx('product__sku')}>Nil</td>
                                <td className={cx('product__cart')}>
                                    <Button
                                        to="#!"
                                        rounded
                                        primary
                                        className={cx('product__cart-btn')}
                                    >
                                        Select Options
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Compare empty */}
            <div
                className={cx('compare-empty', {
                    'd-none': compareList.length > 0,
                })}
            >
                <h2 className={cx('compare-empty__title')}>
                    Nothing found to compare!
                </h2>
                <Button
                    rounded
                    to={config.routes.shop}
                    className={cx('compare-empty__continue-btn')}
                >
                    Continue shopping
                </Button>
            </div>
        </div>
    );
};

export default Compare;
