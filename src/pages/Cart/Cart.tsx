import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import styles from './Cart.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Progress from '../../components/Progress';
import Image from '../../components/Image';
import images from '../../assets/images';
import Quantity from '../../components/Quantity';
import { RemoveIcon } from '../../components/Icons';
import config from '../../config';
import Feature from '../../components/Feature';
import cartImages from '../../assets/images/cart';

const cx = classNames.bind(styles);

// fake cart list
const cartList = [1, 2, 3];

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
    const currentUser = true;

    const links = ['Home', 'Your Shopping Cart'];

    return (
        <div className={cx('cart__container', { 'container-spacing': true })}>
            <Breadcrumb title="Your Shopping Cart" links={links}></Breadcrumb>
            <div
                className={cx('cart', {
                    'd-none': cartList.length === 0,
                })}
            >
                <div className={cx('', { row: true })}>
                    {/* Product */}
                    <div
                        className={cx('', {
                            col: true,
                            'col-8': true,
                            'col-lg-7': true,
                            'col-md-12': true,
                        })}
                    >
                        <Progress className={cx('cart__progress')}></Progress>
                        <h2 className={cx('cart__title')}>Your Cart</h2>
                        <div className={cx('cart__content')}>
                            <table className={cx('cart__list')}>
                                <thead>
                                    <tr>
                                        <th className={cx('cart__heading')}>
                                            Product
                                        </th>
                                        <th
                                            className={cx('cart__heading', {
                                                'd-lg-none': true,
                                            })}
                                        >
                                            Quantity
                                        </th>
                                        <th
                                            className={cx('cart__heading', {
                                                'd-xl-none': true,
                                            })}
                                        >
                                            Price
                                        </th>
                                        <th
                                            className={cx('cart__heading', {
                                                'd-lg-none': true,
                                            })}
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={cx('cart-item')}>
                                        <td
                                            className={cx('cart-item__product')}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'cart-item__media'
                                                )}
                                            >
                                                <Image
                                                    src={images.cartItem}
                                                    className={cx(
                                                        'cart-item__img'
                                                    )}
                                                ></Image>
                                            </Link>
                                            <div
                                                className={cx(
                                                    'cart-item__body'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'cart-item__label'
                                                    )}
                                                >
                                                    Skullcandy
                                                </p>
                                                <Link
                                                    to={'#!'}
                                                    className={cx(
                                                        'cart-item__link',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                >
                                                    Digital Smartwatch
                                                </Link>
                                                <div
                                                    className={cx(
                                                        'cart-item__price-text',
                                                        {
                                                            'd-none': true,
                                                            'd-xl-block': true,
                                                        }
                                                    )}
                                                >
                                                    $29.80
                                                </div>
                                                <div
                                                    className={cx(
                                                        'cart-item__options'
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'cart-item__option'
                                                        )}
                                                    >
                                                        Dusty Grey
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'cart-item__option'
                                                        )}
                                                    >
                                                        1.5 Inches
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'cart-item__option'
                                                        )}
                                                    >
                                                        Leather
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'cart__mobile-actions',
                                                        {
                                                            'd-none': true,
                                                            'd-lg-flex': true,
                                                        }
                                                    )}
                                                >
                                                    <Quantity
                                                        widthBtn="40px"
                                                        heightBtn="42px"
                                                    ></Quantity>
                                                    <RemoveIcon
                                                        width="17"
                                                        height="22"
                                                    ></RemoveIcon>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={cx(
                                                'cart-item__quantity',
                                                {
                                                    'd-lg-none': true,
                                                }
                                            )}
                                        >
                                            <Quantity
                                                widthBtn="55px"
                                                heightBtn="55px"
                                            ></Quantity>
                                        </td>
                                        <td
                                            className={cx('cart-item__price', {
                                                'd-xl-none': true,
                                            })}
                                        >
                                            <div
                                                className={cx(
                                                    'cart-item__price-text'
                                                )}
                                            >
                                                $29.80
                                            </div>
                                        </td>
                                        <td
                                            className={cx('cart-item__total', {
                                                'd-lg-none': true,
                                            })}
                                        >
                                            <div
                                                className={cx(
                                                    'cart-item__total-text'
                                                )}
                                            >
                                                $29.80
                                            </div>
                                            <RemoveIcon
                                                className={cx('', {
                                                    'primary-hover': true,
                                                })}
                                            ></RemoveIcon>
                                        </td>
                                    </tr>
                                    <tr className={cx('cart-item')}>
                                        <td
                                            className={cx('cart-item__product')}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'cart-item__media'
                                                )}
                                            >
                                                <Image
                                                    src={images.cartItem}
                                                    className={cx(
                                                        'cart-item__img'
                                                    )}
                                                ></Image>
                                            </Link>
                                            <div
                                                className={cx(
                                                    'cart-item__body'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'cart-item__label'
                                                    )}
                                                >
                                                    Skullcandy
                                                </p>
                                                <Link
                                                    to={'#!'}
                                                    className={cx(
                                                        'cart-item__link',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                >
                                                    Digital Smartwatch
                                                </Link>
                                                <div
                                                    className={cx(
                                                        'cart-item__options'
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'cart-item__option'
                                                        )}
                                                    >
                                                        Dusty Grey
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'cart-item__option'
                                                        )}
                                                    >
                                                        1.5 Inches
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'cart-item__option'
                                                        )}
                                                    >
                                                        Leather
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'cart__mobile-actions',
                                                        {
                                                            'd-none': true,
                                                            'd-lg-flex': true,
                                                        }
                                                    )}
                                                >
                                                    <Quantity
                                                        widthBtn="40px"
                                                        heightBtn="42px"
                                                    ></Quantity>
                                                    <RemoveIcon
                                                        width="17"
                                                        height="22"
                                                    ></RemoveIcon>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={cx(
                                                'cart-item__quantity',
                                                {
                                                    'd-lg-none': true,
                                                }
                                            )}
                                        >
                                            <Quantity
                                                widthBtn="55px"
                                                heightBtn="55px"
                                            ></Quantity>
                                        </td>
                                        <td
                                            className={cx('cart-item__price', {
                                                'd-xl-none': true,
                                            })}
                                        >
                                            <div
                                                className={cx(
                                                    'cart-item__price-text'
                                                )}
                                            >
                                                $29.80
                                            </div>
                                        </td>
                                        <td
                                            className={cx('cart-item__total', {
                                                'd-lg-none': true,
                                            })}
                                        >
                                            <div
                                                className={cx(
                                                    'cart-item__total-text'
                                                )}
                                            >
                                                $29.80
                                            </div>
                                            <RemoveIcon
                                                className={cx('', {
                                                    'primary-hover': true,
                                                })}
                                            ></RemoveIcon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button
                                rounded
                                primary
                                to={config.routes.shop}
                                className={cx('cart__shopping-btn')}
                            >
                                Continue shopping
                            </Button>
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
                                <span className={cx('cart__total-text')}>
                                    Subtotal
                                </span>
                                <span className={cx('cart__total-text')}>
                                    $1000
                                </span>
                            </div>
                            <div className={cx('cart__row')}>
                                <span className={cx('cart__total-text')}>
                                    Shipping
                                </span>
                                <span className={cx('cart__total-text')}>
                                    Free
                                </span>
                            </div>
                            <div className={cx('cart__row')}>
                                <span className={cx('cart__total')}>Total</span>
                                <span className={cx('cart__price')}>$1000</span>
                            </div>
                            <Button
                                rounded
                                primary
                                to={config.routes.checkout}
                                className={cx('cart__checkout-btn')}
                            >
                                Proceed to checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart empty */}
            <div
                className={cx('cart-empty', {
                    'd-none': cartList.length > 0,
                })}
            >
                <h2 className={cx('cart-empty__title')}>Your cart is empty</h2>
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
            <Feature
                className={cx('cart__feature')}
                featureList={featureList}
            ></Feature>
        </div>
    );
};

export default Cart;
