import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import {
    CartIcon,
    SearchIcon,
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

    if (showSearchModal || showCartDrawer) {
        document.body.classList.add('hide-scroll');
    } else {
        document.body.classList.remove('hide-scroll');
    }

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    return (
        <div className={cx('', { container: true })}>
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
                    {/* Navbar */}
                    <nav className={cx('navbar')}>
                        <NavLink
                            to={'/'}
                            className={(nav) =>
                                cx('navbar-item', {
                                    active: nav.isActive,
                                })
                            }
                        >
                            <span className={cx('navbar-content')}>Home</span>
                        </NavLink>
                        <NavLink
                            to={'/shop'}
                            className={(nav) =>
                                cx('navbar-item', { active: nav.isActive })
                            }
                        >
                            <span className={cx('navbar-content')}>Shop</span>
                        </NavLink>
                        <NavLink
                            to={'/about'}
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
                                className=""
                            ></SearchIcon>
                        </span>
                        <div
                            className={cx('icon')}
                            onClick={() => setShowCartDrawer(true)}
                        >
                            <CartIcon
                                width={'2.6rem'}
                                height={'2.6rem'}
                            ></CartIcon>
                            <span className={cx('quantity')}>1</span>
                        </div>
                        <span
                            className={cx('icon')}
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
