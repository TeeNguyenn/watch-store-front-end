import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
    CloseIcon,
    DiscountIcon,
    GiftIcon,
    ShippingIcon,
} from '../../../components/Icons';
import CartItem from './CartItem';
import Progress from '../../../components/Progress';
import * as cartItemServices from '../../../services/cartItemServices';
import config from '../../../config';
import { formatPrice } from '../../../utils/Functions';
import * as productServices from '../../../services/productServices';
import PreLoader from '../../../components/PreLoader';

const cx = classNames.bind(styles);

interface CartProps {
    handleCloseCartDrawer: () => void;
}

const Cart = ({ handleCloseCartDrawer }: CartProps) => {
    const currentUser = localStorage.getItem('user_id');
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    //re-render component when remove cart-item
    const [cartList, setCartList] = useState<any[]>(
        JSON.parse(localStorage.getItem('cart_list') + '') || []
    );

    useEffect(() => {
        const handleStorageChange = () => {
            if (!currentUser) {
                // setCartList(
                //     JSON.parse(localStorage.getItem('cart_list') + '') || []
                // );
            } else {
                const fetchApi = async () => {
                    const res = await cartItemServices.getCartItemByUserId();
                    setCartList(res.reverse());

                    localStorage.setItem(
                        'products',
                        JSON.stringify(res.reverse())
                    );
                };

                fetchApi();
            }
        };
        // const handleIncreaseQuantity = () => {
        //     if (!currentUser) {
        //         setCartList(
        //             JSON.parse(localStorage.getItem('cart_list') + '') || []
        //         );
        //     } else {
        //         const fetchApi = async () => {
        //             if (currentUser) {
        //                 const res =
        //                     await cartItemServices.getCartItemByUserId();
        //                 setCartList(res);
        //             }
        //         };
        //         fetchApi();
        //         setTimeout(fetchApi, 800);
        //     }
        // };

        // Lắng nghe sự kiện "storage" từ các tab khác
        window.addEventListener('storage', handleStorageChange);

        // Lắng nghe sự kiện tùy chỉnh "storageChanged" trong cùng tab
        window.addEventListener('storageChanged', handleStorageChange);

        // window.addEventListener('quantityChanged', handleIncreaseQuantity);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('storageChanged', handleStorageChange);
        };
    }, []);

    // Get cart item from db
    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                if (currentUser) {
                    const res = await cartItemServices.getCartItemByUserId();
                    setCartList(res.reverse());
                }
            };
            setTimeout(fetchApi, 0);
        }
    }, [currentUser]);

    // calculate subtotal
    useEffect(() => {
        let result = 0;
        const fetchApi = async (cartItem: any) => {
            // setLoading(true);

            const responseData = await productServices.getProductById(
                cartItem.product_id
            );

            if (responseData.discount) {
                result =
                    result +
                    responseData.price *
                        (1 - responseData.discount / 100) *
                        cartItem.quantity;
            } else {
                result = subtotal + responseData.price * cartItem.quantity;
            }

            setSubtotal(result);

            // setLoading(false);
        };
        cartList.forEach((cartItem) => {
            fetchApi(cartItem);
        });
    }, [cartList]);

    const handleChangeCartList: any = (newArr: any) => {
        setCartList(newArr);
        localStorage.setItem('cart_list', JSON.stringify(newArr));
    };

    const handleCheckout = () => {
        // Remove key "id" for matches CartItemDTO
        const cartItems = cartList;
        cartItems.forEach((item) => delete item.id);

        localStorage.setItem('products', JSON.stringify(cartItems));
        document.body.classList.remove('hide-scroll');
        navigate(config.routes.checkout);
        handleCloseCartDrawer();
    };

    if (cartList.length > 0) {
        return (
            <div className={cx('cart-list')}>
                {/* Header */}
                <div className={cx('cart-list__header')}>
                    <h2 className={cx('cart-list__header-title')}>
                        Your Cart (<span>{cartList.length}</span>)
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
                        <Progress></Progress>
                    </div>
                    <div className={cx('cart-items__wrapper')}>
                        <div className={cx('cart-items__inner')}>
                            {cartList.map((cartItem: any, index) => (
                                <CartItem
                                    key={index}
                                    cartItem={cartItem}
                                    handleChangeCartList={handleChangeCartList}
                                ></CartItem>
                            ))}
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
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                        <p className={cx('cart-list__note')}>
                            Shipping calculated at checkout
                        </p>
                    </div>
                    <div className={cx('cart-list__ctas')}>
                        <Button
                            rounded
                            to={config.routes.cart}
                            className={cx('cart-list__view-btn')}
                            onClick={handleCloseCartDrawer}
                        >
                            View Cart
                        </Button>
                        <Button
                            rounded
                            to={config.routes.checkout}
                            className={cx('cart-list__proceed-btn')}
                            onClick={handleCheckout}
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
                to={config.routes.shop}
                className={cx('cart-empty__continue-btn')}
                onClick={handleCloseCartDrawer}
            >
                Continue shopping
            </Button>
            {!currentUser && (
                <>
                    <p className={cx('cart-empty__label')}>Have an account?</p>
                    <p className={cx('cart-empty__text')}>
                        <Link
                            to={config.routes.login}
                            className={cx('cart-empty__login')}
                            onClick={handleCloseCartDrawer}
                        >
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
