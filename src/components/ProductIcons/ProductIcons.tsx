import React, { useContext, useEffect, useMemo, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import styles from './ProductIcons.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    ActiveHeartIcon,
    AddToCartIcon,
    CloseIcon,
    CompareFillIcon,
    CompareIcon,
    HeartIcon,
    QuickByIcon,
} from '../Icons';
import Button from '../Button';
import ProductModel from '../../models/ProductModel';
import { CartContext } from '../../contexts/CartContext';
import VariantModel from '../../models/VariantModel';
import * as cartItemServices from '../../services/cartItemServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import * as favoriteServices from '../../services/favoriteServices';
import QuickBuy from '../QuickBuy';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

interface ProductIconsProps {
    mobile?: boolean;
    className?: string;
    productItem?: ProductModel;
    handleShowQuickBuy?: any;
}

const ProductIcons = ({
    mobile,
    className,
    productItem,
    handleShowQuickBuy,
}: ProductIconsProps) => {
    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const [loadingQuickBuy, setLoadingQuickBuy] = useState(false);
    const [loadingCompare, setLoadingCompare] = useState(false);
    const [liked, setLiked] = useState(false);
    const [compared, setCompared] = useState(false);
    const location = useLocation();
    const pathName = location.pathname;
    const [isWishlist, setIsWishlist] = useState(false);
    const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);

    const context = useContext(CartContext);

    const arr: VariantModel[] | undefined = productItem?.variants?.filter(
        (variant) =>
            variant.color.colorId === productItem?.colors.at(0)?.colorId
    );

    const result: VariantModel[] | undefined = [];

    arr?.forEach((sizeItem) => {
        let count = 0;
        for (let index = 0; index < result.length; index++) {
            if (
                sizeItem.screenSize.sizeId === result[index].screenSize.sizeId
            ) {
                count++;
                break;
            }
        }
        if (count === 0) {
            result.push(sizeItem);
        }
    });

    const sortResult = result.sort(
        (a: any, b: any) => a.screenSize.sizeId - b.screenSize.sizeId
    );
    const screenSizeId = sortResult?.at(0)?.screenSize.sizeId;

    let materialList: any[] = [];

    arr?.forEach((materialItem) => {
        if (materialItem.screenSize.sizeId === screenSizeId) {
            materialList.push(materialItem.material.materialId);
        }
    });

    const materialId = materialList.sort((a: any, b: any) => a - b).at(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (pathName === '/wishlist') {
            setIsWishlist(true);
        }
    }, [pathName]);

    // get wishlist
    useEffect(() => {
        if (!currentUser) {
            const wishlist: any[] =
                JSON.parse(localStorage.getItem('wishlist') + '') || [];

            let isLiked = false;
            wishlist.forEach((wishlistItem) => {
                if (wishlistItem.product_id === productItem?.productId) {
                    isLiked = true;
                    return;
                }
            });

            if (isLiked) {
                setLiked(true);
                return;
            }
        } else {
            const fetchApi = async () => {
                const res = await favoriteServices.getFavoriteByUserId();

                res.result.forEach((item) => {
                    if (item.productId === productItem?.productId) {
                        setLiked(true);
                        return;
                    }
                });
            };
            fetchApi();
        }
    }, []);

    // get compareList
    useEffect(() => {
        const compareList: any[] =
            JSON.parse(localStorage.getItem('compare_list') + '') || [];

        let isCompared = false;
        compareList.forEach((compareItem) => {
            if (compareItem.product_id === productItem?.productId) {
                isCompared = true;
                return;
            }
        });

        if (isCompared) {
            setCompared(true);
            return;
        }
    }, []);

    const handleAddToCart = () => {
        // const cartList: any[] =
        //     JSON.parse(localStorage.getItem('cart_list') + '') || [];

        if (!currentUser) {
            // setLoading(true);
            // let isIncrease = false;
            // const newArr = cartList.map((item) => {
            //     if (
            //         item.product_id === productItem?.productId &&
            //         item.color_id === productItem?.colors.at(0)?.colorId &&
            //         item.screen_size_id === screenSizeId &&
            //         item.material_id === materialId
            //     ) {
            //         item.quantity++;
            //         isIncrease = true;
            //     }
            //     return item;
            // });
            // if (isIncrease) {
            //     localStorage.setItem('cart_list', JSON.stringify(newArr));
            // } else {
            //     const newCartList = [
            //         {
            //             product_id: productItem?.productId,
            //             color_id: productItem?.colors.at(0)?.colorId,
            //             screen_size_id: screenSizeId,
            //             material_id: materialId,
            //             quantity: 1,
            //         },
            //         ...cartList,
            //     ];
            //     localStorage.setItem('cart_list', JSON.stringify(newCartList));
            // }
            // context?.handleCart();
            // window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            // setLoading(false);

            // Force login
            setLoadingLogin(true);
            localStorage.setItem('previousPage', location.pathname);
            window.scrollTo(0, 0);

            setTimeout(() => {
                setLoadingLogin(false);
                navigate(config.routes.login);
            }, 300);
        } else {
            setLoading(true);
            const fetchApi = async () => {
                const resData = await cartItemServices.getCartItemByUserId();

                const cartItem = resData.filter(
                    (item: any) =>
                        item.product_id === productItem?.productId &&
                        item.color_id === productItem?.colors.at(0)?.colorId &&
                        item.screen_size_id === screenSizeId &&
                        item.material_id === materialId
                );

                if (cartItem.length > 0) {
                    const res = await cartItemServices.putCartItem({
                        productId: productItem?.productId,
                        colorId: productItem?.colors.at(0)?.colorId,
                        screenSizeId: screenSizeId,
                        materialId: materialId,
                        quantity: cartItem.at(0).quantity + 1,
                        id: cartItem.at(0).id,
                    });
                    window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
                } else {
                    const res = await cartItemServices.postCartItem({
                        user_id: currentUser,
                        product_id: productItem?.productId,
                        color_id: productItem?.colors.at(0)?.colorId,
                        screen_size_id: screenSizeId,
                        material_id: materialId,
                        quantity: 1,
                    });
                    window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
                }
            };
            fetchApi();
            setTimeout(() => {
                context?.handleCart();
                setLoading(false);
                return;
            }, 1000);
        }
    };

    const handleAddWishlist = () => {
        if (!currentUser) {
            // setLoadingFavorite(true);
            // if (liked) {
            //     return;
            // } else {
            //     const wishlist: any[] =
            //         JSON.parse(localStorage.getItem('wishlist') + '') || [];
            //     const newWishlist = [
            //         {
            //             product_id: productItem?.productId,
            //             color_id: productItem?.colors.at(0)?.colorId,
            //             screen_size_id: screenSizeId,
            //             material_id: materialId,
            //         },
            //         ...wishlist,
            //     ];
            //     setLiked(true);
            //     window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            //     localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            // }

            // setTimeout(() => {
            //     setLoadingFavorite(false);
            // }, 300);

            // Force login
            setLoadingLogin(true);
            localStorage.setItem('previousPage', location.pathname);
            window.scrollTo(0, 0);

            setTimeout(() => {
                setLoadingLogin(false);
                navigate(config.routes.login);
            }, 300);
        } else {
            setLoadingFavorite(true);
            if (liked) {
                return;
            } else {
                const fetchApi = async () => {
                    const res = await favoriteServices.postFavorite({
                        userId: currentUser,
                        productId: productItem?.productId,
                        colorId: productItem?.colors.at(0)?.colorId,
                        screenSizeId: screenSizeId,
                        materialId: materialId,
                    });
                };
                fetchApi();
                setLiked(true);
            }

            setTimeout(() => {
                setLoadingFavorite(false);
            }, 300);
        }
    };

    const handleQuickBuy = () => {
        setLoadingQuickBuy(true);

        // navigate()

        // no scroll to top
        document.body.classList.add('hide-scroll');

        setTimeout(() => {
            handleShowQuickBuy(true);
            setShowQuickBuyModal(true);

            setLoadingQuickBuy(false);
        }, 300);
    };

    const handleShowQuickBuyModal = () => {
        document.body.classList.remove('hide-scroll');
        setShowQuickBuyModal(false);
        handleShowQuickBuy(false);
    };

    const handleAddCompare = () => {
        setLoadingCompare(true);
        if (compared) {
            return;
        } else {
            const compareList: any[] =
                JSON.parse(localStorage.getItem('compare_list') + '') || [];
            if (compareList.length === 4) {
                setShowCompareModal(true);
                setLoadingCompare(false);
                return;
            }
            const newCompareList = [
                {
                    product_id: productItem?.productId,
                },
                ...compareList,
            ];
            setCompared(true);
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            localStorage.setItem(
                'compare_list',
                JSON.stringify(newCompareList)
            );
        }

        setTimeout(() => {
            setLoadingCompare(false);
        }, 300);
    };

    if (loadingLogin) {
        return <PreLoader show></PreLoader>;
    }

    if (mobile) {
        return (
            <div
                className={cx('product-icons', 'modifier', {
                    'custom-wishlist': isWishlist,
                })}
            >
                {loadingFavorite ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <div
                        className={cx('wishlist-content')}
                        onClick={handleAddWishlist}
                    >
                        {liked ? (
                            <Button
                                to={config.routes.wishlist}
                                className={cx('btn')}
                            >
                                <ActiveHeartIcon
                                    className={cx('icon')}
                                    width="1.5rem"
                                    height="1.5rem"
                                ></ActiveHeartIcon>
                            </Button>
                        ) : (
                            <HeartIcon
                                className={cx('icon')}
                                width="1.5rem"
                                height="1.5rem"
                            ></HeartIcon>
                        )}
                    </div>
                )}

                {loading ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Button className={cx('btn')}>
                        <AddToCartIcon
                            width="1.7rem"
                            height="1.7rem"
                            className={cx('icon')}
                        ></AddToCartIcon>
                    </Button>
                )}
            </div>
        );
    }

    return (
        <>
            <div
                className={cx('product-icons', className, {
                    'custom-wishlist': isWishlist,
                })}
            >
                {loadingFavorite ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy delay={[0, 150]} content="Wishlist" placement="top">
                        <div
                            className={cx('wishlist-content', {
                                'd-none': isWishlist,
                            })}
                            onClick={handleAddWishlist}
                        >
                            {liked ? (
                                <Button
                                    to={config.routes.wishlist}
                                    className={cx('btn')}
                                >
                                    <ActiveHeartIcon
                                        className={cx('icon')}
                                    ></ActiveHeartIcon>
                                </Button>
                            ) : (
                                <HeartIcon className={cx('icon')}></HeartIcon>
                            )}
                        </div>
                    </Tippy>
                )}

                {loadingCompare ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy delay={[0, 150]} content="Compare" placement="top">
                        <div
                            className={cx('compare-content', 'btn')}
                            onClick={handleAddCompare}
                        >
                            {compared ? (
                                <Button
                                    to={config.routes.compare}
                                    className={cx('btn')}
                                >
                                    <CompareFillIcon
                                        className={cx('icon')}
                                    ></CompareFillIcon>
                                </Button>
                            ) : (
                                <CompareIcon
                                    className={cx('icon')}
                                ></CompareIcon>
                            )}
                        </div>
                    </Tippy>
                )}

                {loadingQuickBuy ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy delay={[0, 150]} content="Quick Buy" placement="top">
                        <Button className={cx('btn')} onClick={handleQuickBuy}>
                            <QuickByIcon className={cx('icon')}></QuickByIcon>
                        </Button>
                    </Tippy>
                )}

                {loading ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy
                        delay={[0, 150]}
                        content="Add To Cart"
                        placement="top"
                    >
                        <Button className={cx('btn')} onClick={handleAddToCart}>
                            <AddToCartIcon
                                className={cx('icon')}
                            ></AddToCartIcon>
                        </Button>
                    </Tippy>
                )}
            </div>

            <QuickBuy
                show={showQuickBuyModal}
                showQuickBuyModal={showQuickBuyModal}
                handleShowQuickBuyModal={handleShowQuickBuyModal}
                productItem={productItem}
            ></QuickBuy>

            <div
                className={cx('compare-modal', {
                    show: showCompareModal,
                })}
            >
                <div
                    className={cx('compare-modal__overlay')}
                    onClick={() => setShowCompareModal(false)}
                ></div>
                <div className={cx('compare-modal__inner')}>
                    <Button
                        className={cx('compare-modal__close-btn')}
                        onClick={() => setShowCompareModal(false)}
                    >
                        <CloseIcon width="1.4rem" height="1.4rem"></CloseIcon>
                    </Button>
                    <p className={cx('compare-modal__desc')}>
                        You will not be allowed to compare more than 4 products
                        at a time
                    </p>
                    <Button
                        to={config.routes.compare}
                        rounded
                        primary
                        className={cx('compare-modal__view-btn')}
                    >
                        View compare
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProductIcons;
