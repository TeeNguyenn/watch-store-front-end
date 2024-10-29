import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import styes from './Quantity.module.scss';
import ProductModel from '../../models/ProductModel';
import * as cartItemServices from '../../services/cartItemServices';
import * as productServices from '../../services/productServices';

const cx = classNames.bind(styes);

interface QuantityProps {
    detail?: boolean;
    cart?: boolean;
    value?: string;
    className?: string;
    widthBtn: string;
    heightBtn: string;
    cartItem?: any;
    productId?: any;
    handleErrorQuantity?: (isError: boolean) => void;
    handleQuantityProduct?: (quantity: number) => void;
}

const Quantity = ({
    detail = false,
    cart = false,
    value = '',
    className,
    widthBtn,
    heightBtn,
    cartItem,
    productId,
    handleErrorQuantity = () => {},
    handleQuantityProduct = () => {},
}: QuantityProps) => {
    const [quantityInputValue, setQuantityInputValue] = useState(value || '1');
    const [changeQuantity, setChangeQuantity] = useState(value || '1');
    const cartList: any[] =
        JSON.parse(localStorage.getItem('cart_list') + '') || [];

    const currentUser = localStorage.getItem('user_id');

    const refInput = useRef<HTMLInputElement | null>(null);
    const [quantityStock, setQuantityStock] = useState(20);

    useEffect(() => {
        if (value) {
            setQuantityInputValue(value);
            setChangeQuantity(value);
        }
    }, [value]);

    useEffect(() => {
        if (productId || cartItem?.product_id) {
            const fetchApi = async () => {
                const responseData = await productServices.getProductById(
                    productId || cartItem?.product_id
                );

                setQuantityStock(responseData.quantityStock);
            };
            fetchApi();
        }
    }, []);

    // useEffect(() => {
    //     if (value) {
    //         if (!currentUser) {
    //             const newArr = cartList.map((item) => {
    //                 if (
    //                     item.product_id === cartItem?.product_id &&
    //                     item.color_id === cartItem?.color_id &&
    //                     item.screen_size_id === cartItem?.screen_size_id &&
    //                     item.material_id === cartItem?.material_id
    //                 ) {
    //                     item.quantity = quantityInputValue;
    //                 }
    //                 return item;
    //             });

    //             localStorage.setItem('cart_list', JSON.stringify(newArr));
    //             window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
    //         }
    //         handleQuantityProduct(Number.parseInt(quantityInputValue));
    //     }
    // }, [changeQuantity]);

    const handleIncreaseQuantity = () => {
        if (Number(quantityInputValue) >= quantityStock) {
            setQuantityInputValue(quantityStock + '');
            setChangeQuantity(quantityStock + '');
            return;
        } else {
            setQuantityInputValue((Number(quantityInputValue) + 1).toString());
            setChangeQuantity((Number(quantityInputValue) + 1).toString());
        }

        if (currentUser && cartItem) {
            const fetchApi = async () => {
                const res = await cartItemServices.postCartItem({
                    user_id: currentUser,
                    product_id: cartItem?.product_id,
                    color_id: cartItem?.color_id,
                    screen_size_id: cartItem?.screen_size_id,
                    material_id: cartItem?.material_id,
                    quantity: 1,
                });
                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            };

            fetchApi();
        }
    };

    const handleDecreaseQuantity = () => {
        if (Number(quantityInputValue) <= 1) {
            const fetchApi = async () => {
                const res = await cartItemServices.deleteCartItem({
                    productId: cartItem?.product_id,
                    colorId: cartItem?.color_id,
                    screenSizeId: cartItem?.screen_size_id,
                    materialId: cartItem?.material_id,
                });
                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            };
            fetchApi();
            return;
        } else {
            setQuantityInputValue((Number(quantityInputValue) - 1).toString());
            setChangeQuantity((Number(quantityInputValue) - 1).toString());
        }

        if (currentUser && cartItem) {
            const fetchApi = async () => {
                const res = await cartItemServices.putCartItem({
                    id: cartItem?.id,
                    userId: Number.parseInt(currentUser),
                    productId: cartItem?.product_id,
                    colorId: cartItem?.color_id,
                    screenSizeId: cartItem?.screen_size_id,
                    materialId: cartItem?.material_id,
                    quantity: Number(quantityInputValue) - 1,
                });

                console.log(Number(quantityInputValue) - 1);

                console.log(res.data);

                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            };
            fetchApi();
            // window.dispatchEvent(new Event('quantityChanged')); // Phát sự kiện tuỳ chỉnh
        }
    };

    const handleInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        setQuantityInputValue(quantity);
    };

    const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
        let cartQuantity = e.target.value;
        const quantity = e.target.value;
        if (Number(quantity) >= quantityStock) {
            // handleErrorQuantity(true);
            setQuantityInputValue(quantityStock + '');
            setChangeQuantity(quantityStock + '');
            cartQuantity = quantityStock + '';
        } else if (Number(quantity) <= 1) {
            // handleErrorQuantity(true);
            setQuantityInputValue('1');
            setChangeQuantity('1');

            cartQuantity = '1';
        } else {
            setQuantityInputValue(quantity);
            setChangeQuantity(quantity);
        }

        if (currentUser && cartItem) {
            const fetchApi = async () => {
                const res = cartItemServices.putCartItem({
                    id: cartItem?.id,
                    userId: Number.parseInt(currentUser),
                    productId: cartItem?.product_id,
                    colorId: cartItem?.color_id,
                    screenSizeId: cartItem?.screen_size_id,
                    materialId: cartItem?.material_id,
                    quantity: cartQuantity,
                });
            };
            fetchApi();
            // window.dispatchEvent(new Event('quantityChanged')); // Phát sự kiện tuỳ chỉnh
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
        }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let cartQuantity = quantityInputValue;
            const quantity = quantityInputValue;
            if (Number(quantity) >= quantityStock) {
                // handleErrorQuantity(true);
                setQuantityInputValue(quantityStock + '');
                setChangeQuantity(quantityStock + '');
                cartQuantity = quantityStock + '';
            } else if (Number(quantity) <= 1) {
                // handleErrorQuantity(true);
                setQuantityInputValue('1');
                setChangeQuantity('1');

                cartQuantity = '1';
            } else {
                setQuantityInputValue(quantity);
                setChangeQuantity(quantity);
            }

            if (currentUser && cartItem) {
                const fetchApi = async () => {
                    const res = cartItemServices.putCartItem({
                        id: cartItem?.id,
                        userId: Number.parseInt(currentUser),
                        productId: cartItem?.product_id,
                        colorId: cartItem?.color_id,
                        screenSizeId: cartItem?.screen_size_id,
                        materialId: cartItem?.material_id,
                        quantity: cartQuantity,
                    });

                    refInput?.current?.blur();
                };
                fetchApi();
                // window.dispatchEvent(new Event('quantityChanged')); // Phát sự kiện tuỳ chỉnh
                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            }
        }
    };

    return (
        <div className={cx('quantity__wrapper', className)}>
            <Button
                style={{ width: widthBtn, height: heightBtn }}
                className={cx('quantity__decrease-btn')}
                onClick={handleDecreaseQuantity}
            >
                -
            </Button>
            <input
                type="number"
                className={cx('quantity__input')}
                value={quantityInputValue}
                onChange={handleInputQuantity}
                onBlur={handleOnBlur}
                style={{ height: heightBtn }}
                onKeyDown={handleOnKeyDown}
                ref={refInput}
            />
            <Button
                style={{ width: widthBtn, height: heightBtn }}
                className={cx('quantity__increase-btn')}
                onClick={handleIncreaseQuantity}
            >
                +
            </Button>
        </div>
    );
};

export default Quantity;
