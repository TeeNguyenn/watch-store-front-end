import React from 'react';
import classNames from 'classnames/bind';
import styles from './Price.module.scss';

const cx = classNames.bind(styles);

interface PriceProps {
    className?: string;
}

const Price = ({ className }: PriceProps) => {
    return (
        <div className={cx('price')}>
            <div className={cx('price__container')}>
                <div className={cx('price__regular')}>
                    <span className={cx('price__regular-text')}>$17.8762</span>
                </div>
            </div>
        </div>
    );
};

export default Price;
