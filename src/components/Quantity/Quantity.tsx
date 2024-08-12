import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import styes from './Quantity.module.scss';

const cx = classNames.bind(styes);

interface QuantityProps {
    className?: string;
    widthBtn: string;
    heightBtn: string;
    handleErrorQuantity?: (isError: boolean) => void;
}

const Quantity = ({
    className,
    widthBtn,
    heightBtn,
    handleErrorQuantity = () => {},
}: QuantityProps) => {
    const [quantityInputValue, setQuantityInputValue] = useState('1');

    const handleIncreaseQuantity = () => {
        if (Number(quantityInputValue) >= 100) {
            setQuantityInputValue('100');
        } else {
            setQuantityInputValue((Number(quantityInputValue) + 1).toString());
        }
    };

    const handleDecreaseQuantity = () => {
        if (Number(quantityInputValue) <= 1) {
            setQuantityInputValue('1');
        } else {
            setQuantityInputValue((Number(quantityInputValue) - 1).toString());
        }
    };

    const handleInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;

        setQuantityInputValue(quantity);
    };

    const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        if (Number(quantity) >= 100) {
            // handleErrorQuantity(true);
            setQuantityInputValue('100');
        } else if (Number(quantity) <= 1) {
            // handleErrorQuantity(true);
            setQuantityInputValue('1');
        } else {
            setQuantityInputValue(quantity);
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
