import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../../components/Button';
import styles from './Cart.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Progress from '../../components/Progress';
import Image from '../../components/Image';
import images from '../../assets/images';
import Quantity from '../../components/Quantity';
import { ErrorIcon, RemoveIcon } from '../../components/Icons';
import config from '../../config';
import Feature from '../../components/Feature';
import cartImages from '../../assets/images/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Price from '../../components/Price';
import * as cartItemServices from '../../services/cartItemServices';
import * as productServices from '../../services/productServices';
import VariantModel from '../../models/VariantModel';
import ProductModel from '../../models/ProductModel';
import CartItem from './CartItem';
import PreLoader from '../../components/PreLoader';
import { formatPrice } from '../../utils/Functions';

const cx = classNames.bind(styles);

//fake featureList
const featureList: any[] = [
    {
        img: cartImages.icon1,
        title: 'Flexible Payment',
        desc: [
            'Ut nec luctus urna. Suspendisse sagittis metus nulla sit',
            'amet imperdiet leo volutpat eu. Nunc in erat erat.',
        ],
    },
    {
        img: cartImages.icon2,
        title: 'Online support',
        desc: [
            'Ut nec luctus urna. Suspendisse sagittis metus nulla sit',
            'amet imperdiet leo volutpat eu. Nunc in erat erat.',
        ],
    },
    {
        img: cartImages.icon3,
        title: 'In-store Pickup',
        desc: [
            'Ut nec luctus urna. Suspendisse sagittis metus nulla sit',
            'amet imperdiet leo volutpat eu. Nunc in erat erat.',
        ],
    },
];

