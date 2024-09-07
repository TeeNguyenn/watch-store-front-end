import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Wishlist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { RemoveIcon, RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import { renderRating } from '../../utils/Functions';
import Image from '../Image';
import images from '../../assets/images';

const cx = classNames.bind(styles);

// fake wishList
const wishList = [1, 2, 3, 4, 5, 6];

const Wishlist = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAll, setViewAll] = useState(false);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };
    return (
        <div className={cx('wishlist')}>
            <div className={cx('wishlist__container')}>
                <table className={cx('wishlist__table')}>
                    <thead>
                        <tr>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '7%' }}
                            ></th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{
                                    minWidth: '250px',
                                    width: '30%',
                                }}
                            >
                                products
                            </th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '16%', minWidth: '150px' }}
                            >
                                color
                            </th>

                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '10%', minWidth: '80px' }}
                            >
                                size
                            </th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '10%' }}
                            >
                                price
                            </th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '35%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishList.map((wishlistItem, index) => (
                            <tr key={index}>
                                <td className={cx('wishlist__media')}>
                                    <div
                                        className={cx('wishlist__img-wrapper')}
                                    >
                                        <Image
                                            src={images.cartItem}
                                            alt="image"
                                            loading={'lazy'}
                                            className={cx('wishlist__img')}
                                        ></Image>
                                    </div>
                                </td>
                                <td className={cx('wishlist__product')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('wishlist__link', {
                                            'line-clamp': true,
                                            'line-clamp-1': true,
                                        })}
                                    >
                                        Fitbit Sense Advanced Smartwatch with
                                        Tools Fitbit Sense Advanced Smartwatch
                                        with Tools Fitbit Sense Advanced
                                        Smartwatch with Tools
                                    </Link>
                                </td>
                                <td className={cx('wishlist__color')}>
                                    <p className={cx('wishlist__color-text')}>
                                        Pure matte black
                                    </p>
                                </td>
                                <td className={cx('wishlist__size')}>
                                    <p className={cx('size-text')}>Regular</p>
                                </td>

                                <td className={cx('wishlist__price')}>
                                    $1,699
                                </td>
                                <td className={cx('wishlist__options')}>
                                    <div
                                        className={cx(
                                            'wishlist__option-wrapper'
                                        )}
                                    >
                                        <Button
                                            className={cx(
                                                'wishlist__trash-can'
                                            )}
                                        >
                                            <RemoveIcon
                                                width="1.6rem"
                                                height="1.6rem"
                                            ></RemoveIcon>
                                        </Button>
                                        <Button
                                            className={cx('wishlist__add-cart')}
                                            leftIcon={
                                                <FontAwesomeIcon
                                                    icon={faCartShopping}
                                                />
                                            }
                                        >
                                            Add to cart
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/* Wishlist hide */}
                        {wishList.map((wishlistItem, index) => (
                            <tr
                                key={index}
                                className={cx('wishlist__item-hide', {
                                    show: viewAll,
                                })}
                            >
                                <td className={cx('wishlist__media')}>
                                    <div
                                        className={cx('wishlist__img-wrapper')}
                                    >
                                        <Image
                                            src={images.cartItem}
                                            alt="image"
                                            loading={'lazy'}
                                            className={cx('wishlist__img')}
                                        ></Image>
                                    </div>
                                </td>
                                <td className={cx('wishlist__product')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('wishlist__link', {
                                            'line-clamp': true,
                                            'line-clamp-1': true,
                                        })}
                                    >
                                        AAA Fitbit Sense Advanced Smartwatch
                                        with Tools Fitbit Sense Advanced
                                        Smartwatch with Tools Fitbit Sense
                                        Advanced Smartwatch with Tools
                                    </Link>
                                </td>
                                <td className={cx('wishlist__color')}>
                                    <p className={cx('wishlist__color-text')}>
                                        Pure matte black
                                    </p>
                                </td>
                                <td className={cx('wishlist__size')}>
                                    <p className={cx('size-text')}>Regular</p>
                                </td>

                                <td className={cx('wishlist__price')}>
                                    $1,699
                                </td>
                                <td className={cx('wishlist__options')}>
                                    <div
                                        className={cx(
                                            'wishlist__option-wrapper'
                                        )}
                                    >
                                        <Button
                                            className={cx(
                                                'wishlist__trash-can'
                                            )}
                                        >
                                            <RemoveIcon
                                                width="1.6rem"
                                                height="1.6rem"
                                            ></RemoveIcon>
                                        </Button>
                                        <Button
                                            className={cx('wishlist__add-cart')}
                                            leftIcon={
                                                <FontAwesomeIcon
                                                    icon={faCartShopping}
                                                />
                                            }
                                        >
                                            Add to cart
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('wishlist__bottom')}>
                <div className={cx('wishlist__view')}>
                    <p
                        className={cx('wishlist__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        1 to 6 items of 15
                    </p>
                    {/* <Button
                        className={cx('wishlist__view-btn')}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={() => setViewAll(!viewAll)}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button> */}
                </div>
                <div className={cx('wishlist__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={5}
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
