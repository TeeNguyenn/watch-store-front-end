import React from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import { CheckIcon, ErrorIcon } from '../../components/Icons';
import styles from './ForgotPassword.module.scss';
import config from '../../config';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            //call api
            console.log(values);
        },
    });

    return (
        <div className={cx('forgot-password')}>
            <form className={cx('form')} onSubmit={formik.handleSubmit}>
                <div className={cx('form__heading')}>
                    <h1 className={cx('form__title', 'forgot-password__title')}>
                        Reset your password
                    </h1>
                    <p className={cx('form__desc')}>
                        We will send you an email to reset your password
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
                            <ErrorIcon
                                width="1.5rem"
                                height="1.5rem"
                            ></ErrorIcon>
                            <span className={cx('form__error-title')}>
                                {formik.errors.email}
                            </span>
                        </div>
                    )}
                </div>
                <Button
                    type="submit"
                    rounded
                    primary
                    className={cx('form__submit-btn')}
                >
                    Submit
                </Button>
                <div>
                    <Button
                        to={config.routes.login}
                        className={cx('forgot-password__cancel-btn', {
                            'primary-hover': true,
                        })}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
