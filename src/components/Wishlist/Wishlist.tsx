import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Wishlist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faCartShopping,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { RemoveIcon, RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import { renderRating, splitArrayAtIndex } from '../../utils/Functions';
import Image from '../Image';
import images from '../../assets/images';
import VariantModel from '../../models/VariantModel';
import ProductImageModel from '../../models/ProductImageModel';
import ProductModel from '../../models/ProductModel';
import WishlistItem from './WishlistItem';
import * as favoriteServices from '../../services/favoriteServices';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

const Wishlist = () => {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);

    const [viewAll, setViewAll] = useState(false);

    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(false);

    const [wishlist, setWishlist] = useState<any[]>(
        JSON.parse(localStorage.getItem('wishlist') + '') || []
    );

    // const [wishlistShow, wishlistHide] = splitArrayAtIndex(wishlist, 6);
    const [limit, setLimit] = useState(6);

    // get wishlist from db
    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            localStorage.removeItem('wishlist');
            const fetchApi = async () => {
                const res = await favoriteServices.getFavoriteByUserId(
                    currentPage,
                    limit
                );
                setWishlist(res.result);
                setTotalPage(res.totalPage);
                setTotalProduct(res.totalProduct);
            };
            fetchApi();
            setTimeout(() => {
                setLoading(false);
            }, 500);
        } else {
            setLoading(true);

            const wishList =
                JSON.parse(localStorage.getItem('wishlist') + '') || [];
            const newArr = [];

            if (wishList.length > 0) {
                for (
                    let index = limit * (currentPage - 1);
                    index <= limit * currentPage - 1;
                    index++
                ) {
                    if (index === wishList.length) {
                        break;
                    }
                    newArr.push(wishList[index]);
                }
            }

            setWishlist(newArr);
            setTotalProduct(
                JSON.parse(localStorage.getItem('wishlist') + '').length
            );
            setTotalPage(
                Math.ceil(
                    JSON.parse(localStorage.getItem('wishlist') + '').length /
                        limit
                )
            );

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [currentUser, currentPage, limit]);

    // re-render component when remove wishlist-item
    useEffect(() => {
        const handleStorageChange = () => {
            if (!currentUser) {
                setLoading(true);

                setTimeout(() => {
                    setWishlist(
                        JSON.parse(localStorage.getItem('wishlist') + '') || []
                    );
                    setLoading(false);
                }, 300);
            } else {
                setLoading(true);
                const fetchApi = async () => {
                    const res = await favoriteServices.getFavoriteByUserId();
                    setWishlist(res.result);
                    setTotalPage(res.totalPage);
                    setTotalProduct(res.totalProduct);

                    setLoading(false);
                };
                setTimeout(() => {
                    fetchApi();
                }, 300);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Lắng nghe sự kiện tùy chỉnh "storageChanged" trong cùng tab
        window.addEventListener('storageChanged', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('storageChanged', handleStorageChange);
        };
    }, []);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    const handleChangeWishlist: any = (newArr: any, isCurrentUser = false) => {
        if (isCurrentUser) {
            setLoading(true);
            const fetchApi = async () => {
                const res = await favoriteServices.getFavoriteByUserId(
                    currentPage
                );
                setWishlist(res.result);
                setTotalPage(res.totalPage);
                setTotalProduct(res.totalProduct);

                // handle remove last item
                const remainder = res.totalProduct % 6;
                const totalPages = Math.ceil((res.totalProduct + 1) / limit);

                if (
                    remainder === 0 &&
                    res.totalProduct > 0 &&
                    currentPage === totalPages &&
                    !viewAll
                ) {
                    setCurrentPage(currentPage - 1);
                }

                setLoading(false);
            };
            setTimeout(() => {
                fetchApi();
            }, 300);
        } else {
            // setWishlist(newArr);
            setLoading(true);
            localStorage.setItem('wishlist', JSON.stringify(newArr));

            const wishList =
                JSON.parse(localStorage.getItem('wishlist') + '') || [];
            const newList = [];
            if (wishList.length > 0) {
                for (
                    let index = limit * (currentPage - 1);
                    index <= limit * currentPage - 1;
                    index++
                ) {
                    if (index === wishList.length) {
                        break;
                    }
                    newList.push(wishList[index]);
                }
            }

            setWishlist(newList);
            setTotalProduct(
                JSON.parse(localStorage.getItem('wishlist') + '').length
            );
            setTotalPage(
                Math.ceil(
                    JSON.parse(localStorage.getItem('wishlist') + '').length /
                        limit
                )
            );

            // handle remove last item
            const remainder = wishList.length % 6;
            const totalPages = Math.ceil(
                (JSON.parse(localStorage.getItem('wishlist') + '').length + 1) /
                    limit
            );

            if (
                remainder === 0 &&
                wishList.length > 0 &&
                currentPage === totalPages &&
                !viewAll
            ) {
                setCurrentPage(currentPage - 1);

                setLoading(false);
                return;
            }

            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    };

    const handleViewAll = () => {
        if (!viewAll) {
            setLimit(totalProduct);
        } else {
            setLimit(6);
        }
        setViewAll(!viewAll);
    };

    if (loading) {
        window.scrollTo(0, 0);
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('wishlist')}>
            <div className={cx('wishlist__container')}>
                <table className={cx('wishlist__table')}>
                    <thead>
                        <tr>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '8%' }}
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
                                style={{ width: '22%', minWidth: '300px' }}
                            >
                                Variant
                            </th>

                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '20%', minWidth: '200px' }}
                            >
                                price
                            </th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '20%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.map((wishlistItem, index) => (
                            <WishlistItem
                                key={index}
                                wishlistItem={
                                    currentUser
                                        ? wishlistItem
                                        : {
                                              productId:
                                                  wishlistItem.product_id,
                                              colorId: wishlistItem.color_id,
                                              screenSizeId:
                                                  wishlistItem.screen_size_id,
                                              materialId:
                                                  wishlistItem.material_id,
                                          }
                                }
                                handleChangeWishlist={handleChangeWishlist}
                            ></WishlistItem>
                        ))}
                        {/* Wishlist hide */}
                        {/* {wishlistHide.map((wishlistItem, index) => (
                            <WishlistItem
                                key={index}
                                className={!viewAll ? 'd-none' : ''}
                                wishlistItem={
                                    currentUser
                                        ? wishlistItem
                                        : {
                                              productId:
                                                  wishlistItem.product_id,
                                              colorId: wishlistItem.color_id,
                                              screenSizeId:
                                                  wishlistItem.screen_size_id,
                                              materialId:
                                                  wishlistItem.material_id,
                                          }
                                }
                                handleChangeWishlist={handleChangeWishlist}
                            ></WishlistItem>
                        ))} */}
                    </tbody>
                </table>
            </div>
            <div
                className={cx('wishlist__bottom', {
                    'd-none': currentUser
                        ? totalPage === 1 && wishlist.length <= 6
                        : JSON.parse(localStorage.getItem('wishlist') + '')
                              .length <= 6,
                })}
            >
                <div className={cx('wishlist__view')}>
                    <p
                        className={cx('wishlist__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        {viewAll
                            ? `1 to ${totalProduct} items of ${totalProduct}`
                            : `${limit * (currentPage - 1) + 1} to ${
                                  currentPage * 6 >= totalProduct
                                      ? totalProduct
                                      : currentPage * 6
                              } items of ${totalProduct}`}
                    </p>
                    <Button
                        className={cx('wishlist__view-btn', {
                            'd-none': currentPage > 1,
                        })}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={handleViewAll}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button>
                </div>
                <div className={cx('wishlist__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={viewAll ? 1 : totalPage} //temp
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
