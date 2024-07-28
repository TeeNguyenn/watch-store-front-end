import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import styles from './HomeProduct.module.scss';
import Image from '../../../../components/Image';
import images from '../../../../assets/images/home';
import ColorItem from '../../../../components/ColorItem';
import Button from '../../../../components/Button';
import Quantity from '../../../../components/Quantity';

const cx = classNames.bind(styles);

const ImageList = [
    {
        mainImg: images.homeProductMainImg01,
        slideimg: images.homeProduct01,
    },
    {
        mainImg: images.homeProductMainImg02,
        slideimg: images.homeProduct02,
    },
    {
        mainImg: images.homeProductMainImg03,
        slideimg: images.homeProduct03,
    },
    {
        mainImg: images.homeProductMainImg04,
        slideimg: images.homeProduct04,
    },
];

const HomeProduct = () => {
    const [nav1, setNav1] = useState<any>();
    const [nav2, setNav2] = useState<any>();

    return (
        <section
            className={cx('home-product__row', {
                row: true,
                'row-cols-2': true,
                'home-product-slider': true,
            })}
        >
            <div className={cx('home-product__media')}>
                <div className="slider-container">
                    {/* Main */}
                    <Slider
                        asNavFor={nav2!}
                        ref={(slider) => setNav1(slider)}
                        arrows={false}
                    >
                        {ImageList.map((img, index) => (
                            <div
                                className={cx('home-product__img-wrapper')}
                                key={index}
                            >
                                <Image
                                    src={img.mainImg}
                                    alt="Home product image"
                                    className={cx('home-product__img')}
                                ></Image>
                            </div>
                        ))}
                    </Slider>
                    {/* Slide */}
                    <Slider
                        asNavFor={nav1!}
                        ref={(slider) => setNav2(slider)}
                        slidesToShow={3}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        arrows={false}
                    >
                        {ImageList.map((img, index) => (
                            <div
                                className={cx('home-product__slide-wrapper')}
                                key={index}
                            >
                                <Image
                                    src={img.slideimg}
                                    alt="Home product image"
                                    className={cx('home-product__slide')}
                                ></Image>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className={cx('home-product__info')}>
                <p className={cx('home-product__caption')}>SKYUP</p>
                <h1 className={cx('home-product__heading', { title: true })}>
                    Unisex Smartwatch
                </h1>
                <p className={cx('home-product__sub-title')}>
                    Our Smart wristwatch will help you stay on top of trends and
                    improve your quality of life. This next-generation wearable
                    redefines ease and connectivity like never before thanks to
                    its innovative design and state-of-the-art engineering.
                </p>
                <p className={cx('home-product__price')}>$14.3228</p>
                <div className={cx('home-product__label')}>
                    Color :
                    <p className={cx('home-product__label-text')}>
                        Wild Blue Youder
                    </p>
                </div>
                <div className={cx('home-product__colors')}>
                    <ColorItem color="#7989b8"></ColorItem>
                    <ColorItem color="#54ad68"></ColorItem>
                    <ColorItem color="#b1e0e7"></ColorItem>
                </div>
                <div className={cx('home-product__label')}>
                    Screen Size :
                    <p className={cx('home-product__label-text')}>
                        1.25 Inches
                    </p>
                </div>
                <div className={cx('home-product__sizes')}>
                    <Button
                        rounded
                        outline
                        className={cx('home-product__size-btn')}
                    >
                        1.25 Inches
                    </Button>
                    <Button
                        rounded
                        outline
                        className={cx('home-product__size-btn')}
                    >
                        1.5 Inches
                    </Button>
                    <Button
                        rounded
                        outline
                        className={cx('home-product__size-btn')}
                    >
                        1.8 Inches
                    </Button>
                </div>
                <div className={cx('home-product__label')}>
                    Strap Material :
                    <p className={cx('home-product__label-text')}>Leather</p>
                </div>
                <div className={cx('home-product__materials')}>
                    <Button
                        rounded
                        outline
                        className={cx('home-product__material-btn')}
                    >
                        1.8 Inches
                    </Button>
                </div>
                <div className={cx('home-product__buttons')}>
                    <Quantity
                        className={cx('home-product__quantity')}
                        widthBtn="55px"
                        heightBtn="55px"
                    ></Quantity>
                    <Button
                        rounded
                        primary
                        className={cx('home-product__buy-btn', {
                            disabled: true,
                        })}
                    >
                        Buy it now
                    </Button>
                </div>
                <Button
                    disabled
                    rounded
                    outline
                    className={cx('home-product__unavailable-btn')}
                >
                    Sold out
                </Button>
            </div>
        </section>
    );
};

export default HomeProduct;
