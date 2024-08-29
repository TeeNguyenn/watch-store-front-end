import React from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import styles from './CustomerInfo.module.scss';
import { RemoveIcon, ResetIcon } from '../Icons';
import Image from '../Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CustomerInfo = () => {
    return (
        <div>
            <div className={cx('row')}>
                <h2 className={cx('heading')}>Profile</h2>
                <div className={cx('actions')}>
                    {/* admin */}
                    <Button
                        className={cx('btn', 'delete-btn', { 'd-none': true })}
                        leftIcon={
                            <RemoveIcon
                                width="1.28rem"
                                height="1.28rem"
                            ></RemoveIcon>
                        }
                    >
                        Delete customer
                    </Button>
                    <Button
                        className={cx('btn', 'reset-btn')}
                        leftIcon={<ResetIcon></ResetIcon>}
                    >
                        Reset password
                    </Button>
                </div>
            </div>
            <div className="row gx-2 gy-lg-2">
                <div className="col col-8 col-xxl-7 col-lg-12">
                    <div className={cx('info')}>
                        <div className={cx('info__top')}>
                            <div className={cx('info__media')}>
                                <input
                                    type="file"
                                    id="avatarFile"
                                    hidden
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="avatarFile"
                                    className={cx('info__avatar-wrapper')}
                                >
                                    <Image
                                        src="https://i.pinimg.com/originals/01/9a/8a/019a8a35ccbc35d91313ab3f0285ab59.jpg"
                                        alt="avatar"
                                        className={cx('info__avatar')}
                                    ></Image>
                                    <div className={cx('info__add-avatar')}>
                                        <svg
                                            width={'45'}
                                            hanging={'45'}
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="camera"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                                            ></path>
                                        </svg>
                                    </div>
                                </label>
                            </div>
                            <div className={cx('info__content')}>
                                <h3 className={cx('info__name')}>
                                    Tee Lazinatov
                                </h3>
                                <p className={cx('info__status')}>
                                    Joined 3 months ago
                                </p>
                                <div className={cx('info__socials')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('info__social')}
                                    >
                                        <svg
                                            width={'14'}
                                            height={'16'}
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="linkedin"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                                            ></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        to={'#!'}
                                        className={cx('info__social')}
                                    >
                                        <svg
                                            width={'14'}
                                            height={'16'}
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="facebook"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                                            ></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        to={'#!'}
                                        className={cx('info__social')}
                                    >
                                        <svg
                                            width={'14'}
                                            height={'16'}
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="twitter"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('info__bottom')}>
                            <div className={cx('info__group')}>
                                <h6 className={cx('info__label')}>
                                    Total Spent
                                </h6>
                                <h4 className={cx('info__text')}>$894</h4>
                            </div>
                            <div className={cx('info__group')}>
                                <h6 className={cx('info__label')}>
                                    Last Order
                                </h6>
                                <h4 className={cx('info__text')}>1 week ago</h4>
                            </div>
                            <div className={cx('info__group')}>
                                <h6 className={cx('info__label')}>
                                    Total Orders
                                </h6>
                                <h4 className={cx('info__text')}>97</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-4  col-xxl-5 col-lg-12">
                    <div className={cx('address')}>
                        <div className={cx('address__row')}>
                            <h3 className={cx('address__title')}>
                                Default Address
                            </h3>
                            <Button className={cx('address__modifier-btn')}>
                                <svg
                                    width={'16'}
                                    height={'16'}
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="pen"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                                    ></path>
                                </svg>
                            </Button>
                        </div>
                        <div className={cx('address__content')}>
                            <div className={cx('address__group')}>
                                <h5 className={cx('address__label')}>
                                    Address
                                </h5>
                                <input
                                    type="text"
                                    className={cx('address__place')}
                                    value={'Bình Phú, Gò Công Tây, Tiền Giang '}
                                    disabled
                                />
                            </div>
                            <div className={cx('address__group')}>
                                <h5 className={cx('address__label')}>Email</h5>
                                <Link
                                    to={'mailto:tee@gmail.com'}
                                    className={cx('address__mail')}
                                >
                                    tee@gmail.com
                                </Link>
                            </div>
                            <div className={cx('address__group')}>
                                <h5 className={cx('address__label')}>Phone</h5>
                                <Link
                                    to={'tel:+1234567890'}
                                    className={cx('address__tel')}
                                >
                                    <input
                                        type="text"
                                        className={cx('address__phone')}
                                        value={'+1234567890'}
                                        disabled
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={cx('address__actions')}>
                            <Button className={cx('address__btn')}>
                                Cancel
                            </Button>
                            <Button primary className={cx('address__btn')}>
                                Save change
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
