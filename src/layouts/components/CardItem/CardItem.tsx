import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CardItem.module.scss';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import ColorItem from '../../../components/ColorItem';
import ProductIcons from '../../../components/ProductIcons';

const cx = classNames.bind(styles);

const CardItem = () => {
    return (
        <div className={cx('card-item', { col: true })}>
            <Link to={'#!'} className={cx('card-item__img-link')}>
                <Image
                    src={images.productImg}
                    alt="product"
                    className={cx('card-item__img')}
                ></Image>
                <ProductIcons className={cx('show')}></ProductIcons>
            </Link>
            <div className={cx('card-item__body')}>
                <h3>
                    <Link className={cx('card-item__name')} to={'#!'}>
                        Fitness Tracker Watch
                    </Link>
                </h3>
                <div className={cx('color-list')}>
                    <ColorItem color="#1d6241"></ColorItem>
                    <ColorItem color="#1d6241"></ColorItem>
                    <ColorItem color="#1d6241"></ColorItem>
                </div>
                <span className={cx('card-item__price')}>$30</span>
            </div>
        </div>
    );
};

export default CardItem;
