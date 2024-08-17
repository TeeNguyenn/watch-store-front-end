import React from 'react';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import styles from './ActiveAccount.module.scss';
import images from '../../assets/images/account';
import Image from '../../components/Image';
import config from '../../config';

const cx = classNames.bind(styles);

const ActiveAccount = () => {
    // fake status
    const isRegister = true;

    return (
        <div className={cx('active-account', { 'container-spacing': true })}>
            <div className={cx('active-account__inner')}>
                <div
                    className={cx('active-account__img-wrapper', {
                        custom: isRegister,
                    })}
                >
                    <Image
                        src={
                            isRegister
                                ? images.activeAccount
                                : images.successAccount
                        }
                        alt="Account image"
                        className={cx('active-account__img')}
                    ></Image>
                </div>
                <h1 className={cx('active-account__heading')}>
                    Account successfully registered!
                </h1>
                <p className={cx('active-account__desc')}>
                    Please check your email to activate your account. We've sent
                    you an activation link. Simply click the link in the email
                    to complete your registration and start using our services.
                </p>
                {isRegister ? (
                    <Button
                        href="https://mail.google.com"
                        target="_blank"
                        className={cx('active-account__btn')}
                    >
                        Active now
                    </Button>
                ) : (
                    <Button
                        to={config.routes.login}
                        className={cx('active-account__btn')}
                    >
                        Sign in
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ActiveAccount;
