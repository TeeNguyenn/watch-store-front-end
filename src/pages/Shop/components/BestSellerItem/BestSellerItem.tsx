import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';

import styles from './BestSellerItem.module.scss';
import Image from '../../../../components/Image';
import { CompareIcon, HeartIcon } from '../../../../components/Icons';
import Button from '../../../../components/Button';
import { formatPrice, renderRating } from '../../../../utils/Functions';
import ColorItem from '../../../../components/ColorItem';
import ProductModel from '../../../../models/ProductModel';
import ProductImageModel from '../../../../models/ProductImageModel';
import * as productImageServices from '../../../../services/productImageServices';

const cx = classNames.bind(styles);

interface BestSellerItemProps {
    item: ProductModel;
}

const BestSellerItem = ({ item }: BestSellerItemProps) => {
    const [mainProductImageList, setMainProductImageList] = useState<
        ProductImageModel[]
    >([]);
    const [activeColor, setActiveColor] = useState(item?.colors[0].colorId);
    const [activeThumbnail, setActiveThumbnail] = useState(item?.thumbnail);

    useEffect(() => {
        const fetchApi = async () => {
            const mainProductImageData =
                await productImageServices.getMainProductImageListByProductId(
                    item!.productId
                );

            setMainProductImageList(mainProductImageData);
        };

        fetchApi();
    }, []);

    const handleMainProductImage = (colorId: number) => {
        mainProductImageList.forEach(
            (item) =>
                item.colorId === colorId && setActiveThumbnail(item.imageUrl)
        );

        setActiveColor(colorId);
    };

    return (
        <div className={cx('card')}>
            <div className={cx('card__media')}>
                <Link
                    to={`/products/${item.productId}`}
                    className={cx('card__img-wrapper')}
                >
                    <Image
                        src={activeThumbnail + ''}
                        className={cx('card__thumbnail')}
                    ></Image>
                </Link>
                <Link
                    to={`/products/${item.productId}`}
                    className={cx('card__popup')}
                >
                    <div className={cx('card__product-icons')}>
                        <div className={cx('card__product-icon-top')}>
                            <Tippy
                                delay={[0, 150]}
                                content="Compare"
                                placement="left"
                                className="card-popup-product-icon"
                            >
                                <Link
                                    to={'/'}
                                    className={cx('card__icon-wrapper')}
                                >
                                    <CompareIcon
                                        className={cx('card__icon')}
                                    ></CompareIcon>
                                </Link>
                            </Tippy>
                            <Tippy
                                delay={[0, 150]}
                                content="Wishlist"
                                placement="left"
                                className="card-popup-product-icon"
                            >
                                <div className={cx('card__icon-wrapper')}>
                                    <HeartIcon
                                        className={cx('card__icon')}
                                    ></HeartIcon>
                                </div>
                            </Tippy>
                        </div>
                        <div className={cx('card__product-icon-bottom')}>
                            <Button
                                to="#!"
                                rounded
                                primary
                                className={cx('card__btn')}
                            >
                                Quick buy
                            </Button>
                            <form>
                                <Button
                                    to="#!"
                                    rounded
                                    primary
                                    className={cx('card__btn')}
                                >
                                    Add to cart
                                </Button>
                            </form>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={cx('card__content')}>
                <p className={cx('card__caption')}>{item.category.name}</p>
                <h3>
                    <Link
                        to={`/products/${item.productId}`}
                        className={cx('card__heading')}
                    >
                        {item.title}
                    </Link>
                </h3>
                <div className={cx('card__price-container')}>
                    <div className={cx('card__price-regular-wrapper')}>
                        <p className={cx('card__price-regular')}>
                            {item!.discount
                                ? formatPrice(
                                      item!.price * (1 - item!.discount / 100)
                                  )
                                : formatPrice(item!.price)}
                        </p>
                    </div>
                    <div
                        className={cx('card__price-old-wrapper', {
                            'd-none': !item?.discount,
                        })}
                    >
                        <p className={cx('card__price-old')}>
                            {formatPrice(item!.price)}
                        </p>
                    </div>
                </div>
                <div className={cx('card__stars')}>
                    {renderRating(item.averageRate)}
                </div>
                <div className={cx('card__colors')}>
                    {item?.colors.map((colorItem, index) => (
                        <Tippy
                            key={index}
                            delay={[0, 150]}
                            content={colorItem.name}
                            placement="top"
                            className="card-color-tooltip"
                        >
                            <div>
                                <ColorItem
                                    red={colorItem.red}
                                    green={colorItem.green}
                                    blue={colorItem.blue}
                                    // alpha={colorItem.alpha}
                                    active={activeColor === colorItem.colorId}
                                    onClick={() =>
                                        handleMainProductImage(
                                            colorItem.colorId
                                        )
                                    }
                                ></ColorItem>
                            </div>
                        </Tippy>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestSellerItem;
