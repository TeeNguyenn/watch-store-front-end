import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../../components/Button';
import { ErrorIcon, RemoveIcon } from '../../../../components/Icons';
import styles from '../Cart.module.scss';
import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import images from '../../../../assets/images';
import Quantity from '../../../../components/Quantity';

const cx = classNames.bind(styles);

const CartItem = () => {
    return (
        <div className={cx('cart-item')}>
            <Link to={'#!'}>
                <Image
                    src={images.cartItem}
                    alt="cart-item"
                    className={cx('cart-item__img')}
                ></Image>
            </Link>
            <div className={cx('cart-item__body')}>
                <p className={cx('cart-item__caption')}>BLUEDIO</p>

                <Link to={'#!'}>
                    <span className={cx('cart-item__name')}>
                        {' '}
                        Prime Pro Smartwatch
                    </span>
                </Link>
                <div className={cx('cart-item__options')}>
                    <p className={cx('cart-item__option')}>Dark Lavender</p>
                    <p className={cx('cart-item__option')}>Rubber</p>
                    <p className={cx('cart-item__option')}>1.5 Inches</p>
                </div>
                <div className={cx('cart-item__quantity-wrapper')}>
                    {/* Onblur when input error = -1... */}
                    <div className={cx('cart-item__error')}>
                        <ErrorIcon></ErrorIcon>
                        <p className={cx('cart-item__error-text')}>
                            You can only add 1 of this item to your cart.
                        </p>
                    </div>
                    <Quantity
                        className={cx('cart-item__quantity')}
                        widthBtn="35px"
                        heightBtn="36px"
                    ></Quantity>
                </div>
                <div className={cx('cart-item__remove-wrapper')}>
                    <Button className={cx('cart-item__remove-btn')}>
                        <RemoveIcon></RemoveIcon>
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default CartItem;
