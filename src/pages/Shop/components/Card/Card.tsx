import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Card.module.scss';
import Image from '../../../../components/Image';
import cardImages from '../../../../assets/images/shop/card';
import ColorItem from '../../../../components/ColorItem';
import { renderRating } from '../../../../utils/Functions';
import ProductIcons from '../../../../components/ProductIcons';
import Badge from '../../../../components/Badge';

const cx = classNames.bind(styles);

interface CardProps {
    SoldOut?: boolean;
    Sale?: boolean;
    oneProduct?: boolean;
}

const Card = ({ SoldOut, Sale, oneProduct }: CardProps) => {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 575.98px)' });

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
                    <Link to={'#!'} className={cx('card__thumbnail-wrapper')}>
                        {SoldOut && <Badge title="Sold Out"></Badge>}
                        {Sale && <Badge title="Sale"></Badge>}
                        <Image
                            src={cardImages.CardItem1}
                            className={cx('card__thumbnail')}
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
                    <p className={cx('card__caption')}>Sennheiser</p>
                    <h3>
                        <Link
                            to={'#!'}
                            className={cx('card__heading', {
                                'primary-hover': true,
                            })}
                        >
                            Analog Wrist Watch
                        </Link>
                    </h3>
                    <div className={cx('card__colors')}>
                        <Tippy
                            delay={[0, 150]}
                            content="Aqua Island"
                            placement="top"
                            className="card-color-tooltip"
                        >
                            <div>
                                <ColorItem color="#a0dad6"></ColorItem>
                            </div>
                        </Tippy>
                        <Tippy
                            delay={[0, 150]}
                            content="Aqua Island"
                            placement="top"
                            className="card-color-tooltip"
                        >
                            <div>
                                <ColorItem color="#a0dad6"></ColorItem>
                            </div>
                        </Tippy>
                        <Tippy
                            delay={[0, 150]}
                            content="Aqua Island"
                            placement="top"
                            className="card-color-tooltip"
                        >
                            <div>
                                <ColorItem color="#a0dad6"></ColorItem>
                            </div>
                        </Tippy>
                    </div>
                    <div className={cx('card__price-container')}>
                        <div className={cx('card__price-regular-wrapper')}>
                            <p className={cx('card__price-regular')}>$17.866</p>
                        </div>
                        {Sale && (
                            <div className={cx('card__price-old-wrapper')}>
                                <p className={cx('card__price-old')}>
                                    $29.7784
                                </p>
                            </div>
                        )}
                    </div>
                    <div className={cx('card__review')}>
                        <div className={cx('card__stars')}>
                            {renderRating(4)}
                        </div>
                        <p className={cx('card__review-title')}>
                            <span className={cx('card__review_count')}>1</span>
                            review
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Card;
