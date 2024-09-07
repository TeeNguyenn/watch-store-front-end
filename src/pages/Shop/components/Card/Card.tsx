import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Card.module.scss';
import Image from '../../../../components/Image';
import ColorItem from '../../../../components/ColorItem';
import { renderRating } from '../../../../utils/Functions';
import ProductIcons from '../../../../components/ProductIcons';
import Badge from '../../../../components/Badge';
import ProductModel from '../../../../models/ProductModel';
import images from '../../../../assets/images';
import { formatPrice } from '../../../../utils/Functions';
import * as feedbackServices from '../../../../services/feedbackServices';
import FeedbackModel from '../../../../models/FeedbackModel';
import ProductImageModel from '../../../../models/ProductImageModel';
import * as productImageServices from '../../../.../../../services/productImageServices';

const cx = classNames.bind(styles);

interface CardProps {
    oneProduct?: boolean;
    twoProduct?: boolean;
    threeProduct?: boolean;
    fourProduct?: boolean;
    isReview?: boolean;
    productItem?: ProductModel;
}

const Card = ({
    oneProduct,
    twoProduct,
    threeProduct,
    fourProduct,
    isReview = true,
    productItem,
}: CardProps) => {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 575.98px)' });
    const [feedbackList, setFeedbackList] = useState<FeedbackModel[]>([]);
    const [mainProductImageList, setMainProductImageList] = useState<
        ProductImageModel[]
    >([]);
    const [activeColor, setActiveColor] = useState(
        productItem?.colors[0].colorId
    );
    const [activeThumbnail, setActiveThumbnail] = useState(
        productItem?.thumbnail
    );

    useEffect(() => {
        const fetchApi = async () => {
            const feedbackData =
                await feedbackServices.getAllFeedbackByProductId(
                    productItem!.productId
                );
            const mainProductImageData =
                await productImageServices.getMainProductImageListByProductId(
                    productItem!.productId
                );

            setFeedbackList(feedbackData);
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
        <article
            className={cx('card', { col: true, card__horizontal: oneProduct })}
        >
            <div
                className={cx('card__inner', {
                    horizontal: oneProduct,
                    row: oneProduct,
                })}
            >
                <div
                    className={cx('card__media', {
                        col: oneProduct,
                        'col-4': oneProduct,
                    })}
                >
                    <Link
                        to={`/products/${productItem?.productId}`}
                        className={cx('card__thumbnail-wrapper')}
                    >
                        {productItem?.quantityStock === 0 && (
                            <Badge title="Sold Out"></Badge>
                        )}
                        {productItem?.discount && <Badge title="Sale"></Badge>}
                        <Image
                            src={activeThumbnail + ''}
                            className={cx('card__thumbnail')}
                            fallback={images.noProductImg}
                        ></Image>
                        <ProductIcons
                            mobile={isMobileScreen}
                            className={cx('card__product-icons')}
                        ></ProductIcons>
                    </Link>
                </div>
                <div
                    className={cx('card__content', {
                        col: oneProduct,
                        'col-8': oneProduct,
                    })}
                >
                    <p className={cx('card__caption')}>
                        {productItem?.category.name}
                    </p>
                    <h3>
                        <Link
                            to={`/products/${productItem?.productId}`}
                            className={cx('card__heading', {
                                'primary-hover': true,
                                'line-clamp': true,
                                modifier: fourProduct,
                                'modifier-lg': threeProduct,
                                'modifier-md': twoProduct,
                            })}
                        >
                            {productItem?.title}
                        </Link>
                    </h3>
                    <div className={cx('card__colors')}>
                        {productItem?.colors.map((colorItem, index) => (
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
                                        active={
                                            activeColor === colorItem.colorId
                                        }
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
                    <div className={cx('card__price-container')}>
                        <div className={cx('card__price-regular-wrapper')}>
                            <p className={cx('card__price-regular')}>
                                {productItem!.discount
                                    ? formatPrice(
                                          productItem!.price *
                                              (1 - productItem!.discount / 100)
                                      )
                                    : formatPrice(productItem!.price)}
                            </p>
                        </div>
                        <div
                            className={cx('card__price-old-wrapper', {
                                'd-none': !productItem?.discount,
                            })}
                        >
                            <p className={cx('card__price-old')}>
                                {formatPrice(productItem!.price)}
                            </p>
                        </div>
                    </div>
                    {isReview && (
                        <div className={cx('card__review')}>
                            <div className={cx('card__stars')}>
                                {renderRating(productItem!.averageRate)}
                            </div>
                            <p className={cx('card__review-title')}>
                                <span className={cx('card__review_count')}>
                                    {feedbackList.length}
                                </span>
                                review
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default Card;
