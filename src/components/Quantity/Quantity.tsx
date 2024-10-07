import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import styes from './Quantity.module.scss';
import ProductModel from '../../models/ProductModel';
import * as cartItemServices from '../../services/cartItemServices';

const cx = classNames.bind(styes);

interface QuantityProps {
    detail?: boolean;
    cart?: boolean;
    value?: string;
    className?: string;
    widthBtn: string;
    heightBtn: string;
    cartItem?: any;
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
    handleErrorQuantity = () => {},
    handleQuantityProduct = () => {},
}: QuantityProps) => {
    const [quantityInputValue, setQuantityInputValue] = useState(value || '1');
    const [changeQuantity, setChangeQuantity] = useState(value || '1');
    const cartList: any[] =
        JSON.parse(localStorage.getItem('cart_list') + '') || [];

    const currentUser = localStorage.getItem('user_id');

    useEffect(() => {
        if (value) {
            setQuantityInputValue(value);
            setChangeQuantity(value);
        }
    }, [value]);

    useEffect(() => {
        if (value) {
            if (!currentUser) {
                const newArr = cartList.map((item) => {
                    if (
                        item.product_id === cartItem?.product_id &&
                        item.color_id === cartItem?.color_id &&
                        item.screen_size_id === cartItem?.screen_size_id &&
                        item.material_id === cartItem?.material_id
                    ) {
                        item.quantity = quantityInputValue;
                    }
                    return item;
                });

                localStorage.setItem('cart_list', JSON.stringify(newArr));
                window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            }
            handleQuantityProduct(Number.parseInt(quantityInputValue));
        }
    }, [changeQuantity]);

    const handleIncreaseQuantity = () => {
        if (Number(quantityInputValue) >= 100) {
            setQuantityInputValue('100');
            setChangeQuantity('100');
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
            };

            fetchApi();
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
        }
    };

    const handleDecreaseQuantity = () => {
        if (Number(quantityInputValue) <= 1) {
            setQuantityInputValue('1');
            setChangeQuantity('1');
            return;
        } else {
            setQuantityInputValue((Number(quantityInputValue) - 1).toString());
            setChangeQuantity((Number(quantityInputValue) - 1).toString());
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
                    quantity: Number(quantityInputValue) - 1,
                });
            };
            fetchApi();
            // window.dispatchEvent(new Event('quantityChanged')); // Phát sự kiện tuỳ chỉnh
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
        }
    };

    const handleInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        setQuantityInputValue(quantity);
    };

    const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
        let cartQuantity = e.target.value;
        const quantity = e.target.value;
        if (Number(quantity) >= 100) {
            // handleErrorQuantity(true);
            setQuantityInputValue('100');
            setChangeQuantity('100');
            cartQuantity = '100';
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
