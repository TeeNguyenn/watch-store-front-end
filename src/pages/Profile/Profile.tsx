import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import styles from './Profile.module.scss';
import CustomerInfo from '../../components/CustomerInfo';
import { CartIcon, MobileUserIcon, UserIcon } from '../../components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faHeart,
    faStar,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Orders from '../../components/Orders';
import Reviews from '../../components/Reviews';
import Wishlist from '../../components/Wishlist';
import PersonalInfo from '../PersonalInfo';

const cx = classNames.bind(styles);

const Profile = () => {
    const [showTabContent, setShowTabContent] = useState(1);
    return (
        <div className="container-spacing">
            <div className={cx('profile')}>
                <CustomerInfo></CustomerInfo>
                <div className={cx('profile__nav-list')}>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 1,
                        })}
                        onClick={() => setShowTabContent(1)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={
                                    <FontAwesomeIcon icon={faCartShopping} />
                                }
                            >
                                Orders
                            </Button>
                            <span className={cx('profile__nav-count')}>
                                (35)
                            </span>
                        </div>
                    </div>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 2,
                        })}
                        onClick={() => setShowTabContent(2)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={<FontAwesomeIcon icon={faStar} />}
                            >
                                Reviews
                            </Button>
                            <span className={cx('profile__nav-count')}>
                                (24)
                            </span>
                        </div>
                    </div>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 3,
                        })}
                        onClick={() => setShowTabContent(3)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={<FontAwesomeIcon icon={faHeart} />}
                            >
                                Wishlist
                            </Button>
                        </div>
                    </div>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 4,
                        })}
                        onClick={() => setShowTabContent(4)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={<FontAwesomeIcon icon={faUser} />}
                            >
                                Personal info
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 1,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <Orders></Orders>
                    </div>
                </div>
                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 2,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <Reviews></Reviews>
                    </div>
                </div>
                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 3,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <Wishlist></Wishlist>
                    </div>
                </div>
                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 4,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <PersonalInfo></PersonalInfo>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
