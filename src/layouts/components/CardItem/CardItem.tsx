import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import styles from './CardItem.module.scss';
import images from '../../../assets/images';
import Image from '../../../components/Image';
import ColorItem from '../../../components/ColorItem';
import ProductIcons from '../../../components/ProductIcons';
import Badge from '../../../components/Badge';

const cx = classNames.bind(styles);

interface CardItemProps {
    className?: string;
    soldOut?: boolean;
}

const CardItem = ({ className, soldOut }: CardItemProps) => {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 575.98px)' });

    return (
        <div className={cx('card-item', className)}>
            <Link to={'#!'} className={cx('card-item__img-link')}>
                {soldOut && <Badge title="Sold Out"></Badge>}
                <Image
                    src={images.productImg}
                    alt="product"
                    className={cx('card-item__img')}
                ></Image>
                <ProductIcons
                    mobile={isMobileScreen}
                    className={cx('card-item__product-icons')}
                ></ProductIcons>
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
