import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import {
    CartIcon,
    CloseIcon,
    RightArrowIcon,
    SearchIcon,
    SubMenuIcon,
    UpArrowIcon,
    UserIcon,
} from '../../../components/Icons';
import config from '../../../config';
import SearchModal from '../SearchModal';
import Cart from '../Cart';
import CartWrapper from '../Cart/CartWrapper';
import LoginModal from '../LoginModal';
import SlideShow from '../SlideShow';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

const Header = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showCartDrawer, setShowCartDrawer] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isSlideShow, setIsSlideShow] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSubMenu, setShowMobileSubMenu] = useState(false);

    const location = useLocation();
    const pathName = location.pathname;

    useEffect(() => {
        if (pathName === '/') {
            setIsSlideShow(true);
        } else {
            setIsSlideShow(false);
        }
    }, [pathName]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 740) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);
    };

    const handleCloseSearchModal = () => {
        setShowSearchModal(!showSearchModal);
    };

    const handleCloseCartDrawer = () => {
        setShowCartDrawer(false);
    };

    if (
        showSearchModal ||
        showCartDrawer ||
        showMobileMenu ||
        showMobileSubMenu
    ) {
        document.body.classList.add('hide-scroll');
    } else {
        document.body.classList.remove('hide-scroll');
    }

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleMobileSubMenu = () => {
        setShowMobileMenu(false);
        setShowMobileSubMenu(false);
    };

    return (
        <div className={cx('', { 'container-spacing': true })}>
            <div
                className={cx('header-container', {
                    'header-container__slide-show': isSlideShow,
                })}
            >
                <header
                    className={cx('header', {
                        'header__slide-show': isSlideShow,
                    })}
                >
                    {/* Mobile menu */}
                    <div
                        className={cx('mobile-menu', {
                            'd-none': true,
                            'd-xl-block': true,
                        })}
                    >
                        <SubMenuIcon
                            className={cx('mobile-menu__icon')}
                            onClick={() => setShowMobileMenu(true)}
                        ></SubMenuIcon>
                        <div className={cx('mobile-menu__menu-drawer')}>
                            <span
                                className={cx('menu-drawer__overlay', {
                                    show: showMobileMenu,
                                })}
                                onClick={handleMobileSubMenu}
                            ></span>
                            <div
                                className={cx('menu-drawer__inner', {
                                    show: showMobileMenu,
                                })}
                            >
                                <div className={cx('menu-drawer__header')}>
                                    <span
                                        className={cx('menu-drawer__heading')}
                                    >
                                        Menu
                                    </span>
                                    <Button
                                        className={cx('menu-drawer__close-btn')}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <CloseIcon
                                            width="1.5rem"
                                            height="1.5rem"
                                        ></CloseIcon>
                                    </Button>
                                </div>
                                <nav className={cx('menu-drawer__navbar')}>
                                    <NavLink
                                        to={config.routes.home}
                                        className={(nav) =>
                                            cx('menu-drawer__nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to={config.routes.shop}
                                        className={(nav) =>
                                            cx('menu-drawer__nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        Shop
                                    </NavLink>
                                    <NavLink
                                        to={config.routes.about}
                                        className={(nav) =>
                                            cx('menu-drawer__nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        About
                                    </NavLink>
                                    <div
                                        className={cx('menu-drawer__nav-item')}
                                        onClick={() =>
                                            setShowMobileSubMenu(true)
                                        }
                                    >
                                        <span>Pages</span>
                                        <RightArrowIcon></RightArrowIcon>
                                    </div>
                                </nav>
                            </div>
                            {/* Mobile sub menu */}
                            <div
                                className={cx('menu-drawer__content', {
                                    show: showMobileSubMenu,
                                })}
                            >
                                <div className={cx('mobile-sub-menu')}>
                                    <div
                                        className={cx(
                                            'mobile-sub-menu__header',
                                            {
                                                active: showMobileSubMenu,
                                            }
                                        )}
                                        onClick={() =>
                                            setShowMobileSubMenu(false)
                                        }
                                    >
                                        <RightArrowIcon
                                            className={cx(
                                                'mobile-sub-menu__icon'
                                            )}
                                        ></RightArrowIcon>
                                        <span>Pages</span>
                                    </div>
                                    <nav
                                        className={cx(
                                            'mobile-sub-menu__navbar'
                                        )}
                                    >
                                        <NavLink
                                            to={config.routes.blog}
                                            className={(nav) =>
                                                cx(
                                                    'mobile-sub-menu__nav-item',
                                                    { active: nav.isActive }
                                                )
                                            }
                                            onClick={handleMobileSubMenu}
                                        >
                                            Blog
                                        </NavLink>
                                        <NavLink
                                            to={config.routes.faq}
                                            className={(nav) =>
                                                cx(
                                                    'mobile-sub-menu__nav-item',
                                                    { active: nav.isActive }
                                                )
                                            }
                                            onClick={handleMobileSubMenu}
                                        >
                                            Faq
                                        </NavLink>
                                        <NavLink
                                            to={config.routes.contact}
                                            className={(nav) =>
                                                cx(
                                                    'mobile-sub-menu__nav-item',
                                                    { active: nav.isActive }
                                                )
                                            }
                                            onClick={handleMobileSubMenu}
                                        >
                                            Contact
                                        </NavLink>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navbar */}
                    <nav className={cx('navbar', { 'd-xl-none': true })}>
                        <NavLink
                            to={config.routes.home}
                            className={(nav) =>
                                cx('navbar-item', {
                                    active: nav.isActive,
                                })
                            }
                        >
                            <span className={cx('navbar-content')}>Home</span>
                        </NavLink>
                        <NavLink
                            to={config.routes.shop}
                            className={(nav) =>
                                cx('navbar-item', { active: nav.isActive })
                            }
                        >
                            <span className={cx('navbar-content')}>Shop</span>
                        </NavLink>
                        <NavLink
                            to={config.routes.about}
                            className={(nav) =>
                                cx('navbar-item', { active: nav.isActive })
                            }
                        >
                            <span className={cx('navbar-content')}>About</span>
                        </NavLink>

                        <Tippy
                            interactive
                            delay={[0, 300]}
                            offset={[18, 12]}
                            placement="bottom"
                            render={(attrs) => (
                                <div
                                    className={cx('sub-menu')}
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <div>
                                        <NavLink
                                            className={(nav) =>
                                                cx('sub-menu__item', {
                                                    active: nav.isActive,
                                                })
                                            }
                                            to={config.routes.blog}
                                        >
                                            Blog
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink
                                            className={(nav) =>
                                                cx('sub-menu__item', {
                                                    active: nav.isActive,
                                                })
                                            }
                                            to={config.routes.faq}
                                        >
                                            Faq
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink
                                            className={(nav) =>
                                                cx('sub-menu__item', {
                                                    active: nav.isActive,
                                                })
                                            }
                                            to={config.routes.contact}
                                        >
                                            Contact
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        >
                            <NavLink to={'#!'} className={cx('navbar-item')}>
                                <span className={cx('navbar-content')}>
                                    Pages
                                </span>
                            </NavLink>
                        </Tippy>
                    </nav>
                    {/* Logo */}
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <Image
                            src={images.logo}
                            alt="Logo"
                            fallback=""
                            className={cx('logo')}
                        ></Image>
                    </Link>
                    {/* Actions */}
                    <div className={cx('actions')}>
                        <span className={cx('icon')} onClick={handleSearch}>
                            <SearchIcon
                                width={'2.6rem'}
                                height={'2.6rem'}
                                className={cx('actions__icon')}
                            ></SearchIcon>
                        </span>
                        <div
                            className={cx('icon')}
                            onClick={() => setShowCartDrawer(true)}
                        >
                            <CartIcon
                                width={'2.6rem'}
                                height={'2.6rem'}
                                className={cx('actions__icon')}
                            ></CartIcon>
                            <span className={cx('quantity')}>1</span>
                        </div>
                        <span
                            className={cx('icon', { 'd-xl-none': true })}
                            onClick={() => setShowLoginModal(true)}
                        >
                            <UserIcon
                                width={'2.6rem'}
                                height={'2.6rem'}
                            ></UserIcon>
                        </span>
                    </div>
                </header>

                {isSlideShow && <SlideShow></SlideShow>}

                {showSearchModal && (
                    <SearchModal
                        handleCloseSearchModal={handleCloseSearchModal}
                    ></SearchModal>
                )}

                <CartWrapper
                    show={showCartDrawer}
                    handleCloseCartDrawer={handleCloseCartDrawer}
                >
                    <Cart handleCloseCartDrawer={handleCloseCartDrawer}></Cart>
                </CartWrapper>

                {showLoginModal && (
                    <LoginModal
                        handleCloseLoginModal={handleCloseLoginModal}
                    ></LoginModal>
                )}

                <Button
                    className={cx('scroll-to-top', {
                        show: showScrollToTop,
                    })}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <UpArrowIcon></UpArrowIcon>
                </Button>
            </div>
        </div>
    );
};

export default Header;
