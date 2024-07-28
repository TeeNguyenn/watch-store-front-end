import React from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import Image from '../../../components/Image';
import images from '../../../assets/images';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import Button from '../../../components/Button';
import styles from './SlideShow.module.scss';

const cx = classNames.bind(styles);

const SlideShow = () => {
    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        prevArrow: <PrevArrow></PrevArrow>,
        nextArrow: <NextArrow></NextArrow>,
    };

    return (
        <div className={cx('slide-show', { 'slide-show-header': true })}>
            <Slider {...settings}>
                <div>
                    <Image
                        src={images.slider1}
                        alt="Slide show image"
                        className={cx('slide-show__img')}
                    ></Image>
                    <div className={cx('slide-show__content-wrapper')}>
                        <div className={cx('slide-show__content')}>
                            <h2
                                className={cx('slide-show__heading', {
                                    'banner-heading': true,
                                })}
                            >
                                Tech at Hand
                            </h2>
                            <p
                                className={cx('slide-show__text', {
                                    'banner-text': true,
                                })}
                            >
                                Proin nibh nisl condimentum id venenatis a
                                condimentum.
                            </p>
                            <Button
                                to="#!"
                                rounded
                                primary
                                className={cx('slide-show__btn', {
                                    'banner-btn': true,
                                })}
                            >
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src={images.slider2}
                        alt="Slide show image"
                        className={cx('slide-show__img')}
                    ></Image>
                    <div className={cx('slide-show__content-wrapper')}>
                        <div className={cx('slide-show__content')}>
                            <h2
                                className={cx('slide-show__heading', {
                                    'banner-heading': true,
                                })}
                            >
                                Style Meets Tech
                            </h2>
                            <p
                                className={cx('slide-show__text', {
                                    'banner-text': true,
                                })}
                            >
                                Tortor dignissim convallis aenean et Viverra
                                justo nec ultrice.
                            </p>
                            <Button
                                to="#!"
                                rounded
                                primary
                                className={cx('slide-show__btn', {
                                    'banner-btn': true,
                                })}
                            >
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src={images.slider3}
                        alt="Slide show image"
                        className={cx('slide-show__img')}
                    ></Image>
                    <div className={cx('slide-show__content-wrapper')}>
                        <div className={cx('slide-show__content')}>
                            <h2
                                className={cx('slide-show__heading', {
                                    'banner-heading': true,
                                })}
                            >
                                Trendy Tech Gear
                            </h2>
                            <p
                                className={cx('slide-show__text', {
                                    'banner-text': true,
                                })}
                            >
                                Eleifend quam adipiscing vitae proin sagittis
                                nisl rhoncus mattis.
                            </p>
                            <Button
                                to="#!"
                                rounded
                                primary
                                className={cx('slide-show__btn', {
                                    'banner-btn': true,
                                })}
                            >
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default SlideShow;