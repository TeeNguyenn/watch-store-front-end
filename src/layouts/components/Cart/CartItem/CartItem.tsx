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
    const [isErrorQuantity, setIsErrorQuantity] = useState(false);

    const handleErrorQuantity = (isError: boolean) => {
        setIsErrorQuantity(isError);
    };
    return (
        <div className={cx('cart-item')}>
            <Link to={'#!'} className={cx('cart-item__img-link')}>
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
                    <div
                        className={cx('cart-item__error', {
                            show: isErrorQuantity,
                        })}
                    >
                        <ErrorIcon></ErrorIcon>
                        <p className={cx('cart-item__error-text')}>
                            You can only add from 1 to 100 of this item to your
                            cart.
                        </p>
                    </div>
                    <Quantity
                        className={cx('cart-item__quantity')}
                        widthBtn="35px"
                        heightBtn="36px"
                        handleErrorQuantity={handleErrorQuantity}
                    ></Quantity>
                </div>
                <div className={cx('cart-item__remove-wrapper')}>
                    <Button className={cx('cart-item__remove-btn')}>
                        <RemoveIcon
                            className={cx('cart-item__remove-icon')}
                        ></RemoveIcon>
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default CartItem;
