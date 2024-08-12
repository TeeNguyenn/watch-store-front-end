import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react/headless';

import Button from '../../components/Button';
import styles from './Shop.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Sidebar from './components/Sidebar';
import {
    CloseIcon,
    FilterIcon,
    RightArrowIcon,
    ShowFourTheProductIcon,
    ShowOneTheProductIcon,
    ShowThreeTheProductIcon,
    ShowTwoTheProductIcon,
    ShowVerticalTheProductIcon,
} from '../../components/Icons';
import Card from './components/Card';
import Pagination from '../../components/Pagination';

const cx = classNames.bind(styles);

// fake breadcrumb
const links = ['home', 'shop'];

// fake mobile color filter list
const mobileColorFilterList = [1, 2, 3, 4, , 5, 6, 7, 8, 9, 10];

const Shop = () => {
    const [sortBy, setSortBy] = useState('Alphabetically, A-Z');
    const [visible, setVisible] = useState(false);
    const [showOption, setShowOption] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileSubMenu, setShowMobileSubMenu] = useState(0);
    const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
    const [showOptionFilter, setShowOptionFilter] = useState<number[]>([]);

    const isXlScreen = useMediaQuery({ query: '(max-width: 1199.98px)' });
    const isLgScreen = useMediaQuery({ query: '(max-width: 991.98px)' });

    console.log('ddd', showMobileSubMenu);

    const handleSortBy = (name: string) => {
        if (name === sortBy) {
            return;
        }
        setSortBy(name);
        setVisible(false);
    };

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    useEffect(() => {
        if (isXlScreen) {
            setShowOption(3);
        }
        if (isLgScreen) {
            setShowOption(2);
        }
    }, []);

    return (
        <div className={cx('', 'container-spacing')}>
            <div className={cx('shop')}>
                <Breadcrumb title="Products" links={links}></Breadcrumb>
                <div className={cx('shop__row', { row: true })}>
                    <div
                        className={cx('sidebar', {
                            col: true,
                            'col-3': true,
                            'col-xl-4': true,
                            'd-lg-none': true,
                        })}
                    >
                        <Sidebar></Sidebar>
                    </div>
                    <div
                        className={cx('product', {
                            col: true,
                            'col-9': true,
                            'col-xl-8': true,
                            'col-lg-12': true,
                        })}
                    >
                        <div
                            className={cx('product__top')}
                            style={{
                                marginBottom:
                                    showOptionFilter.length >= 1
                                        ? '0px'
                                        : '60px',
                            }}
                        >
                            <div
                                className={cx('product__count-wrapper', {
                                    'd-lg-none': true,
                                })}
                            >
                                <h2 className={cx('product__count')}>
                                    Showing 1-11 of 11 Results
                                </h2>
                            </div>

                            {/* Mobile menu */}
                            <div
                                className={cx('mobile-menu', {
                                    'd-none': true,
                                    'd-lg-flex': true,
                                })}
                            >
                                <Button
                                    leftIcon={<FilterIcon></FilterIcon>}
                                    className={cx('mobile-menu__btn', {
                                        modifier: showMobileFilterModal,
                                    })}
                                    onClick={() =>
                                        setShowMobileFilterModal(true)
                                    }
                                >
                                    Filter and sort
                                </Button>

                                <div
                                    className={cx('mobile-menu__modal', {
                                        show: showMobileFilterModal,
                                    })}
                                >
                                    <div
                                        className={cx('mobile-menu__overlay')}
                                        onClick={() =>
                                            setShowMobileFilterModal(false)
                                        }
                                    ></div>
                                    <div className={cx('mobile-menu__inner')}>
                                        <div className={cx('mobile-menu__top')}>
                                            <div
                                                className={cx(
                                                    'mobile-menu__wrapper'
                                                )}
                                            >
                                                <h2
                                                    className={cx(
                                                        'mobile-menu__title'
                                                    )}
                                                >
                                                    Filter
                                                </h2>
                                                <p
                                                    className={cx(
                                                        'mobile-menu__text'
                                                    )}
                                                >
                                                    11 products
                                                </p>
                                            </div>
                                            <Button
                                                className={cx(
                                                    'mobile-menu__close-btn',
                                                    { 'primary-hover': true }
                                                )}
                                                onClick={() =>
                                                    setShowMobileFilterModal(
                                                        false
                                                    )
                                                }
                                            >
                                                <CloseIcon></CloseIcon>
                                            </Button>
                                        </div>
                                        <div
                                            className={cx('mobile-menu__main')}
                                        >
                                            {/* Availability */}
                                            <div
                                                className={cx(
                                                    'mobile-menu__group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-menu__container',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        setShowMobileSubMenu(1)
                                                    }
                                                >
                                                    <p
                                                        className={cx(
                                                            'mobile-menu__label'
                                                        )}
                                                    >
                                                        Availability
                                                    </p>
                                                    <RightArrowIcon></RightArrowIcon>
                                                </div>
                                                {/* sub-menu */}
                                                <div
                                                    className={cx(
                                                        'mobile-menu__sub-menu',
                                                        {
                                                            show:
                                                                showMobileSubMenu ===
                                                                1,
                                                        }
                                                    )}
                                                >
                                                    <Button
                                                        leftIcon={
                                                            <RightArrowIcon
                                                                className={cx(
                                                                    'mobile-menu__back-icon'
                                                                )}
                                                            ></RightArrowIcon>
                                                        }
                                                        className={cx(
                                                            'mobile-menu__back-btn',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setShowMobileSubMenu(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        Availability
                                                    </Button>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__list'
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="Filter-Availability-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="Filter-Availability-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                In Stock
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (9)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="Filter-Availability-mobile-2"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="Filter-Availability-mobile-2"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Out of stock
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (2)
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__footer'
                                                        )}
                                                    >
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            clear
                                                        </Button>
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Price */}
                                            <div
                                                className={cx(
                                                    'mobile-menu__group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-menu__container',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        setShowMobileSubMenu(2)
                                                    }
                                                >
                                                    <p
                                                        className={cx(
                                                            'mobile-menu__label'
                                                        )}
                                                    >
                                                        Price
                                                    </p>
                                                    <RightArrowIcon></RightArrowIcon>
                                                </div>
                                                {/* sub-menu */}
                                                <div
                                                    className={cx(
                                                        'mobile-menu__sub-menu',
                                                        {
                                                            show:
                                                                showMobileSubMenu ===
                                                                2,
                                                        }
                                                    )}
                                                >
                                                    <Button
                                                        leftIcon={
                                                            <RightArrowIcon
                                                                className={cx(
                                                                    'mobile-menu__back-icon'
                                                                )}
                                                            ></RightArrowIcon>
                                                        }
                                                        className={cx(
                                                            'mobile-menu__back-btn',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setShowMobileSubMenu(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        Price
                                                    </Button>
                                                    <div>
                                                        <p
                                                            className={cx(
                                                                'mobile-menu__price-desc'
                                                            )}
                                                        >
                                                            The highest price is
                                                            $61.3351
                                                        </p>
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__price-range'
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    'mobile-menu__price-unit'
                                                                )}
                                                            >
                                                                $
                                                            </span>
                                                            <div
                                                                className={cx(
                                                                    'mobile-menu__price-field'
                                                                )}
                                                            >
                                                                <input
                                                                    type="number"
                                                                    className={cx(
                                                                        'mobile-menu__price-input'
                                                                    )}
                                                                    placeholder="0"
                                                                    max={
                                                                        61.3351
                                                                    }
                                                                    min={0}
                                                                />
                                                            </div>
                                                            <span
                                                                className={cx(
                                                                    'mobile-menu__price-unit'
                                                                )}
                                                            >
                                                                $
                                                            </span>
                                                            <div
                                                                className={cx(
                                                                    'mobile-menu__price-field'
                                                                )}
                                                            >
                                                                <input
                                                                    type="number"
                                                                    className={cx(
                                                                        'mobile-menu__price-input'
                                                                    )}
                                                                    placeholder="61.3351"
                                                                    max={
                                                                        61.3351
                                                                    }
                                                                    min={0}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__footer'
                                                        )}
                                                    >
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            clear
                                                        </Button>
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* More filters */}
                                            <div
                                                className={cx(
                                                    'mobile-menu__group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-menu__container',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        setShowMobileSubMenu(3)
                                                    }
                                                >
                                                    <p
                                                        className={cx(
                                                            'mobile-menu__label'
                                                        )}
                                                    >
                                                        More filters
                                                    </p>
                                                    <RightArrowIcon></RightArrowIcon>
                                                </div>
                                                {/* sub-menu */}
                                                <div
                                                    className={cx(
                                                        'mobile-menu__sub-menu',
                                                        {
                                                            show:
                                                                showMobileSubMenu ===
                                                                3,
                                                        }
                                                    )}
                                                >
                                                    <Button
                                                        leftIcon={
                                                            <RightArrowIcon
                                                                className={cx(
                                                                    'mobile-menu__back-icon'
                                                                )}
                                                            ></RightArrowIcon>
                                                        }
                                                        className={cx(
                                                            'mobile-menu__back-btn',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setShowMobileSubMenu(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        More filters
                                                    </Button>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__list'
                                                        )}
                                                    >
                                                        {/* Black */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Black
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* Bluedio  */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-2"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-2"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Bluedio
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* fit */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-3"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-3"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                fit
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* health */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-4"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-4"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                health
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* new */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-5"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-5"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                new
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (4)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* sale */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-7"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-7"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                sale
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* smartwatch  */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-8"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-8"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                smartwatch
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (3)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* Tracker  */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-9"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-9"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Tracker
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* trendy */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-10"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-10"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                trendy
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (8)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* watch */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-11"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-11"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                watch
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (3)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        {/* Yellow */}
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-12"
                                                                hidden
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-12"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Yellow
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__footer',
                                                            {
                                                                modifier: true,
                                                            }
                                                        )}
                                                    >
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            clear
                                                        </Button>
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Color */}
                                            <div
                                                className={cx(
                                                    'mobile-menu__group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-menu__container',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        setShowMobileSubMenu(4)
                                                    }
                                                >
                                                    <p
                                                        className={cx(
                                                            'mobile-menu__label'
                                                        )}
                                                    >
                                                        Color
                                                    </p>
                                                    <RightArrowIcon></RightArrowIcon>
                                                </div>
                                                {/* sub-menu */}
                                                <div
                                                    className={cx(
                                                        'mobile-menu__sub-menu',
                                                        {
                                                            show:
                                                                showMobileSubMenu ===
                                                                4,
                                                        }
                                                    )}
                                                >
                                                    <Button
                                                        leftIcon={
                                                            <RightArrowIcon
                                                                className={cx(
                                                                    'mobile-menu__back-icon'
                                                                )}
                                                            ></RightArrowIcon>
                                                        }
                                                        className={cx(
                                                            'mobile-menu__back-btn',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setShowMobileSubMenu(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        Color
                                                    </Button>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__list'
                                                        )}
                                                    >
                                                        {mobileColorFilterList.map(
                                                            (item) => (
                                                                <div
                                                                    className={cx(
                                                                        'mobile-menu__item',
                                                                        {
                                                                            'primary-hover':
                                                                                true,
                                                                        }
                                                                    )}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        name=""
                                                                        id="filters-mobile-1"
                                                                        className={cx(
                                                                            'mobile-menu__checkbox'
                                                                        )}
                                                                        hidden
                                                                    />
                                                                    <label
                                                                        htmlFor="filters-mobile-1"
                                                                        className={cx(
                                                                            'mobile-menu__checkbox-label'
                                                                        )}
                                                                    >
                                                                        Algae
                                                                        <span
                                                                            className={cx(
                                                                                'mobile-menu__quantity'
                                                                            )}
                                                                        >
                                                                            (1)
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__footer',
                                                            {
                                                                modifier: true,
                                                            }
                                                        )}
                                                    >
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            clear
                                                        </Button>
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Material */}
                                            <div
                                                className={cx(
                                                    'mobile-menu__group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-menu__container',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        setShowMobileSubMenu(5)
                                                    }
                                                >
                                                    <p
                                                        className={cx(
                                                            'mobile-menu__label'
                                                        )}
                                                    >
                                                        Material
                                                    </p>
                                                    <RightArrowIcon></RightArrowIcon>
                                                </div>
                                                {/* sub-menu */}
                                                <div
                                                    className={cx(
                                                        'mobile-menu__sub-menu',
                                                        {
                                                            show:
                                                                showMobileSubMenu ===
                                                                5,
                                                        }
                                                    )}
                                                >
                                                    <Button
                                                        leftIcon={
                                                            <RightArrowIcon
                                                                className={cx(
                                                                    'mobile-menu__back-icon'
                                                                )}
                                                            ></RightArrowIcon>
                                                        }
                                                        className={cx(
                                                            'mobile-menu__back-btn',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setShowMobileSubMenu(
                                                                0
                                                            )
                                                        }
                                                    >
                                                        Material
                                                    </Button>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__list'
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Leather
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Nylon
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (1)
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'mobile-menu__item',
                                                                {
                                                                    'primary-hover':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name=""
                                                                id="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="filters-mobile-1"
                                                                className={cx(
                                                                    'mobile-menu__checkbox-label'
                                                                )}
                                                            >
                                                                Rubber
                                                                <span
                                                                    className={cx(
                                                                        'mobile-menu__quantity'
                                                                    )}
                                                                >
                                                                    (5)
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'mobile-menu__footer',
                                                            {
                                                                modifier: true,
                                                            }
                                                        )}
                                                    >
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            clear
                                                        </Button>
                                                        <Button
                                                            primary
                                                            className={cx(
                                                                'mobile-menu__footer-btn'
                                                            )}
                                                        >
                                                            apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Sort by */}
                                            <div
                                                className={cx(
                                                    'mobile-menu__group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'mobile-menu__container'
                                                    )}
                                                >
                                                    <p
                                                        className={cx(
                                                            'mobile-menu__label'
                                                        )}
                                                    >
                                                        Sort by:
                                                    </p>
                                                    <select
                                                        name="sort_by"
                                                        id=""
                                                        className={cx(
                                                            'mobile-menu__sort-select'
                                                        )}
                                                    >
                                                        <option value="manual">
                                                            Featured
                                                        </option>
                                                        <option value="best-selling">
                                                            Best selling
                                                        </option>
                                                        <option
                                                            value="title-ascending"
                                                            selected
                                                        >
                                                            Alphabetically, A-Z
                                                        </option>
                                                        <option value="title-descending">
                                                            Alphabetically, Z-A
                                                        </option>
                                                        <option value="price-ascending">
                                                            Price, low to high
                                                        </option>
                                                        <option value="price-descending">
                                                            Price, high to low
                                                        </option>
                                                        <option value="created-ascending">
                                                            Date, old to new
                                                        </option>
                                                        <option value="created-descending">
                                                            Date, new to old
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'mobile-menu__footer'
                                                )}
                                            >
                                                <Button
                                                    primary
                                                    className={cx(
                                                        'mobile-menu__footer-btn'
                                                    )}
                                                >
                                                    remove all
                                                </Button>
                                                <Button
                                                    primary
                                                    className={cx(
                                                        'mobile-menu__footer-btn'
                                                    )}
                                                >
                                                    apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('product__show-options')}>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 2,
                                    })}
                                    onClick={() => setShowOption(2)}
                                >
                                    <ShowTwoTheProductIcon></ShowTwoTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 11,
                                        'd-none': true,
                                        'd-sm-flex': true,
                                    })}
                                    onClick={() => setShowOption(11)}
                                >
                                    <ShowOneTheProductIcon></ShowOneTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 3,
                                        'd-md-none': true,
                                    })}
                                    onClick={() => setShowOption(3)}
                                >
                                    <ShowThreeTheProductIcon></ShowThreeTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 4,
                                        'd-xl-none': true,
                                    })}
                                    onClick={() => setShowOption(4)}
                                >
                                    <ShowFourTheProductIcon></ShowFourTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 1,
                                        'd-sm-none': true,
                                    })}
                                    onClick={() => setShowOption(1)}
                                >
                                    <ShowVerticalTheProductIcon></ShowVerticalTheProductIcon>
                                </div>
                            </div>

                            <div className={cx('sort', { 'd-lg-none': true })}>
                                <div className={cx('sort__wrapper')}>
                                    <label
                                        htmlFor=""
                                        className={cx('sort__label')}
                                    >
                                        Sort by:
                                    </label>

                                    <Tippy
                                        visible={visible}
                                        interactive
                                        delay={[0, 300]}
                                        offset={[5, 5]}
                                        placement="bottom-end"
                                        trigger="click"
                                        onClickOutside={() => setVisible(false)}
                                        render={(attrs) => (
                                            <div
                                                className={cx('sort__options')}
                                            >
                                                <label
                                                    htmlFor="option-1"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-1"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Featured',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Featured'
                                                            )
                                                        }
                                                    >
                                                        Featured
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-2"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-2"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Best selling',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Best selling'
                                                            )
                                                        }
                                                    >
                                                        Best selling
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-3"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-3"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Alphabetically, A-Z',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Alphabetically, A-Z'
                                                            )
                                                        }
                                                    >
                                                        Alphabetically, A-Z
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-4"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-4"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Alphabetically, Z-A',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Alphabetically, Z-A'
                                                            )
                                                        }
                                                    >
                                                        Alphabetically, Z-A
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-5"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-5"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Price, low to high',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Price, low to high'
                                                            )
                                                        }
                                                    >
                                                        Price, low to high
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-6"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-6"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Price, high to low',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Price, high to low'
                                                            )
                                                        }
                                                    >
                                                        Price, high to low
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-7"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-7"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Date, old to new',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Date, old to new'
                                                            )
                                                        }
                                                    >
                                                        Date, old to new
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-8"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-8"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Date, new to old',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Date, new to old'
                                                            )
                                                        }
                                                    >
                                                        Date, new to old
                                                    </span>
                                                </label>
                                            </div>
                                        )}
                                    >
                                        <p
                                            className={cx('sort__title')}
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {sortBy}
                                            <span
                                                className={cx(
                                                    'sort__title-icon'
                                                )}
                                            ></span>
                                        </p>
                                    </Tippy>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu - filter list */}
                        <div
                            className={cx('mobile-menu__filter-container', {
                                'd-none': showOptionFilter.length === 0,
                            })}
                        >
                            <ul className={cx('mobile-menu__filter-list')}>
                                <li
                                    className={cx(
                                        'mobile-menu__filter-item-wrapper'
                                    )}
                                >
                                    <Button
                                        rightIcon={<span>×</span>}
                                        className={cx(
                                            'mobile-menu__filter-item',
                                            {
                                                'primary-hover': true,
                                            }
                                        )}
                                    >
                                        Availability: Out of stock
                                    </Button>
                                </li>
                                <li
                                    className={cx(
                                        'mobile-menu__filter-item-wrapper'
                                    )}
                                >
                                    <Button
                                        rightIcon={<span>×</span>}
                                        className={cx(
                                            'mobile-menu__filter-item',
                                            {
                                                'primary-hover': true,
                                            }
                                        )}
                                    >
                                        Availability: Out of stock
                                    </Button>
                                </li>
                                <li
                                    className={cx(
                                        'mobile-menu__filter-item-wrapper'
                                    )}
                                >
                                    <Button
                                        rightIcon={<span>×</span>}
                                        className={cx(
                                            'mobile-menu__filter-item',
                                            {
                                                'primary-hover': true,
                                            }
                                        )}
                                    >
                                        Availability: Out of stock
                                    </Button>
                                </li>
                            </ul>
                            <Button
                                className={cx(
                                    'mobile-menu__filter-remove-all',
                                    {
                                        'primary-hover': true,
                                    }
                                )}
                            >
                                Remove all
                            </Button>
                        </div>

                        <div className={cx('product__inner')}>
                            <div
                                className={cx('product__list', {
                                    row: true,
                                    'row-cols-4': showOption === 4,
                                    'row-cols-3': showOption === 3,
                                    'row-cols-2': showOption === 2,
                                    'row-cols-1':
                                        showOption === 1 || showOption === 11,
                                })}
                            >
                                <Card
                                    oneProduct={showOption === 1}
                                    SoldOut
                                ></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1} Sale></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                                <Card oneProduct={showOption === 1}></Card>
                            </div>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPage={5}
                            pagination={pagination}
                        ></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
