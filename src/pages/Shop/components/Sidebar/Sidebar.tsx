import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '../../../../components/Button';
import styles from './Sidebar.module.scss';
import Checkbox from '../../../../components/Checkbox';
import Image from '../../../../components/Image';
import cardImages from '../../../../assets/images/shop/card';
import { renderRating } from '../../../../utils/Functions';
import ColorItem from '../../../../components/ColorItem';
import {
    AddToCartIcon,
    CompareIcon,
    HeartIcon,
} from '../../../../components/Icons';

const cx = classNames.bind(styles);

//Fake color list
const colorList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Sidebar = () => {
    const [activeFilterPanel, setActiveFilterPanel] = useState(0);
    const [showSubFilterPanel, setShowSubFilterPanel] = useState(0);
    const [showMore, setShowMore] = useState(0);
    const [showOptionFilter, setShowOptionFilter] = useState<number[]>([]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const handleFilterPanel = (activeNumber: number) => {
        if (activeNumber === activeFilterPanel) {
            setActiveFilterPanel(0);
            setShowSubFilterPanel(0);
            return;
        }

        setShowSubFilterPanel(activeNumber);
        setActiveFilterPanel(activeNumber);
    };

    const handleShowMore = (num: number) => {
        if (num === showMore) {
            setShowMore(0);
            return;
        }
        setShowMore(num);
    };

    const handleShowOptionFilter = (num: number) => {
        if (showOptionFilter.includes(num)) {
            const newArray = showOptionFilter.filter(
                (item, index) => item !== num
            );
            setShowOptionFilter(newArray);
        } else {
            setShowOptionFilter([...showOptionFilter, num]);
        }
    };

    return (
        <aside className={cx('sidebar', { 'sidebar-card-slider': true })}>
            <div className={cx('filter-panel')}>
                <h5 className={cx('sidebar__title', 'filter-panel__title')}>
                    Collection
                </h5>
                <div className={cx('filter-panel__content')}>
                    <ul className={cx('filter-panel__list')}>
                        <li
                            className={cx('filter-panel__item', {
                                active: activeFilterPanel === 1,
                            })}
                        >
                            <div className={cx('filter-panel__item-wrapper')}>
                                <Link
                                    to={'#!'}
                                    className={cx('filter-panel__item-link')}
                                >
                                    Smart Watches
                                </Link>
                                <span
                                    className={cx('filter-panel__icon')}
                                    onClick={() => handleFilterPanel(1)}
                                >
                                    {activeFilterPanel === 1 &&
                                    showSubFilterPanel === 1
                                        ? '-'
                                        : '+'}
                                </span>
                            </div>

                            {/* Sub-list */}
                            <ul
                                className={cx('filter-panel__sub-list', {
                                    show: showSubFilterPanel === 1,
                                })}
                            >
                                <li>
                                    <Link
                                        to={'#!'}
                                        className={cx('filter-panel__sub-item')}
                                    >
                                        Unisex Smartwatch
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'#!'}
                                        className={cx('filter-panel__sub-item')}
                                    >
                                        Prime Pro Smartwatch
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li
                            className={cx('filter-panel__item', {
                                active: activeFilterPanel === 2,
                            })}
                        >
                            <div className={cx('filter-panel__item-wrapper')}>
                                <Link
                                    to={'#!'}
                                    className={cx('filter-panel__item-link')}
                                >
                                    Luxury Set
                                </Link>
                                <span
                                    className={cx('filter-panel__icon')}
                                    onClick={() => handleFilterPanel(2)}
                                >
                                    {activeFilterPanel === 2 &&
                                    showSubFilterPanel === 2
                                        ? '-'
                                        : '+'}
                                </span>
                            </div>

                            {/* Sub-list */}
                            <ul
                                className={cx('filter-panel__sub-list', {
                                    show: showSubFilterPanel === 2,
                                })}
                            >
                                <li>
                                    <Link
                                        to={'#!'}
                                        className={cx('filter-panel__sub-item')}
                                    >
                                        Luxury Fitness Watch
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'#!'}
                                        className={cx('filter-panel__sub-item')}
                                    >
                                        Pulse Max Smartwatch
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'#!'}
                                        className={cx('filter-panel__sub-item')}
                                    >
                                        Analog Wrist Watch
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li
                            className={cx('filter-panel__item', {
                                active: activeFilterPanel === 3,
                            })}
                        >
                            <div className={cx('filter-panel__item-wrapper')}>
                                <Link
                                    to={'#!'}
                                    className={cx('filter-panel__item-link')}
                                >
                                    Fitness Wear
                                </Link>
                                <span
                                    className={cx('filter-panel__icon')}
                                    onClick={() => handleFilterPanel(3)}
                                >
                                    {activeFilterPanel === 3 &&
                                    showSubFilterPanel === 3
                                        ? '-'
                                        : '+'}
                                </span>
                            </div>

                            {/* Sub-list */}
                            <ul
                                className={cx('filter-panel__sub-list', {
                                    show: showSubFilterPanel === 3,
                                })}
                            >
                                <li>
                                    <Link
                                        to={'#!'}
                                        className={cx('filter-panel__sub-item')}
                                    >
                                        Fitness Track Watch
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('filter')}>
                <div className={cx('filter__top')}>
                    <div className={cx('filter__wrapper')}>
                        <h2 className={cx('filter__title')}>Filter:</h2>
                        <Button
                            className={cx('filter__remove-btn', {
                                'primary-hover': true,
                            })}
                        >
                            Remove all
                        </Button>
                    </div>
                    <ul className={cx('filter__list')}>
                        <li>
                            <Button
                                rightIcon={<span>×</span>}
                                className={cx('filter__item', {
                                    'primary-hover': true,
                                })}
                            >
                                Availability: Out of stock
                            </Button>
                        </li>
                        <li>
                            <Button
                                rightIcon={<span>×</span>}
                                className={cx('filter__item', {
                                    'primary-hover': true,
                                })}
                            >
                                Availability: Out of stock
                            </Button>
                        </li>
                    </ul>
                </div>

                {/*Avalability */}
                <div className={cx('availability')}>
                    <p
                        className={cx('sidebar__title')}
                        onClick={() => handleShowOptionFilter(1)}
                    >
                        Availability
                        <span className={cx('sidebar__title-quantity')}>
                            (1)
                        </span>
                        <span
                            className={cx('sidebar__title-icon', {
                                hide: showOptionFilter.includes(1),
                            })}
                        ></span>
                    </p>
                    <div
                        className={cx('detail__list', {
                            'd-none': showOptionFilter.includes(1),
                        })}
                    >
                        <Checkbox
                            name="avalability-1"
                            label="In stock"
                            quantity="(9)"
                            checked
                        ></Checkbox>
                        <Checkbox
                            name="avalability-2"
                            label="Out of stock"
                            quantity="(2)"
                        ></Checkbox>
                    </div>
                </div>
                {/* Price */}
                <div className={cx('price')}>
                    <p
                        className={cx('sidebar__title')}
                        onClick={() => handleShowOptionFilter(2)}
                    >
                        Price
                        <span
                            className={cx('sidebar__title-icon', {
                                hide: showOptionFilter.includes(2),
                            })}
                        ></span>
                    </p>
                    <div
                        className={cx('detail__list', {
                            'd-none': showOptionFilter.includes(2),
                        })}
                    >
                        <p className={cx('price__header')}>
                            The highest price is Rs. 5,149.00
                        </p>
                        <div className={cx('price__range')}>
                            <span className={cx('price__unit')}>$</span>
                            <div className={cx('price__group')}>
                                <input
                                    className={cx('price__input')}
                                    type="number"
                                    placeholder="0"
                                    min={'0'}
                                    max={'100'}
                                />
                            </div>
                            <div className={cx('price__group')}>
                                <input
                                    className={cx('price__input')}
                                    type="number"
                                    placeholder="100"
                                    min={'0'}
                                    max={'100'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*More filter */}
                <div className={cx('more-filter')}>
                    <p
                        className={cx('sidebar__title')}
                        onClick={() => handleShowOptionFilter(3)}
                    >
                        More filters
                        <span
                            className={cx('sidebar__title-icon', {
                                hide: showOptionFilter.includes(3),
                            })}
                        ></span>
                    </p>
                    <div
                        className={cx('detail__list', {
                            'd-none': showOptionFilter.includes(3),
                        })}
                    >
                        <div>
                            <Checkbox
                                name="black"
                                label="Black"
                                quantity="(1)"
                            ></Checkbox>
                            <Checkbox
                                name="bluedio"
                                label="Bluedio"
                                quantity="(1)"
                            ></Checkbox>
                            <Checkbox
                                name="fit"
                                label="fit"
                                quantity="(1)"
                            ></Checkbox>
                            <Checkbox
                                name="health"
                                label="health"
                                quantity="(1)"
                            ></Checkbox>
                            <Checkbox
                                name="new"
                                label="new"
                                quantity="(5)"
                            ></Checkbox>
                            <Checkbox
                                name="sale"
                                label="sale"
                                quantity="(2)"
                            ></Checkbox>
                            <Checkbox
                                name="smartwatch"
                                label="smartwatch"
                                quantity="(3)"
                            ></Checkbox>
                            <Checkbox
                                name="tracker"
                                label="Tracker"
                                quantity="(2)"
                            ></Checkbox>
                            <Checkbox
                                name="trendy"
                                label="trendy"
                                quantity="(9)"
                            ></Checkbox>
                            <Checkbox
                                name="watch"
                                label="watch"
                                quantity="(4)"
                            ></Checkbox>
                        </div>
                        <div
                            className={cx('more-filter__hide', {
                                'd-none': showMore !== 1,
                            })}
                        >
                            <Checkbox
                                name="yellow"
                                label="Yellow"
                                quantity="(1)"
                            ></Checkbox>
                        </div>
                        <Button
                            leftIcon={<span>{showMore !== 1 ? '+' : '-'}</span>}
                            className={cx('sidebar__more-btn')}
                            onClick={() => handleShowMore(1)}
                        >
                            {showMore !== 1 ? 'Show more' : 'Show less'}
                        </Button>
                    </div>
                </div>
                {/* Color */}
                <div className={cx('color')}>
                    <p
                        className={cx('sidebar__title')}
                        onClick={() => handleShowOptionFilter(4)}
                    >
                        Color
                        <span
                            className={cx('sidebar__title-icon', {
                                hide: showOptionFilter.includes(4),
                            })}
                        ></span>
                    </p>
                    <div
                        className={cx('detail__list', {
                            'd-none': showOptionFilter.includes(4),
                        })}
                    >
                        <ul className={cx('color__list')}>
                            {colorList.map((colorItem, index) => (
                                <li className={cx('color__item')} key={index}>
                                    <label
                                        htmlFor=""
                                        className={cx('color__label')}
                                    >
                                        <span
                                            className={cx('color__color')}
                                            style={{
                                                color: 'var(--primary-color)',
                                            }}
                                        ></span>
                                    </label>
                                </li>
                            ))}
                            {/* Hide item */}
                            {colorList.map((colorItem, index) => (
                                <li
                                    className={cx('color__item', {
                                        'd-none': showMore !== 2,
                                    })}
                                    key={index}
                                >
                                    <label
                                        htmlFor=""
                                        className={cx('color__label')}
                                    >
                                        <span
                                            className={cx('color__color')}
                                            style={{
                                                color: 'var(--primary-color)',
                                            }}
                                        ></span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <Button
                            leftIcon={<span>{showMore !== 2 ? '+' : '-'}</span>}
                            className={cx('sidebar__more-btn')}
                            onClick={() => handleShowMore(2)}
                        >
                            {showMore !== 2 ? 'Show more' : 'Show less'}
                        </Button>
                    </div>
                </div>
                {/*Material */}
                <div className={cx('more-filter')}>
                    <p
                        className={cx('sidebar__title')}
                        onClick={() => handleShowOptionFilter(5)}
                    >
                        Material
                        <span
                            className={cx('sidebar__title-icon', {
                                hide: showOptionFilter.includes(5),
                            })}
                        ></span>
                    </p>
                    <div
                        className={cx('detail__list', {
                            'd-none': showOptionFilter.includes(5),
                        })}
                    >
                        <Checkbox
                            name="leather"
                            label="Leather"
                            quantity="(4)"
                        ></Checkbox>
                        <Checkbox
                            name="nylon"
                            label="Nylon"
                            quantity="(1)"
                        ></Checkbox>
                        <Checkbox
                            name="rubber"
                            label="Rubber"
                            quantity="(5)"
                        ></Checkbox>
                    </div>
                </div>
            </div>
            <div className={cx('best-seller')}>
                <h5 className={cx('best-seller__header')}>Best Sellers</h5>
                <div className="slider-container">
                    <Slider {...settings}>
                        <div className={cx('card')}>
                            <div className={cx('card__media')}>
                                <Link
                                    to={'#!'}
                                    className={cx('card__img-wrapper')}
                                >
                                    <Image
                                        src={cardImages.CardItem1}
                                        className={cx('card__thumbnail')}
                                    ></Image>
                                </Link>
                                <Link to={'#!'} className={cx('card__popup')}>
                                    <div className={cx('card__product-icons')}>
                                        <div
                                            className={cx(
                                                'card__product-icon-top'
                                            )}
                                        >
                                            <Tippy
                                                delay={[0, 150]}
                                                content="Compare"
                                                placement="left"
                                                className="card-popup-product-icon"
                                            >
                                                <Link
                                                    to={'/'}
                                                    className={cx(
                                                        'card__icon-wrapper'
                                                    )}
                                                >
                                                    <CompareIcon
                                                        className={cx(
                                                            'card__icon'
                                                        )}
                                                    ></CompareIcon>
                                                </Link>
                                            </Tippy>
                                            <Tippy
                                                delay={[0, 150]}
                                                content="Wishlist"
                                                placement="left"
                                                className="card-popup-product-icon"
                                            >
                                                <div
                                                    className={cx(
                                                        'card__icon-wrapper'
                                                    )}
                                                >
                                                    <HeartIcon
                                                        className={cx(
                                                            'card__icon'
                                                        )}
                                                    ></HeartIcon>
                                                </div>
                                            </Tippy>
                                        </div>
                                        <div
                                            className={cx(
                                                'card__product-icon-bottom'
                                            )}
                                        >
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
                                <p className={cx('card__caption')}>Skyup</p>
                                <h3>
                                    <Link
                                        to={'#!'}
                                        className={cx('card__heading')}
                                    >
                                        {' '}
                                        Fitness Tracker Watch
                                    </Link>
                                </h3>
                                <div className={cx('card__price-container')}>
                                    <span className={cx('card__price')}>
                                        $29.7839
                                    </span>
                                </div>
                                <div className={cx('card__stars')}>
                                    {renderRating(4)}
                                </div>
                                <div className={cx('card__colors')}>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('card')}>
                            <div className={cx('card__media')}>
                                <Link
                                    to={'#!'}
                                    className={cx('card__img-wrapper')}
                                >
                                    <Image
                                        src={cardImages.CardItem1}
                                        className={cx('card__thumbnail')}
                                    ></Image>
                                </Link>
                                <Link to={'#!'} className={cx('card__popup')}>
                                    <div className={cx('card__product-icons')}>
                                        <div
                                            className={cx(
                                                'card__product-icon-top'
                                            )}
                                        >
                                            <Tippy
                                                delay={[0, 150]}
                                                content="Compare"
                                                placement="left"
                                                className="card-popup-product-icon"
                                            >
                                                <Link
                                                    to={'/'}
                                                    className={cx(
                                                        'card__icon-wrapper'
                                                    )}
                                                >
                                                    <CompareIcon
                                                        className={cx(
                                                            'card__icon'
                                                        )}
                                                    ></CompareIcon>
                                                </Link>
                                            </Tippy>
                                            <Tippy
                                                delay={[0, 150]}
                                                content="Wishlist"
                                                placement="left"
                                                className="card-popup-product-icon"
                                            >
                                                <div
                                                    className={cx(
                                                        'card__icon-wrapper'
                                                    )}
                                                >
                                                    <HeartIcon
                                                        className={cx(
                                                            'card__icon'
                                                        )}
                                                    ></HeartIcon>
                                                </div>
                                            </Tippy>
                                        </div>
                                        <div
                                            className={cx(
                                                'card__product-icon-bottom'
                                            )}
                                        >
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
                                <p className={cx('card__caption')}>Skyup</p>
                                <h3>
                                    <Link
                                        to={'#!'}
                                        className={cx('card__heading')}
                                    >
                                        {' '}
                                        Fitness Tracker Watch
                                    </Link>
                                </h3>
                                <div className={cx('card__price-container')}>
                                    <span className={cx('card__price')}>
                                        $29.7839
                                    </span>
                                </div>
                                <div className={cx('card__stars')}>
                                    {renderRating(4)}
                                </div>
                                <div className={cx('card__colors')}>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('card')}>
                            <div className={cx('card__media')}>
                                <Link
                                    to={'#!'}
                                    className={cx('card__img-wrapper')}
                                >
                                    <Image
                                        src={cardImages.CardItem1}
                                        className={cx('card__thumbnail')}
                                    ></Image>
                                </Link>
                                <Link to={'#!'} className={cx('card__popup')}>
                                    <div className={cx('card__product-icons')}>
                                        <div
                                            className={cx(
                                                'card__product-icon-top'
                                            )}
                                        >
                                            <Tippy
                                                delay={[0, 150]}
                                                content="Compare"
                                                placement="left"
                                                className="card-popup-product-icon"
                                            >
                                                <Link
                                                    to={'/'}
                                                    className={cx(
                                                        'card__icon-wrapper'
                                                    )}
                                                >
                                                    <CompareIcon
                                                        className={cx(
                                                            'card__icon'
                                                        )}
                                                    ></CompareIcon>
                                                </Link>
                                            </Tippy>
                                            <Tippy
                                                delay={[0, 150]}
                                                content="Wishlist"
                                                placement="left"
                                                className="card-popup-product-icon"
                                            >
                                                <div
                                                    className={cx(
                                                        'card__icon-wrapper'
                                                    )}
                                                >
                                                    <HeartIcon
                                                        className={cx(
                                                            'card__icon'
                                                        )}
                                                    ></HeartIcon>
                                                </div>
                                            </Tippy>
                                        </div>
                                        <div
                                            className={cx(
                                                'card__product-icon-bottom'
                                            )}
                                        >
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
                                <p className={cx('card__caption')}>Skyup</p>
                                <h3>
                                    <Link
                                        to={'#!'}
                                        className={cx('card__heading')}
                                    >
                                        {' '}
                                        Fitness Tracker Watch
                                    </Link>
                                </h3>
                                <div className={cx('card__price-container')}>
                                    <span className={cx('card__price')}>
                                        $29.7839
                                    </span>
                                </div>
                                <div className={cx('card__stars')}>
                                    {renderRating(4)}
                                </div>
                                <div className={cx('card__colors')}>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                    <Tippy
                                        delay={[0, 150]}
                                        content="Pickled Bluewood"
                                        placement="top"
                                        className="card-color-tooltip"
                                    >
                                        <div>
                                            <ColorItem color="#314559"></ColorItem>
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
