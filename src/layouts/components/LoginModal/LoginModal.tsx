import React from 'react';
import classNames from 'classnames/bind';

import Button from '../../../components/Button';
import styles from './LoginModal.module.scss';
import { CloseIcon } from '../../../components/Icons';
import AccountForm from '../../../components/AccountForm';

const cx = classNames.bind(styles);

interface LoginModalProps {
    handleCloseLoginModal: () => void;
}

const LoginModal = ({ handleCloseLoginModal }: LoginModalProps) => {
    const inputs = [
        { type: 'email', name: 'email', placeholder: 'Email' },
        { type: 'password', name: 'password', placeholder: 'Password' },
    ];

    const links = [
        {
            to: '/recover',
            name: 'Forgot your password?',
        },
        {
            to: '/register',
            name: 'Sign Up',
        },
    ];

    return (
        <div className={cx('login-modal')}>
            <div className={cx('login-modal__inner')}>
                <Button
                    className={cx('login-modal__close-btn')}
                    onClick={handleCloseLoginModal}
                >
                    <CloseIcon width="1.4rem" height="1.4rem"></CloseIcon>
                </Button>
                <AccountForm
                    title="👋 Step into Style !"
                    desc="Aliquam vestibulum mauris eu velit imperdiet venenatis. Clasent taciti sociosqu ad litora torquent per conubia nostra"
                    inputs={inputs}
                    btnName="Sign in"
                    links={links}
                ></AccountForm>
            </div>
        </div>
    );
};

export default LoginModal;
