import React from 'react';
import classNames from 'classnames/bind';
import styles from './Wishlist.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Product from './Product';
import Button from '../../components/Button';
import config from '../../config';

const cx = classNames.bind(styles);

const Wishlist = () => {
    const links = ['home', 'Wishlist'];

    // fake wishlist
    const wishlist: any[] = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className={cx('wishlist', { 'container-spacing': true })}>
            <Breadcrumb title="wishlist" links={links}></Breadcrumb>
            <div
                className={cx('wishlist__list', {
                    'd-none': wishlist.length === 0,
                })}
            >
                <div className={cx('wishlist__row')}>
                    <div
                        className={cx('', {
                            row: true,
                            'row-cols-5': true,
                            'row-cols-xxl-4': true,
                            'row-cols-xl-3': true,
                            'row-cols-md-2': true,
                            'row-cols-sm-1': true,
                        })}
                    >
                        {wishlist.map((item, index) => (
                            <Product></Product>
                        ))}
                    </div>
                </div>
            </div>
            {/* Empty wishlist */}
            <div
                className={cx('wishlist__empty', {
                    'd-none': wishlist.length > 0,
                })}
            >
                <h2 className={cx('wishlist__empty-title')}>
                    Nothing found in wishlist!
                </h2>
                <Button
                    to={config.routes.shop}
                    rounded
                    primary
                    className={cx('wishlist__btn')}
                >
                    Continue shopping
                </Button>
            </div>
        </div>
    );
};

export default Wishlist;