const Cart = () => {
    const links = ['Home', 'Your Shopping Cart'];
    const navigate = useNavigate();

    const currentUser = localStorage.getItem('user_id');
    const [subtotal, setSubtotal] = useState(0);
    const location = useLocation();
    const pathName = location.pathname;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            if (pathName === '/cart') {
                setLoading(true);
            }
        }
    }, [pathName, currentUser]);

    //re-render component when remove cart-item
    const [cartList, setCartList] = useState<any[]>(
        JSON.parse(localStorage.getItem('cart_list') + '') || []
    );

    useEffect(() => {
        const handleStorageChange = () => {
            if (!currentUser) {
                setCartList(
                    JSON.parse(localStorage.getItem('cart_list') + '') || []
                );
            } else {
                const fetchApi = async () => {
                    if (currentUser) {
                        const res =
                            await cartItemServices.getCartItemByUserId();
                        setCartList(res.reverse());
                        // localStorage.setItem(
                        //     'products',
                        //     JSON.stringify(res.reverse())
                        // );
                    }
                };
                fetchApi();
            }
        };

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
        const fetchApi = async () => {
            if (currentUser) {
                const res = await cartItemServices.getCartItemByUserId();
                setCartList(res.reverse());
                setLoading(false);
            }
        };
        fetchApi();
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
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('cart__container', { 'container-spacing': true })}>
            <Breadcrumb title="Your Shopping Cart" links={links}></Breadcrumb>
            <div
                className={cx('cart', {
                    'd-none': cartList.length === 0,
                })}
            >
                <div className={cx('')}>
                    {/* Product */}
                    <div className={cx('')}>
                        <Progress className={cx('cart__progress')}></Progress>
                        <h2 className={cx('cart__title')}>Your Cart</h2>
                        <div className={cx('cart__content')}>
                            <div className={cx('cart__table-container')}>
                                <table className={cx('cart__list')}>
                                    <thead>
                                        <tr>
                                            <th
                                                className={cx('cart__heading')}
                                                style={{
                                                    width: '35%',
                                                    minWidth: '450px',
                                                }}
                                            >
                                                Product
                                            </th>
                                            <th
                                                className={cx('cart__heading', {
                                                    'd-md-none': true,
                                                })}
                                                style={{
                                                    width: '20%',
                                                    minWidth: '220px',
                                                }}
                                            >
                                                Variant
                                            </th>
                                            <th
                                                className={cx('cart__heading', {
                                                    'd-xl-none': true,
                                                })}
                                                style={{
                                                    width: '15%',
                                                    minWidth: '160px',
                                                }}
                                            >
                                                Price
                                            </th>
                                            <th
                                                className={cx('cart__heading', {
                                                    'd-lg-none': true,
                                                })}
                                                style={{
                                                    width: '15%',
                                                    minWidth: '180px',
                                                }}
                                            >
                                                Quantity
                                            </th>

                                            <th
                                                className={cx('cart__heading', {
                                                    'd-lg-none': true,
                                                })}
                                                style={{
                                                    width: '10%',
                                                    minWidth: '120px',
                                                }}
                                            >
                                                Total
                                            </th>
                                            <th
                                                className={cx('cart__heading', {
                                                    'd-lg-none': true,
                                                })}
                                                style={{
                                                    width: '5%',
                                                }}
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartList.map((cartItem) => (
                                            <CartItem
                                                cartItem={cartItem}
                                                handleChangeCartList={
                                                    handleChangeCartList
                                                }
                                            ></CartItem>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('cart__row-md', { row: true })}>
                                <div className="col col-8 col-lg-7 col-md-12">
                                    <div className={cx('cart__wrapper')}>
                                        <Button
                                            rounded
                                            primary
                                            to={config.routes.shop}
                                            className={cx('cart__shopping-btn')}
                                        >
                                            Continue shopping
                                        </Button>
                                    </div>
                                    <div className={cx('cart__note')}>
                                        <span className={cx('cart__note-text')}>
                                            Order Special Instructions :
                                        </span>
                                        <textarea
                                            name="note"
                                            id="cart-note"
                                            className={cx('cart__note-area')}
                                            placeholder="How can we help you ?"
                                        ></textarea>
                                    </div>
                                </div>
                                {/* Total */}
                                <div
                                    className={cx('', {
                                        col: true,
                                        'col-4': true,
                                        'col-lg-5': true,
                                        'col-md-12': true,
                                    })}
                                >
                                    <div className={cx('cart__estimate')}>
                                        <div className={cx('cart__row')}>
                                            <span className={cx('cart__total')}>
                                                Subtotal
                                            </span>
                                            <span className={cx('cart__total')}>
                                                {formatPrice(subtotal)}
                                            </span>
                                        </div>
                                        <div className={cx('cart__row')}>
                                            <div
                                                className={cx(
                                                    'cart__total-text'
                                                )}
                                            >
                                                <ErrorIcon
                                                    width="1.5rem"
                                                    height="1.5rem"
                                                ></ErrorIcon>
                                                <span>
                                                    Shipping calculated at
                                                    checkout
                                                </span>
                                            </div>
                                            {/* <span
                                                className={cx(
                                                    'cart__total-text'
                                                )}
                                            >
                                                Free
                                            </span> */}
                                        </div>
                                        {/* <div className={cx('cart__row')}>
                                            <span className={cx('cart__total')}>
                                                Total
                                            </span>
                                            <span className={cx('cart__price')}>
                                                {formatPrice(subtotal)}
                                                
                                            </span>
                                        </div> */}
                                        <Button
                                            rounded
                                            primary
                                            to={config.routes.checkout}
                                            className={cx('cart__checkout-btn')}
                                            onClick={handleCheckout}
                                        >
                                            Proceed to checkout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart empty */}
            {cartList.length === 0 && (
                <div className={cx('cart-empty')}>
                    <h2 className={cx('cart-empty__title')}>
                        Your cart is empty
                    </h2>
                    <Button
                        rounded
                        to={config.routes.shop}
                        className={cx('cart-empty__continue-btn')}
                    >
                        Continue shopping
                    </Button>
                    {!currentUser && (
                        <>
                            <p className={cx('cart-empty__label')}>
                                Have an account?
                            </p>
                            <p className={cx('cart-empty__text')}>
                                <Link
                                    to={config.routes.login}
                                    className={cx('cart-empty__login')}
                                >
                                    Log In
                                </Link>
                                {' to check out faster.'}
                            </p>
                        </>
                    )}
                </div>
            )}
            <Feature
                className={cx('cart__feature')}
                featureList={featureList}
            ></Feature>
        </div>
    );
};

export default Cart;
