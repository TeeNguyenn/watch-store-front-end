import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from './Wishlist.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import Button from '../Button';
import { RemoveIcon } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faCartShopping,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ProductImageModel from '../../models/ProductImageModel';
import VariantModel from '../../models/VariantModel';
import ProductModel from '../../models/ProductModel';
import * as productServices from '../../services/productServices';
import Price from '../Price';
import * as favoriteServices from '../../services/favoriteServices';
import { CartContext } from '../../contexts/CartContext';
import * as cartItemServices from '../../services/cartItemServices';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

interface WishlistItemProps {
    wishlistItem: any;
    handleChangeWishlist: any;
    className?: string;
}

const WishlistItem = ({
    className,
    wishlistItem,
    handleChangeWishlist,
}: WishlistItemProps) => {
    const [showDropdownVariant, setShowDropdownVariant] = useState(false);
    // const [showMobileDropdownVariant, setShowMobileDropdownVariant] =
    //     useState(false);
    const [activeColor, setActiveColor] = useState<number | undefined>();
    const [tempColor, setTempColor] = useState<number | undefined>();

    const [activeSize, setActiveSize] = useState<number | undefined>();
    const [tempSize, setTempSize] = useState<number | undefined>();

    const [activeMaterial, setActiveMaterial] = useState<number | undefined>();
    const [tempMaterial, setTempMaterial] = useState<number | undefined>();

    const [productDetail, setProductDetail] = useState<ProductModel>();
    const currentUser = localStorage.getItem('user_id');
    const [imageList, setImageList] = useState<ProductImageModel[] | any>([]);

    const [sizeList, setSizeList] = useState<VariantModel[] | undefined>([]);
    const [tempSizeList, setTempSizeList] = useState<
        VariantModel[] | undefined
    >([]);
    const [materialList, setMaterialList] = useState<
        VariantModel[] | undefined
    >([]);
    const [tempMaterialList, setTempMaterialList] = useState<
        VariantModel[] | undefined
    >([]);
    const [loadingCart, setLoadingCart] = useState(false);
    const context = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const responseData = await productServices.getProductById(
                wishlistItem.productId
            );

            setProductDetail(responseData);
            setActiveColor(wishlistItem.colorId);
            setTempColor(wishlistItem.colorId);

            const Arr: VariantModel[] | undefined =
                responseData?.variants?.filter(
                    (variant) => variant.color.colorId === wishlistItem.colorId
                );

            const result: VariantModel[] | undefined = [];

            Arr?.forEach((sizeItem) => {
                let count = 0;
                for (let index = 0; index < result.length; index++) {
                    if (
                        sizeItem.screenSize.sizeId ===
                        result[index].screenSize.sizeId
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
            setSizeList(sortResult);
            setTempSizeList(sortResult);
            setActiveSize(wishlistItem.screenSizeId);
            setTempSize(wishlistItem.screenSizeId);

            const output: VariantModel[] | undefined = [];

            Arr?.forEach((materialItem) => {
                let count = 0;
                for (let index = 0; index < output.length; index++) {
                    if (
                        materialItem.material.materialId ===
                        output[index].material.materialId
                    ) {
                        count++;
                        break;
                    }
                }
                if (count === 0) {
                    output.push(materialItem);
                }
            });

            const sortOutput = output.sort(
                (a: any, b: any) =>
                    a.material.materialId - b.material.materialId
            );
            setMaterialList(sortOutput);
            setTempMaterialList(sortOutput);
            setActiveMaterial(wishlistItem.materialId);
            setTempMaterial(wishlistItem.materialId);

            setImageList(
                responseData?.productImages.filter(
                    (item) => item.colorId === wishlistItem.colorId
                )
            );
        };
        fetchApi();
    }, []);

    const handleSelectColor = (colorId: number, isConfirm: boolean = false) => {
        setTempColor(colorId);

        const Arr: VariantModel[] | undefined = productDetail?.variants?.filter(
            (variant) => variant.color.colorId === colorId
        );

        const result: VariantModel[] | undefined = [];

        Arr?.forEach((sizeItem) => {
            let count = 0;
            for (let index = 0; index < result.length; index++) {
                if (
                    sizeItem.screenSize.sizeId ===
                    result[index].screenSize.sizeId
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

        setTempSizeList(sortResult);

        if (!isConfirm) {
            setTempSize(sortResult.at(0)?.screenSize.sizeId);
        }

        const output: VariantModel[] | undefined = [];

        Arr?.forEach((materialItem) => {
            let count = 0;
            for (let index = 0; index < output.length; index++) {
                if (
                    materialItem.material.materialId ===
                    output[index].material.materialId
                ) {
                    count++;
                    break;
                }
            }
            if (count === 0) {
                output.push(materialItem);
            }
        });

        const sortOutput = output.sort(
            (a: any, b: any) => a.material.materialId - b.material.materialId
        );

        setTempMaterialList(sortOutput);

        if (!isConfirm) {
            setTempMaterial(sortOutput.at(0)?.material.materialId);
        }
    };

    const handleConfirm = () => {
        const newArr = productDetail?.productImages.filter(
            (item: ProductImageModel) => item.colorId === tempColor
        );
        setImageList(newArr);

        const wishlist: any[] =
            JSON.parse(localStorage.getItem('wishlist') + '') || [];

        if (!currentUser) {
            setLoading(true);
            const newArr = wishlist.map((item) => {
                if (
                    item.product_id === productDetail?.productId &&
                    item.color_id === activeColor &&
                    item.screen_size_id === activeSize &&
                    item.material_id === activeMaterial
                ) {
                    item.product_id = productDetail?.productId;
                    item.color_id = tempColor;
                    item.screen_size_id = tempSize;
                    item.material_id = tempMaterial;
                }
                return item;
            });
            localStorage.setItem('wishlist', JSON.stringify(newArr));
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            setTimeout(() => {
                setLoading(false);
            }, 300);
        } else {
            const fetchApi = async () => {
                setLoading(true);
                const resData = await favoriteServices.getFavoriteByUserId();

                // Lay ra item mà đang có variant giống variant đang active
                const putFavoriteItem = resData.result.filter((item) => {
                    return (
                        item.productId === productDetail?.productId &&
                        item.colorId === activeColor &&
                        item.screenSizeId === activeSize &&
                        item.materialId === activeMaterial
                    );
                });

                if (putFavoriteItem.length > 0) {
                    const res = await favoriteServices.putFavorite({
                        productId: productDetail?.productId,
                        colorId: tempColor,
                        screenSizeId: tempSize,
                        materialId: tempMaterial,
                        id: putFavoriteItem?.at(0)?.favoriteId,
                    });
                }
                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            };
            fetchApi();
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }

        setActiveColor(tempColor);
        setActiveSize(tempSize);
        setActiveMaterial(tempMaterial);
        setShowDropdownVariant(false);
        // setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(tempColor + '')), true);
    };

    const handleCancel = () => {
        const newArr = productDetail?.productImages.filter(
            (item: ProductImageModel) => item.colorId === activeColor
        );
        setImageList(newArr);
        setTempColor(activeColor);
        setTempSize(activeSize);
        setTempMaterial(activeMaterial);
        setShowDropdownVariant(false);
        // setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(activeColor + '')), true);
    };

    const handleOutSide = () => {
        setTempColor(activeColor);
        setTempSize(activeSize);
        setTempMaterial(activeMaterial);
        setShowDropdownVariant(false);
        // setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(activeColor + '')), true);
    };

    const handleRemoveCartItem = () => {
        if (!currentUser) {
            const wishlist: any[] =
                JSON.parse(localStorage.getItem('wishlist') + '') || [];

            const index = wishlist.findIndex(
                (item) =>
                    item.product_id === wishlistItem?.productId &&
                    item.color_id === wishlistItem?.colorId &&
                    item.screen_size_id === wishlistItem.screenSizeId &&
                    item.material_id === wishlistItem.materialId
            );
            if (index !== -1) {
                wishlist.splice(index, 1);
            }
            handleChangeWishlist(wishlist);
            // window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
        } else {
            const fetchApi = async () => {
                const res = await favoriteServices.deleteFavorite({
                    userId: Number.parseInt(currentUser + ''),
                    productId: wishlistItem?.productId,
                    colorId: wishlistItem?.colorId,
                    screenSizeId: wishlistItem.screenSizeId,
                    materialId: wishlistItem.materialId,
                });
            };
            fetchApi();
            handleChangeWishlist([], true);
        }
    };

    const handleAddToCart = () => {
        const cartList: any[] =
            JSON.parse(localStorage.getItem('cart_list') + '') || [];

        if (!currentUser) {
            setLoadingCart(true);
            let isExist = false;
            const newArr = cartList.map((item) => {
                if (
                    item.product_id === productDetail?.productId &&
                    item.color_id === activeColor &&
                    item.screen_size_id === activeSize &&
                    item.material_id === activeMaterial
                ) {
                    item.quantity++;
                    isExist = true;
                }
                return item;
            });
            if (isExist) {
                localStorage.setItem('cart_list', JSON.stringify(newArr));
            } else {
                const newCartList = [
                    {
                        product_id: productDetail?.productId,
                        color_id: activeColor,
                        screen_size_id: activeSize,
                        material_id: activeMaterial,
                        quantity: 1,
                    },
                    ...cartList,
                ];
                localStorage.setItem('cart_list', JSON.stringify(newCartList));
            }
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            setTimeout(() => {
                setLoadingCart(false);
                context?.handleCart();
            }, 300);
        } else {
            setLoadingCart(true);
            const fetchApi = async () => {
                const resData = await cartItemServices.getCartItemByUserId();
                const cartItem = resData.filter(
                    (item: any) =>
                        item.product_id === productDetail?.productId &&
                        item.color_id === activeColor &&
                        item.screen_size_id === activeSize &&
                        item.material_id === activeMaterial
                );
                if (cartItem.length > 0) {
                    const res = await cartItemServices.putCartItem({
                        productId: productDetail?.productId,
                        colorId: activeColor,
                        screenSizeId: activeSize,
                        materialId: activeMaterial,
                        quantity: cartItem.at(0).quantity + 1,
                        id: cartItem.at(0).id,
                    });
                } else {
                    const res = await cartItemServices.postCartItem({
                        product_id: productDetail?.productId,
                        color_id: activeColor,
                        screen_size_id: activeSize,
                        material_id: activeMaterial,
                        quantity: 1,
                    });
                }
                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            };
            fetchApi();

            setTimeout(() => {
                context?.handleCart();
                setLoadingCart(false);
                return;
            }, 500);
        }
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <tr className={cx('', className)}>
            <td className={cx('wishlist__media')}>
                <div className={cx('wishlist__img-wrapper')}>
                    <Image
                        src={imageList?.at(0)?.imageUrl}
                        alt="image"
                        loading={'lazy'}
                        className={cx('wishlist__img')}
                    ></Image>
                </div>
            </td>
            <td className={cx('wishlist__product')}>
                <Link
                    to={`/products/${productDetail?.productId}`}
                    className={cx('wishlist__link', {
                        'line-clamp': true,
                        'line-clamp-1': true,
                    })}
                >
                    {productDetail?.title}
                </Link>
            </td>
            <td
                className={cx('wishlist__variant')}
                style={{
                    width: '20%',
                    minWidth: '220px',
                }}
            >
                <Tippy
                    visible={showDropdownVariant}
                    interactive
                    delay={[0, 300]}
                    offset={[0, 50]}
                    placement="bottom"
                    onClickOutside={handleOutSide}
                    render={(attrs) => (
                        <div className={cx('variant__container')}>
                            {/* Color */}
                            <div className={cx('variant__group')}>
                                <p className={cx('variant__label')}>Color:</p>
                                {productDetail?.colors.map((colorItem) => (
                                    <Button
                                        key={colorItem.colorId}
                                        className={cx('variant__select-btn', {
                                            active:
                                                tempColor === colorItem.colorId,
                                        })}
                                        onClick={() =>
                                            handleSelectColor(colorItem.colorId)
                                        }
                                    >
                                        {colorItem.name}
                                    </Button>
                                ))}
                            </div>
                            {/* Screen size */}
                            <div className={cx('variant__group')}>
                                <p className={cx('variant__label')}>
                                    Screen size:
                                </p>
                                {tempSizeList?.map((sizeItem) => (
                                    <Button
                                        key={sizeItem.screenSize.sizeId}
                                        className={cx('variant__select-btn', {
                                            active:
                                                sizeItem.screenSize.sizeId ===
                                                tempSize,
                                        })}
                                        onClick={() =>
                                            setTempSize(
                                                sizeItem.screenSize.sizeId
                                            )
                                        }
                                    >
                                        {`${sizeItem.screenSize.size} Inches`}
                                    </Button>
                                ))}
                            </div>
                            {/* Material */}
                            <div className={cx('variant__group')}>
                                <p className={cx('variant__label')}>
                                    Material:
                                </p>
                                {tempMaterialList?.map((materialItem) => (
                                    <Button
                                        key={materialItem.material.materialId}
                                        className={cx('variant__select-btn', {
                                            active:
                                                materialItem.material
                                                    .materialId ===
                                                tempMaterial,
                                        })}
                                        onClick={() =>
                                            setTempMaterial(
                                                materialItem.material.materialId
                                            )
                                        }
                                    >
                                        {materialItem.material.name + ''}
                                    </Button>
                                ))}
                            </div>
                            <div className={cx('variant__bottom')}>
                                <Button
                                    className={cx('variant__cancel-btn')}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    primary
                                    className={cx('variant__confirm-btn')}
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    <div
                        className={cx('wishlist__variant-top', {
                            active: showDropdownVariant,
                        })}
                        onClick={() =>
                            setShowDropdownVariant(!showDropdownVariant)
                        }
                    >
                        <p className={cx('wishlist__variant-label')}>
                            Product Classification:
                        </p>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </Tippy>

                <div className={cx('cart-item__options')}>
                    <div className={cx('cart-item__option')}>
                        {productDetail?.colors.map(
                            (item) => item.colorId === activeColor && item.name
                        )}
                    </div>
                    <div className={cx('cart-item__option')}>
                        {productDetail?.screenSizes?.map(
                            (item) =>
                                item.sizeId === activeSize &&
                                item.size + ' Inches'
                        )}
                    </div>
                    <div className={cx('cart-item__option')}>
                        {productDetail?.materials?.map(
                            (item) =>
                                item.materialId === activeMaterial && item.name
                        )}
                    </div>
                </div>
            </td>

            <td className={cx('wishlist__price')}>
                <Price
                    price={productDetail?.price}
                    discount={productDetail?.discount}
                    noBadge
                ></Price>
            </td>
            <td className={cx('wishlist__options')}>
                <div className={cx('wishlist__option-wrapper')}>
                    <Button
                        className={cx('wishlist__trash-can')}
                        onClick={handleRemoveCartItem}
                    >
                        <RemoveIcon width="1.8rem" height="1.8rem"></RemoveIcon>
                    </Button>
                    <Button
                        className={cx('wishlist__add-cart')}
                        leftIcon={
                            !loadingCart && (
                                <FontAwesomeIcon icon={faCartShopping} />
                            )
                        }
                        onClick={handleAddToCart}
                    >
                        {loadingCart ? (
                            <Button className={cx('loading')}>
                                <FontAwesomeIcon icon={faSpinner} />
                            </Button>
                        ) : (
                            'Add to cart'
                        )}
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default WishlistItem;
