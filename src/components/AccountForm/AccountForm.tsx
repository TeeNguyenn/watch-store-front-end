import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '../Button';
import styles from './AccountForm.module.scss';
import images from '../../assets/images';
import Image from '../Image';

const cx = classNames.bind(styles);

interface InputProps {
    type: string;
    name?: string;
    placeholder?: string;
}

interface LinkProps {
    to: string;
    name: string;
}

interface AccountFormProps {
    title: string;
    desc: string;
    inputs: Array<InputProps>;
    btnName: string;
    links?: Array<LinkProps>;
}

const AccountForm = ({
    title,
    desc,
    inputs,
    btnName,
    links,
}: AccountFormProps) => {
    return (
        <form action="/login" method="post" className={cx('form')}>
            <div className={cx('form__heading')}>
                <h1 className={cx('form__title')}>{title}</h1>
                <p className={cx('form__desc')}>{desc}</p>
            </div>
            {inputs.map((input, index) => (
                <div className={cx('form__group')} key={index}>
                    <Image
                        src={images.check}
                        className={cx('form__icon')}
                    ></Image>
                    <input
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        className={cx('form__input')}
                    />
                </div>
            ))}
            {links && (
                <div className={cx('form__links')}>
                    {links.map((link, index) => (
                        <Link key={index} to={link.to}>
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
            <Button rounded primary className={cx('form__submit-btn')}>
                {btnName}
            </Button>
        </form>
    );
};

export default AccountForm;
