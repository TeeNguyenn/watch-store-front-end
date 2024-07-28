import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import styles from './ProductIcons.module.scss';
import { Link } from 'react-router-dom';
import {
    ActiveHeartIcon,
    AddToCartIcon,
    CompareIcon,
    HeartIcon,
    QuickByIcon,
} from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

interface ProductIconsProps {
    className?: string;
}

const ProductIcons = ({ className }: ProductIconsProps) => {
    return (
        <div className={cx('product-icons', { [className + '']: className })}>
            <Tippy delay={[0, 150]} content="Wishlist" placement="top">
                <div className={cx('wishlist-content')}>
                    <HeartIcon className={cx('icon')}></HeartIcon>
                    {/* <Link to={''}>
                        <ActiveHeartIcon
                            className={cx('icon')}
                        ></ActiveHeartIcon>
                    </Link> */}
                </div>
            </Tippy>
            <Tippy delay={[0, 150]} content="Compare" placement="top">
                <Link to={'/'} className={cx('compare-content')}>
                    <CompareIcon className={cx('icon')}></CompareIcon>
                </Link>
            </Tippy>
            <Tippy delay={[0, 150]} content="Quick Buy" placement="top">
                <Button className={cx('btn')}>
                    <QuickByIcon className={cx('icon')}></QuickByIcon>
                </Button>
            </Tippy>
            <Tippy delay={[0, 150]} content="Add To Cart" placement="top">
                <Button className={cx('btn')}>
                    <AddToCartIcon className={cx('icon')}></AddToCartIcon>
                </Button>
            </Tippy>
        </div>
    );
};

export default ProductIcons;
