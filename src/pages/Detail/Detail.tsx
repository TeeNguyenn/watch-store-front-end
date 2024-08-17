import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import Button from '../../components/Button';
import styles from './Detail.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import images from '../../assets/images/home';
import Image from '../../components/Image';
import { renderRating } from '../../utils/Functions';
import Price from '../../components/Price';
import Quantity from '../../components/Quantity';
import {
    CompareIcon,
    DeliveryIcon,
    HeartIcon,
    NextIcon,
    ShareIcon,
    ShippingDetailIcon,
    ShippingIcon,
    ZoomInIcon,
} from '../../components/Icons';
import Review from './components/Review';
import Card from '../Shop/components/Card';
import { imageMagnifier } from '../../utils/Functions';

const cx = classNames.bind(styles);

const Detail = () => {
    // fake breadcrum links
    const links = ['All', 'Bluetooth Calling Watch'];

    //fake product imgs
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
        {
            mainImg: images.homeProductMainImg02,
            slideimg: images.homeProduct02,
        },
        {
            mainImg: images.homeProductMainImg03,
            slideimg: images.homeProduct03,
        },
    ];

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 991.98,
                settings: {
                    slidesToShow: 2,
                },
            },
            // {
            //     breakpoint: 767.98,
            //     settings: {
            //         slidesToShow: 2,
            //     },
            // },
        ],
    };

    // Slider
    const [nav1, setNav1] = useState<any>();
    const [nav2, setNav2] = useState<any>();

    const [showProductDetail, setShowProductDetail] = useState<number[]>([]);

    const handleShowProductDetail = (num: number) => {
        if (showProductDetail.includes(num)) {
            const newArray = showProductDetail.filter(
                (item, index) => item !== num
            );
            setShowProductDetail(newArray);
        } else {
            setShowProductDetail([...showProductDetail, num]);
        }
    };

    useEffect(() => {
        imageMagnifier(
            '.product-detail-slider .slick-slider:first-child .product-detail-slider__img-wrapper',
            200
        );
    }, []);

    return (
        <div
            className={cx('', {
                'container-spacing': true,
                'product-detail-slider': true,
            })}
        >
            <Breadcrumb
                title="Bluetooth Calling Watch"
                links={links}
            ></Breadcrumb>
            <div
                className={cx('product-detail__row', {
                    row: true,
                    'row-cols-2': true,
                    'row-cols-lg-1': true,
                })}
            >
                {/* Media */}
                <div className={cx('', { col: true })}>
                    <section className={cx('product-detail__media-wrapper')}>
                        <div className={cx('product-detail__media')}>
                            <div className="slider-container">
                                {/* Main */}
                                <Slider
                                    asNavFor={nav2!}
                                    ref={(slider) => setNav1(slider)}
                                    arrows={true}
                                    speed={0}
                                >
                                    {ImageList.map((img, index) => (
                                        <div
                                            className={cx(
                                                'product-detail__img-wrapper',
                                                {
                                                    'product-detail-slider__img-wrapper':
                                                        true,
                                                }
                                            )}
                                            key={index}
                                        >
                                            <Image
                                                src={img.mainImg}
                                                alt="Product detail image"
                                                className={cx(
                                                    'product-detail__img'
                                                )}
                                            ></Image>
                                        </div>
                                    ))}
                                </Slider>
                                {/* Slide */}
                                <Slider
                                    asNavFor={nav1!}
                                    ref={(slider) => setNav2(slider)}
                                    slidesToShow={6}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    arrows={false}
                                >
                                    {ImageList.map((img, index) => (
                                        <div
                                            className={cx(
                                                'product-detail__slide-wrapper'
                                            )}
                                            key={index}
                                        >
                                            <Image
                                                src={img.mainImg}
                                                alt="Home product image"
                                                className={cx(
                                                    'product-detail__slide'
                                                )}
                                            ></Image>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            {/* Go here */}
                            <div className={cx('product-detail__actions')}>
                                <ul
                                    className={cx(
                                        'product-detail__actions-list'
                                    )}
                                >
                                    <li>
                                        <Button
                                            className={cx(
                                                'product-detail__actions-item'
                                            )}
                                        >
                                            <HeartIcon></HeartIcon>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            className={cx(
                                                'product-detail__actions-item'
                                            )}
                                        >
                                            <ZoomInIcon></ZoomInIcon>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                {/* Content */}
                <div className={cx('', { col: true })}>
                    <section className={cx('product-detail__content')}>
                        <div>
                            <h1 className={cx('product-detail__title')}>
                                Analog Wrist Watch
                            </h1>
                        </div>
                        <div className={cx('product-detail__review')}>
                            <div className={cx('product-detail__stars')}>
                                {renderRating(4)}
                            </div>
                            <span
                                className={cx(
                                    'product-detail__review-quantity'
                                )}
                            >
                                1 review
                            </span>
                        </div>
                        <p className={cx('product-detail__text')}>
                            Our Smart wristwatch will help you stay on top of
                            trends and improve your quality of life. This
                            next-generation wearable redefines ease and
                            connectivity like never before thanks to its
                            innovative design and state-of-the-art engineering.
                        </p>
                        <Price></Price>
                        <div className={cx('product-detail__advance-style')}>
                            {/* Color */}
                            <div className={cx('product-detail__group')}>
                                <div className={cx('product-detail__label')}>
                                    <p
                                        className={cx(
                                            'product-detail__label-text'
                                        )}
                                    >
                                        Color:
                                    </p>
                                    <p
                                        className={cx(
                                            'product-detail__color-label'
                                        )}
                                    >
                                        Dark Lavender
                                    </p>
                                </div>
                                <div
                                    className={cx('product-detail__color-list')}
                                >
                                    <div
                                        className={cx(
                                            'product-detail__color-item'
                                        )}
                                    >
                                        <Image
                                            className={cx(
                                                'product-detail__color-img'
                                            )}
                                            src="https://i5.walmartimages.com/asr/ace9b62f-e4c0-44c4-80db-0205427505fa.89d492eade28037894e22f6bb4637519.png?odnHeight=50&odnWidth=50&odnBg=FFFFFF"
                                        ></Image>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__color-item'
                                        )}
                                    >
                                        <Image
                                            className={cx(
                                                'product-detail__color-img'
                                            )}
                                            src="https://i5.walmartimages.com/asr/ace9b62f-e4c0-44c4-80db-0205427505fa.89d492eade28037894e22f6bb4637519.png?odnHeight=50&odnWidth=50&odnBg=FFFFFF"
                                        ></Image>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__color-item'
                                        )}
                                    >
                                        <Image
                                            className={cx(
                                                'product-detail__color-img'
                                            )}
                                            src="https://i5.walmartimages.com/asr/ace9b62f-e4c0-44c4-80db-0205427505fa.89d492eade28037894e22f6bb4637519.png?odnHeight=50&odnWidth=50&odnBg=FFFFFF"
                                        ></Image>
                                    </div>
                                </div>
                            </div>
                            {/* Screen */}
                            <div className={cx('product-detail__group')}>
                                <div className={cx('product-detail__label')}>
                                    <p
                                        className={cx(
                                            'product-detail__label-text'
                                        )}
                                    >
                                        Screen Size:
                                    </p>
                                    <p
                                        className={cx(
                                            'product-detail__color-label'
                                        )}
                                    >
                                        1.5 Inches
                                    </p>
                                </div>
                                <div
                                    className={cx('product-detail__size-list')}
                                >
                                    <Button
                                        rounded
                                        className={cx(
                                            'product-detail__option-btn'
                                        )}
                                    >
                                        1.5 Inches
                                    </Button>
                                    <Button
                                        rounded
                                        className={cx(
                                            'product-detail__option-btn'
                                        )}
                                    >
                                        1.8 Inches
                                    </Button>
                                </div>
                            </div>
                            {/* Material */}
                            <div className={cx('product-detail__group')}>
                                <div className={cx('product-detail__label')}>
                                    <p
                                        className={cx(
                                            'product-detail__label-text'
                                        )}
                                    >
                                        Strap Material:
                                    </p>
                                    <p
                                        className={cx(
                                            'product-detail__color-label'
                                        )}
                                    >
                                        Leather
                                    </p>
                                </div>
                                <div
                                    className={cx(
                                        'product-detail__material-list'
                                    )}
                                >
                                    <Button
                                        rounded
                                        className={cx(
                                            'product-detail__option-btn'
                                        )}
                                    >
                                        Leather
                                    </Button>
                                    <Button
                                        rounded
                                        className={cx(
                                            'product-detail__option-btn'
                                        )}
                                    >
                                        Rubber
                                    </Button>
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className={cx('product-detail__group')}>
                                <div
                                    className={cx(
                                        'product-detail__product-form'
                                    )}
                                >
                                    <div
                                        className={cx(
                                            'product-detail__buttons'
                                        )}
                                    >
                                        <Quantity
                                            widthBtn="55px"
                                            heightBtn="55px"
                                            className={cx(
                                                'product-detail__quantity-btn'
                                            )}
                                        ></Quantity>
                                        <Button
                                            primary
                                            rounded
                                            className={cx(
                                                'product-detail__add-btn'
                                            )}
                                        >
                                            Add to cart
                                        </Button>
                                        <Button
                                            className={cx(
                                                'product-detail__btn',
                                                { 'primary-hover': true }
                                            )}
                                        >
                                            <HeartIcon></HeartIcon>
                                        </Button>
                                        <Button
                                            className={cx(
                                                'product-detail__btn',
                                                { 'primary-hover': true }
                                            )}
                                        >
                                            <CompareIcon></CompareIcon>
                                        </Button>
                                    </div>
                                    <Button
                                        to="#!"
                                        rounded
                                        primary
                                        className={cx(
                                            'product-detail__buy-btn'
                                        )}
                                    >
                                        Buy it now
                                    </Button>
                                    <Button
                                        className={cx(
                                            'product-detail__share-btn',
                                            {
                                                'primary-hover': true,
                                            }
                                        )}
                                        leftIcon={<ShareIcon></ShareIcon>}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                            {/* Delivery */}
                            <div className={cx('product-detail__section')}>
                                <p className={cx('product-detail__delivery')}>
                                    <DeliveryIcon></DeliveryIcon>
                                    <span
                                        className={cx(
                                            'product-detail__delivery-label'
                                        )}
                                    >
                                        Estimated delivery:
                                    </span>
                                    <span
                                        className={cx(
                                            'product-detail__delivery-desc'
                                        )}
                                    >
                                        <strong>12-26 days </strong>
                                        (International),
                                        <strong>3-6 days </strong>
                                        (United States).
                                    </span>
                                </p>
                            </div>
                            {/* Shipping */}
                            <div className={cx('product-detail__section')}>
                                <p className={cx('product-detail__shipping')}>
                                    <ShippingDetailIcon></ShippingDetailIcon>
                                    <span
                                        className={cx(
                                            'product-detail__shipping-label'
                                        )}
                                    >
                                        Return within
                                    </span>
                                    <span
                                        className={cx(
                                            'product-detail__shipping-desc'
                                        )}
                                    >
                                        <strong>45 days </strong>
                                        of purchase. Duties & taxes are
                                        non-refundable.
                                    </span>
                                </p>
                            </div>
                            {/* Payment */}
                            <div className={cx('product-detail__payment')}>
                                <p
                                    className={cx(
                                        'product-detail__payment-label'
                                    )}
                                >
                                    Guarantee safe and secure checkout
                                </p>
                                <div
                                    className={cx(
                                        'product-detail__payment-list'
                                    )}
                                >
                                    <div
                                        className={cx(
                                            'product-detail__payment-item'
                                        )}
                                    >
                                        <svg
                                            viewBox="0 0 38 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            width="55"
                                            height="30"
                                            aria-labelledby="pi-visa"
                                        >
                                            <title id="pi-visa">Visa</title>
                                            <path
                                                opacity=".07"
                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                            ></path>
                                            <path
                                                d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                                                fill="#142688"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__payment-item'
                                        )}
                                    >
                                        <svg
                                            viewBox="0 0 38 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            width="55"
                                            height="30"
                                            aria-labelledby="pi-master"
                                        >
                                            <title id="pi-master">
                                                Mastercard
                                            </title>
                                            <path
                                                opacity=".07"
                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                            ></path>
                                            <circle
                                                fill="#EB001B"
                                                cx="15"
                                                cy="12"
                                                r="7"
                                            ></circle>
                                            <circle
                                                fill="#F79E1B"
                                                cx="23"
                                                cy="12"
                                                r="7"
                                            ></circle>
                                            <path
                                                fill="#FF5F00"
                                                d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__payment-item'
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            aria-labelledby="pi-american_express"
                                            viewBox="0 0 38 24"
                                            width="55"
                                            height="30"
                                        >
                                            <title id="pi-american_express">
                                                American Express
                                            </title>
                                            <path
                                                fill="#000"
                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                                                opacity=".07"
                                            ></path>
                                            <path
                                                fill="#006FCF"
                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                                            ></path>
                                            <path
                                                fill="#FFF"
                                                d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
                                            ></path>
                                            <path
                                                fill="#006FCF"
                                                d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
                                            ></path>
                                            <path
                                                fill="#006FCF"
                                                d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
                                            ></path>
                                            <path
                                                fill="#FFF"
                                                d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
                                            ></path>
                                            <path
                                                fill="#006FCF"
                                                d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
                                            ></path>
                                            <path
                                                fill="#006FCF"
                                                d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__payment-item'
                                        )}
                                    >
                                        <svg
                                            viewBox="0 0 38 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="55"
                                            height="30"
                                            role="img"
                                            aria-labelledby="pi-paypal"
                                        >
                                            <title id="pi-paypal">PayPal</title>
                                            <path
                                                opacity=".07"
                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                            ></path>
                                            <path
                                                fill="#003087"
                                                d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                                            ></path>
                                            <path
                                                fill="#3086C8"
                                                d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                                            ></path>
                                            <path
                                                fill="#012169"
                                                d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__payment-item'
                                        )}
                                    >
                                        <svg
                                            viewBox="0 0 38 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            width="55"
                                            height="30"
                                            aria-labelledby="pi-diners_club"
                                        >
                                            <title id="pi-diners_club">
                                                Diners Club
                                            </title>
                                            <path
                                                opacity=".07"
                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                            ></path>
                                            <path
                                                fill="#fff"
                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                                            ></path>
                                            <path
                                                d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z"
                                                fill="#3086C8"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__payment-item'
                                        )}
                                    >
                                        <svg
                                            viewBox="0 0 38 24"
                                            width="55"
                                            height="30"
                                            role="img"
                                            aria-labelledby="pi-discover"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title id="pi-discover">
                                                Discover
                                            </title>
                                            <path
                                                fill="#000"
                                                opacity=".07"
                                                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                                            ></path>
                                            <path
                                                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                                                fill="#fff"
                                            ></path>
                                            <path
                                                d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
                                                fill="#231F20"
                                            ></path>
                                            <path
                                                d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                                                fill="url(#pi-paint0_linear)"
                                            ></path>
                                            <path
                                                opacity=".65"
                                                d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                                                fill="url(#pi-paint1_linear)"
                                            ></path>
                                            <path
                                                d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
                                                fill="#231F20"
                                            ></path>
                                            <path
                                                d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
                                                fill="#231F20"
                                            ></path>
                                            <path
                                                d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
                                                fill="#F48120"
                                            ></path>
                                            <defs>
                                                <linearGradient
                                                    id="pi-paint0_linear"
                                                    x1="21.657"
                                                    y1="12.275"
                                                    x2="19.632"
                                                    y2="9.104"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#F89F20"></stop>
                                                    <stop
                                                        offset=".25"
                                                        stopColor="#F79A20"
                                                    ></stop>
                                                    <stop
                                                        offset=".533"
                                                        stopColor="#F68D20"
                                                    ></stop>
                                                    <stop
                                                        offset=".62"
                                                        stopColor="#F58720"
                                                    ></stop>
                                                    <stop
                                                        offset=".723"
                                                        stopColor="#F48120"
                                                    ></stop>
                                                    <stop
                                                        offset="1"
                                                        stopColor="#F37521"
                                                    ></stop>
                                                </linearGradient>
                                                <linearGradient
                                                    id="pi-paint1_linear"
                                                    x1="21.338"
                                                    y1="12.232"
                                                    x2="18.378"
                                                    y2="6.446"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#F58720"></stop>
                                                    <stop
                                                        offset=".359"
                                                        stopColor="#E16F27"
                                                    ></stop>
                                                    <stop
                                                        offset=".703"
                                                        stopColor="#D4602C"
                                                    ></stop>
                                                    <stop
                                                        offset=".982"
                                                        stopColor="#D05B2E"
                                                    ></stop>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className={cx('product-detail__wrapper')}>
                            <div
                                className={cx(
                                    'product-detail__heading-wrapper'
                                )}
                                onClick={() => handleShowProductDetail(1)}
                            >
                                <p className={cx('product-detail__heading')}>
                                    Description
                                </p>
                                <Button
                                    className={cx(
                                        'product-detail__heading-btn',
                                        {
                                            active: showProductDetail.includes(
                                                1
                                            ),
                                        }
                                    )}
                                >
                                    <NextIcon
                                        width="1.2rem"
                                        height="1.2rem"
                                    ></NextIcon>
                                </Button>
                            </div>
                            <div
                                className={cx('product-detail__inner', {
                                    'content-box': true,
                                    show: showProductDetail.includes(1),
                                })}
                            >
                                <div>
                                    <div className={cx('product-detail__body')}>
                                        <p>
                                            <strong>Key Features: </strong>
                                        </p>
                                        <p>
                                            <strong>Sleek Design:</strong>
                                            Modern and sleek style that easily
                                            blends in with your daily outfit,
                                            whether you're at the office, the
                                            gym, or a night out.
                                        </p>
                                        <p>
                                            <strong>
                                                Bright Touchscreen Display:
                                            </strong>
                                            With the brilliant touchscreen
                                            display, you may enjoy incredibly
                                            clear images and simple navigation.
                                        </p>
                                        <p>
                                            <strong>Fitness Tracking:</strong>
                                            To stay motivated and on track,
                                            track your heart rate, your steps,
                                            your sleep habits, and create
                                            customized fitness goals.
                                        </p>
                                        <p>
                                            <strong>Multi-Sport Modes:</strong>
                                            Improve your performance like never
                                            before by getting real-time
                                            information into your training.
                                        </p>
                                        <p>
                                            <strong>Notification:</strong>
                                            With smart notifications, you can
                                            never reach for your phone to get
                                            updates about calls, texts, emails,
                                            and apps.
                                        </p>
                                        <p>
                                            <strong>Music Control: </strong>
                                            With only a twist of your wrist, you
                                            can effortlessly skip tracks, change
                                            the volume, and play or pause music.
                                        </p>
                                        <p>&nbsp;</p>
                                        <p>
                                            <strong>Specifications:</strong>
                                        </p>
                                        <ul>
                                            <li>
                                                1.2-inch HD touchscreen display
                                            </li>
                                            <li>
                                                Works with both Android and iOS
                                                devices
                                            </li>
                                            <li>Bluetooth 5.0 connectivity</li>
                                            <li>
                                                Battery Life last up to seven
                                                days
                                            </li>
                                            <li>
                                                IP68-rated resistance to dust
                                                and water
                                            </li>
                                            <li>
                                                Gyroscope, accelerometer, and
                                                heart rate sensor
                                            </li>
                                            <li>
                                                Lightweight and sturdy aluminum
                                                alloy casing
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Why Choose Us */}
                        <div className={cx('product-detail__wrapper')}>
                            <div
                                className={cx(
                                    'product-detail__heading-wrapper'
                                )}
                                onClick={() => handleShowProductDetail(2)}
                            >
                                <p className={cx('product-detail__heading')}>
                                    Why Choose Us
                                </p>
                                <Button
                                    className={cx(
                                        'product-detail__heading-btn',
                                        {
                                            active: showProductDetail.includes(
                                                2
                                            ),
                                        }
                                    )}
                                >
                                    <NextIcon
                                        width="1.2rem"
                                        height="1.2rem"
                                    ></NextIcon>
                                </Button>
                            </div>
                            <div
                                className={cx('product-detail__inner', {
                                    'content-box': true,
                                    show: showProductDetail.includes(2),
                                })}
                            >
                                <div>
                                    <div className={cx('product-detail__body')}>
                                        <p>
                                            <strong>Smooth Integration:</strong>
                                            Easily synchronize with your
                                            smartphone to ensure that your
                                            digital life is integrated
                                            seamlessly.
                                        </p>
                                        <p>
                                            <strong>Premium Quality:</strong>
                                            It is made to last because to its
                                            premium components and exquisite
                                            craftsmanship, which enable it to
                                            resist normal wear and tear.
                                        </p>
                                        <p>
                                            <strong>
                                                Customer Satisfaction:
                                            </strong>
                                            It is backed by our dedication to
                                            ensuring your peace of mind. It
                                            comes with a hassle-free guarantee
                                            and devoted customer assistance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Free shipping & Returns */}
                        <div className={cx('product-detail__wrapper')}>
                            <div
                                className={cx(
                                    'product-detail__heading-wrapper'
                                )}
                                onClick={() => handleShowProductDetail(3)}
                            >
                                <p className={cx('product-detail__heading')}>
                                    Free shipping & Returns
                                </p>
                                <Button
                                    className={cx(
                                        'product-detail__heading-btn',
                                        {
                                            active: showProductDetail.includes(
                                                3
                                            ),
                                        }
                                    )}
                                >
                                    <NextIcon
                                        width="1.2rem"
                                        height="1.2rem"
                                    ></NextIcon>
                                </Button>
                            </div>
                            <div
                                className={cx('product-detail__inner', {
                                    'content-box': true,
                                    show: showProductDetail.includes(3),
                                })}
                            >
                                <div>
                                    <div className={cx('product-detail__body')}>
                                        <p>
                                            <strong>Returns Policy</strong>
                                        </p>
                                        <p>
                                            Within 30 days of delivery, you can
                                            return the majority of new, unopened
                                            products for a complete refund. If
                                            the return is due to a mistake on
                                            our part (you received a damaged or
                                            inaccurate item, etc.), we will
                                            additionally cover the cost of
                                            return postage.
                                        </p>
                                        <p>
                                            When you give your box to the return
                                            shipper, you should anticipate
                                            receiving your refund in four weeks,
                                            although in many circumstances, you
                                            will get your money back sooner.
                                            This time frame covers the
                                            following: the time it takes us to
                                            process your return once we receive
                                            it from the shipper (3 to 5 business
                                            days), the time it takes your bank
                                            to process our refund request (5 to
                                            10 business days), and the transit
                                            time for us to get your return from
                                            the shipper (5 to 10 business days).
                                        </p>
                                        <p>
                                            To return an item, just sign in to
                                            your account, select the 'Complete
                                            Orders' link from the My Account
                                            menu, see the order, and then click
                                            the Return Item(s) button. Upon
                                            receipt and processing of the
                                            returned goods, we will send you an
                                            email to confirm your reimbursement.
                                        </p>
                                        <p>
                                            <strong>Shipping</strong>
                                        </p>
                                        <p>
                                            Almost every location in the globe
                                            is reachable by us for shipping. Be
                                            advised that certain items are
                                            subject to limitations and that
                                            shipments to foreign locations are
                                            not permitted for certain products.
                                        </p>
                                        <p>
                                            Based on your selected shipping
                                            method and the availability of your
                                            products, we will estimate shipping
                                            and delivery times for you when you
                                            place an order. You may get shipment
                                            date estimates on the shipping
                                            quotes page, depending on the
                                            shipping company you select.
                                        </p>
                                        <p>
                                            Furthermore, a lot of the products
                                            we sell have weight-based shipping
                                            charges. On its detail page, you may
                                            get the weight of any such object.
                                            We shall round up all weights to the
                                            nearest whole pound in accordance
                                            with the shipping providers' rules.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Reviews */}
                        <div className={cx('product-detail__wrapper')}>
                            <div
                                className={cx(
                                    'product-detail__heading-wrapper'
                                )}
                                onClick={() => handleShowProductDetail(4)}
                            >
                                <p className={cx('product-detail__heading')}>
                                    Reviews
                                </p>
                                <Button
                                    className={cx(
                                        'product-detail__heading-btn',
                                        {
                                            active: showProductDetail.includes(
                                                4
                                            ),
                                        }
                                    )}
                                >
                                    <NextIcon
                                        width="1.2rem"
                                        height="1.2rem"
                                    ></NextIcon>
                                </Button>
                            </div>
                            <div
                                className={cx('product-detail__inner', {
                                    'content-box': true,
                                    show: showProductDetail.includes(4),
                                })}
                            >
                                <div>
                                    <div className={cx('product-detail__body')}>
                                        {/* Review */}
                                        <Review></Review>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div
                className={cx('recommend-product', {
                    'recommend-product-slider': true,
                })}
            >
                <h2 className={cx('recommend-product__title')}>
                    Recommended Products
                </h2>
                <div className={cx('recommend-product__list')}>
                    <div className="slider-container">
                        <Slider {...settings}>
                            <Card isReview={false}></Card>
                            <Card isReview={false}></Card>
                            <Card isReview={false}></Card>
                            <Card isReview={false}></Card>
                            <Card isReview={false}></Card>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
