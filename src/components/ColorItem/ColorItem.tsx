import React from 'react';
import classNames from 'classnames/bind';
import styles from './ColorItem.module.scss';

const cx = classNames.bind(styles);

interface ColorItemProps {
    color: string;
}

const ColorItem = ({ color }: ColorItemProps) => {
    return (
        <div
            className={cx('color-item')}
            style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: color,
            }}
        ></div>
    );
};

export default ColorItem;
