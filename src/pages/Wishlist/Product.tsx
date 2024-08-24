import React from 'react';
import classNames from 'classnames/bind';
import styles from './Wishlist.module.scss';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import Image from '../../components/Image';
import { CloseIcon } from '../../components/Icons';

const cx = classNames.bind(styles);

const Product = () => {
    return (
        <div className={cx('product', { col: true })}>
            <Link to={'#!'} className={cx('product__media')}>
                <Image
                    src={images.cartItem}
                    className={cx('product__thumbnail')}
                    loading={'lazy'}
                ></Image>
                <div
                    className={cx('product__close-btn', {
                        'primary-hover': true,
                    })}
                >
                    <CloseIcon width="1.3rem" height="1.3rem"></CloseIcon>
                </div>
            </Link>
            <div className={cx('product__content')}>
                <p className={cx('product__caption')}>Skullcandy</p>
                <Link
                    to={'#!'}
                    className={cx('product__name', { 'primary-hover': true })}
                >
                    Digital Smartwatch
                </Link>
                <p className={cx('product__price')}>$17.86</p>
            </div>
        </div>
    );
};

export default Product;
