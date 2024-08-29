import React from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import styles from './Login.module.scss';
import { CheckIcon, ErrorIcon } from '../../components/Icons';
import { Link } from 'react-router-dom';
import config from '../../config';

const cx = classNames.bind(styles);

const Login = () => {
    const links = [
        {
            to: config.routes.forgotPassword,
            name: 'Forgot your password?',
        },
        {
            to: config.routes.register,
            name: 'Sign Up',
        },
    ];

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
            password: Yup.string()
                .min(8, 'Your password must be at least 8 characters.')
                .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            //call api
            console.log(values);
        },
    });

    return (
        <form className={cx('form')} onSubmit={formik.handleSubmit}>
            <div className={cx('form__heading')}>
                <h1 className={cx('form__title')}>👋 Step into Style !</h1>
                <p className={cx('form__desc')}>
                    Aliquam vestibulum mauris eu velit imperdiet venenatis.
                    Clasent taciti sociosqu ad litora torquent per conubia
                    nostra
                </p>
            </div>
            {/* Email */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid: !formik.errors.email && formik.touched.email,
                    })}
                ></CheckIcon>
                <input
                    value={formik.values.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder={'Email'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.email}
                        </span>
                    </div>
                )}
            </div>
            {/* Password */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.password && formik.touched.password,
                    })}
                ></CheckIcon>
                <input
                    value={formik.values.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={'Password'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.password}
                        </span>
                    </div>
                )}
            </div>
            {links && (
                <div className={cx('form__links')}>
                    {links.map((link, index) => (
                        <Link key={index} to={link.to}>
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
            <Button
                type="submit"
                rounded
                primary
                className={cx('form__submit-btn')}
            >
                Sign in
            </Button>
        </form>
    );
};

export default Login;
