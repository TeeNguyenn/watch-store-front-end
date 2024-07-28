import React from 'react';
import classNames from 'classnames/bind';
import Button from '../../../components/Button';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import {
    CloseIcon,
    DiscountIcon,
    GiftIcon,
    ProgressIcon,
    ShippingIcon,
} from '../../../components/Icons';
import CartItem from './CartItem';

const cx = classNames.bind(styles);

// Fake data
const cartList = [1, 2, 3];

interface CartProps {
    handleCloseCartDrawer: () => void;
}

const Cart = ({ handleCloseCartDrawer }: CartProps) => {
    const currentUser = true;

    if (currentUser && cartList.length > 0) {
        return (
            <div className={cx('cart-list')}>
                {/* Header */}
                <div className={cx('cart-list__header')}>
                    <h2 className={cx('cart-list__header-title')}>
                        Your Cart (<span>3</span>)
                    </h2>
                    <div
                        className={cx('cart-list__close-btn')}
                        onClick={handleCloseCartDrawer}
                    >
                        <CloseIcon></CloseIcon>
                    </div>
                </div>
                {/* Cart-items */}
                <div className={cx('cart-list__cart-items')}>
                    {/* Cart progress */}
                    <div className={cx('cart-list__progress')}>
                        <p className={cx('progress__title')}>
                            Congratulations! You've got
                            <span className={cx('progress__shipping')}>
                                {' '}
                                Free Shipping!
                            </span>
                        </p>
                        <div className={cx('progress__bar')}>
                            <div className={cx('progress__line')}></div>
                        </div>
                        <div className={cx('progress__icon-wrapper')}>
                            <ProgressIcon
                                className={cx('progress__icon')}
                            ></ProgressIcon>
                        </div>
                    </div>
                    <div className={cx('cart-items__wrapper')}>
                        <div className={cx('cart-items__inner')}>
                            <CartItem></CartItem>
                            <CartItem></CartItem>
                            <CartItem></CartItem>
                        </div>
                    </div>
                </div>
                <div className={cx('cart-list__footer')}>
                    <div className={cx('cart-list__details')}>
                        <div className={cx('cart-list__icon')}>
                            <ShippingIcon></ShippingIcon>
                        </div>
                        <div className={cx('cart-list__icon')}>
                            <GiftIcon></GiftIcon>
                        </div>
                        <div className={cx('cart-list__icon')}>
                            <DiscountIcon></DiscountIcon>
                        </div>
                    </div>
                    <div className={cx('cart-list__total')}>
                        <div className={cx('cart-list__subtotal')}>
                            <p>Subtotal</p>
                            <p>$35.8291</p>
                        </div>
                        <p className={cx('cart-list__note')}>
                            Taxes and shipping calculated at checkout
                        </p>
                    </div>
                    <div className={cx('cart-list__ctas')}>
                        <Button
                            rounded
                            to={'#!'}
                            className={cx('cart-list__view-btn')}
                        >
                            View Cart
                        </Button>
                        <Button
                            rounded
                            to={'#!'}
                            className={cx('cart-list__proceed-btn')}
                        >
                            Proceed to checkout
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('cart-empty')}>
            <div
                className={cx('cart-empty__close-btn')}
                onClick={handleCloseCartDrawer}
            >
                <CloseIcon height="2.2rem"></CloseIcon>
            </div>
            <h2 className={cx('cart-empty__title')}>Your cart is empty</h2>
            <Button
                rounded
                to="/shop"
                className={cx('cart-empty__continue-btn')}
            >
                Continue shopping
            </Button>
            {!currentUser && (
                <>
                    <p className={cx('cart-empty__label')}>Have an account?</p>
                    <p className={cx('cart-empty__text')}>
                        <Link to={'/login'} className={cx('cart-empty__login')}>
                            Log In
                        </Link>
                        {' to check out faster.'}
                    </p>
                </>
            )}
        </div>
    );
};

export default Cart;
