import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Button from '../../components/Button';
import styles from './Checkout.module.scss';
import config from '../../config';
import Image from '../../components/Image';
import images from '../../assets/images';
import { CartIcon, ErrorIcon } from '../../components/Icons';
import Checkbox from '../../components/Checkbox';

const cx = classNames.bind(styles);

const Checkout = () => {
    const [checkRadio, setCheckRadio] = useState(1);
    const [provinceList, setProvinceList] = useState<any[]>([]);
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [communeList, setCommuneList] = useState<any[]>([]);

    const refProvinceSelect = React.useRef<HTMLSelectElement>(null);
    const refDistrictSelect = React.useRef<HTMLSelectElement>(null);

    // fake user status
    const currentUser = false;

    //call api address
    useEffect(() => {
        axios
            .get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => {
                setProvinceList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChangeProvince = (event: any) => {
        // Call api district
        axios
            .get(
                `https://esgoo.net/api-tinhthanh/2/${refProvinceSelect.current?.value}.htm`
            )
            .then((response) => {
                setDistrictList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        formik.handleChange(event);
    };

    const handleChangeDistrict = (event: any) => {
        // Call api commune
        axios
            .get(
                `https://esgoo.net/api-tinhthanh/3/${refDistrictSelect.current?.value}.htm`
            )
            .then((response) => {
                setCommuneList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        formik.handleChange(event);
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            telephone: '',
            email: '',
            province_city: '',
            district: '',
            commune: '',
            payment: 'cod',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('You must fill in this section.'),
            telephone: Yup.string().required('You must fill in this section.'),
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
            province_city: Yup.string().required(
                'You must fill in this section.'
            ),
            district: Yup.string().required('You must fill in this section.'),
            commune: Yup.string().required('You must fill in this section.'),
            payment: Yup.string().required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            //call api
            console.log(values);

            // Get commune name
            // const value: any = communeList.filter(
            //     (item) => item.id === values.commune
            // );
            // console.log(value[0].full_name);
        },
    });

    return (
        <div className={cx('checkout')}>
            <header className={cx('banner')}>
                <div className={cx('banner__inner')}>
                    <Link
                        to={config.routes.home}
                        className={cx('banner__logo-link')}
                    >
                        <Image
                            src={images.logo}
                            alt="Logo"
                            className={cx('banner__logo')}
                        ></Image>
                    </Link>
                    <div
                        className={cx('banner__cart', {
                            'primary-hover': true,
                        })}
                    >
                        <CartIcon width="2.4rem" height="2.4rem"></CartIcon>
                    </div>
                </div>
            </header>
            <div className={cx('checkout__inner')}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={cx('checkout__row', { row: true })}>
                        {/* Info */}
                        <div
                            className={cx('', {
                                col: true,
                                'col-7': true,
                                'col-lg-12': true,
                            })}
                        >
                            <div className={cx('checkout__info')}>
                                <div className={cx('checkout__info-inner')}>
                                    <main className={cx('checkout__main')}>
                                        {/* Contact */}
                                        <div
                                            className={cx('checkout__contact')}
                                        >
                                            <div
                                                className={cx(
                                                    'checkout__contact-row'
                                                )}
                                            >
                                                <h2
                                                    className={cx(
                                                        'checkout__title'
                                                    )}
                                                >
                                                    Contact
                                                </h2>
                                                <Link
                                                    to={config.routes.login}
                                                    className={cx(
                                                        'checkout__login-link',
                                                        {
                                                            'd-none':
                                                                currentUser,
                                                        }
                                                    )}
                                                >
                                                    Log in
                                                </Link>
                                            </div>

                                            <div
                                                className={cx(
                                                    'checkout__field'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'checkout__group'
                                                    )}
                                                >
                                                    <input
                                                        value={
                                                            formik.values
                                                                .fullName
                                                        }
                                                        type="text"
                                                        className={cx(
                                                            'checkout__input'
                                                        )}
                                                        id="fullName"
                                                        name="fullName"
                                                        placeholder=""
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="fullName"
                                                        className={cx(
                                                            'checkout__label'
                                                        )}
                                                    >
                                                        Full name
                                                    </label>
                                                    {formik.errors.fullName &&
                                                        formik.touched
                                                            .fullName && (
                                                            <div
                                                                className={cx(
                                                                    'checkout__error-mess'
                                                                )}
                                                            >
                                                                <ErrorIcon
                                                                    width="1.5rem"
                                                                    height="1.5rem"
                                                                ></ErrorIcon>
                                                                <span
                                                                    className={cx(
                                                                        ''
                                                                    )}
                                                                >
                                                                    {
                                                                        formik
                                                                            .errors
                                                                            .fullName
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'checkout__group'
                                                    )}
                                                >
                                                    <input
                                                        value={
                                                            formik.values
                                                                .telephone
                                                        }
                                                        type="number"
                                                        className={cx(
                                                            'checkout__input'
                                                        )}
                                                        id="telephone"
                                                        name="telephone"
                                                        placeholder=""
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="telephone"
                                                        className={cx(
                                                            'checkout__label'
                                                        )}
                                                    >
                                                        Mobile phone number
                                                    </label>
                                                    {formik.errors.telephone &&
                                                        formik.touched
                                                            .telephone && (
                                                            <div
                                                                className={cx(
                                                                    'checkout__error-mess'
                                                                )}
                                                            >
                                                                <ErrorIcon
                                                                    width="1.5rem"
                                                                    height="1.5rem"
                                                                ></ErrorIcon>
                                                                <span
                                                                    className={cx(
                                                                        ''
                                                                    )}
                                                                >
                                                                    {
                                                                        formik
                                                                            .errors
                                                                            .telephone
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <input
                                                    value={formik.values.email}
                                                    type="email"
                                                    className={cx(
                                                        'checkout__input'
                                                    )}
                                                    id="email"
                                                    name="email"
                                                    placeholder=""
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className={cx(
                                                        'checkout__label'
                                                    )}
                                                >
                                                    Email
                                                </label>
                                                {formik.errors.email &&
                                                    formik.touched.email && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .email
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* Delivery */}
                                        <div
                                            className={cx('checkout__delivery')}
                                        >
                                            <h2
                                                className={cx(
                                                    'checkout__title'
                                                )}
                                            >
                                                Delivery
                                            </h2>
                                            {/* Country */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    name="country"
                                                    id="country"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                >
                                                    <option value="">
                                                        Country/Region
                                                    </option>
                                                    <option value="VN" selected>
                                                        Vietnam
                                                    </option>
                                                </select>
                                            </div>
                                            {/* Province/City */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    ref={refProvinceSelect}
                                                    value={
                                                        formik.values
                                                            .province_city
                                                    }
                                                    name="province_city"
                                                    id="province_city"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                    onChange={
                                                        handleChangeProvince
                                                    }
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">
                                                        Province/City
                                                    </option>
                                                    {provinceList.map(
                                                        (province) => (
                                                            <option
                                                                key={
                                                                    province.id
                                                                }
                                                                value={
                                                                    province.id
                                                                }
                                                            >
                                                                {
                                                                    province.full_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {formik.errors.province_city &&
                                                    formik.touched
                                                        .province_city && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .province_city
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                            {/* district */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    ref={refDistrictSelect}
                                                    value={
                                                        formik.values.district
                                                    }
                                                    name="district"
                                                    id="district"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                    onChange={
                                                        handleChangeDistrict
                                                    }
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">
                                                        District
                                                    </option>
                                                    {districtList.map(
                                                        (district) => (
                                                            <option
                                                                key={
                                                                    district.id
                                                                }
                                                                value={
                                                                    district.id
                                                                }
                                                            >
                                                                {
                                                                    district.full_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {formik.errors.district &&
                                                    formik.touched.district && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .district
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                            {/* commune */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    value={
                                                        formik.values.commune
                                                    }
                                                    name="commune"
                                                    id="commune"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">
                                                        Ward/Commune
                                                    </option>
                                                    {communeList.map(
                                                        (commune) => (
                                                            <option
                                                                key={commune.id}
                                                                value={
                                                                    commune.id
                                                                }
                                                            >
                                                                {
                                                                    commune.full_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {formik.errors.commune &&
                                                    formik.touched.commune && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .commune
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                            {/* Apartment */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    className={cx(
                                                        'checkout__input'
                                                    )}
                                                    id="apartment"
                                                    name="apartment"
                                                    placeholder="Apartment, suite, etc.
                                                        (optional)"
                                                />

                                                <span
                                                    className={cx(
                                                        'checkout__error'
                                                    )}
                                                ></span>
                                            </div>
                                            <Checkbox
                                                className={cx(
                                                    'checkout__checkbox'
                                                )}
                                                name={'save'}
                                                label="Save this information for next time"
                                            ></Checkbox>
                                        </div>
                                        {/* Payment method */}
                                        <div
                                            className={cx('checkout__payment')}
                                        >
                                            <h2
                                                className={cx(
                                                    'checkout__title'
                                                )}
                                            >
                                                Payment method
                                            </h2>
                                            <div
                                                className={cx(
                                                    'checkout__payment-list'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'checkout__radio-wrapper'
                                                    )}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value="cod"
                                                        id="cod"
                                                        checked={
                                                            checkRadio === 1 &&
                                                            formik.values
                                                                .payment ===
                                                                'cod'
                                                        }
                                                        hidden
                                                        className={cx(
                                                            'checkout__radio'
                                                        )}
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="cod"
                                                        className={cx(
                                                            'checkout__radio-label'
                                                        )}
                                                        onClick={() =>
                                                            setCheckRadio(1)
                                                        }
                                                    >
                                                        Cash on Delivery
                                                    </label>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'checkout__radio-wrapper'
                                                    )}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        id="vnpay"
                                                        value="vnpay"
                                                        hidden
                                                        checked={
                                                            checkRadio === 2 &&
                                                            formik.values
                                                                .payment ===
                                                                'vnpay'
                                                        }
                                                        className={cx(
                                                            'checkout__radio'
                                                        )}
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="vnpay"
                                                        className={cx(
                                                            'checkout__radio-label'
                                                        )}
                                                        onClick={() =>
                                                            setCheckRadio(2)
                                                        }
                                                    >
                                                        Payment via VNPAY
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className={cx(
                                                'checkout__submit-btn',
                                                {
                                                    'd-lg-none': true,
                                                }
                                            )}
                                        >
                                            Pay now
                                        </Button>
                                    </main>
                                    <footer
                                        className={cx('checkout__footer', {
                                            'd-lg-none': true,
                                        })}
                                    >
                                        <p
                                            className={cx(
                                                'checkout__footer-label'
                                            )}
                                        >
                                            All rights reserved tee
                                        </p>
                                    </footer>
                                </div>
                            </div>
                        </div>
                        {/* Calculate */}
                        <div
                            className={cx('', {
                                col: true,
                                'col-5': true,
                                'col-lg-12': true,
                            })}
                        >
                            <div className={cx('checkout__calculate')}>
                                <h2
                                    className={cx('checkout__title', {
                                        'd-none': true,
                                        'd-lg-block': true,
                                    })}
                                >
                                    Order summary
                                </h2>
                                <div className={cx('checkout__product-list')}>
                                    <div
                                        className={cx('checkout__product-item')}
                                    >
                                        <div
                                            className={cx(
                                                'checkout__product-media'
                                            )}
                                        >
                                            <Image
                                                src={images.productImg}
                                                className={cx(
                                                    'checkout__product-img'
                                                )}
                                            ></Image>
                                            <p
                                                className={cx(
                                                    'checkout__product-quantity'
                                                )}
                                            >
                                                1
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                'checkout__product-content'
                                            )}
                                        >
                                            <p
                                                className={cx(
                                                    'checkout__product-name'
                                                )}
                                            >
                                                Digital Smartwatch
                                            </p>
                                            <p
                                                className={cx(
                                                    'checkout__product-styles'
                                                )}
                                            >
                                                Dusty Grey / 1.5 Inches /
                                                Leather
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                'checkout__product-price'
                                            )}
                                        >
                                            $1000
                                        </div>
                                    </div>
                                    <div
                                        className={cx('checkout__product-item')}
                                    >
                                        <div
                                            className={cx(
                                                'checkout__product-media'
                                            )}
                                        >
                                            <Image
                                                src={images.productImg}
                                                className={cx(
                                                    'checkout__product-img'
                                                )}
                                            ></Image>
                                            <p
                                                className={cx(
                                                    'checkout__product-quantity'
                                                )}
                                            >
                                                1
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                'checkout__product-content'
                                            )}
                                        >
                                            <p
                                                className={cx(
                                                    'checkout__product-name'
                                                )}
                                            >
                                                Digital Smartwatch
                                            </p>
                                            <p
                                                className={cx(
                                                    'checkout__product-styles'
                                                )}
                                            >
                                                Dusty Grey / 1.5 Inches /
                                                Leather
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                'checkout__product-price'
                                            )}
                                        >
                                            $1000
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('checkout__summary')}>
                                    <div
                                        className={cx('checkout__summary-row')}
                                    >
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            Subtotal
                                        </span>
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            {' '}
                                            $1000
                                        </span>
                                    </div>
                                    <div
                                        className={cx('checkout__summary-row')}
                                    >
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            Shipping
                                        </span>
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            {' '}
                                            Enter shipping address
                                        </span>
                                    </div>
                                    <div
                                        className={cx('checkout__summary-row')}
                                    >
                                        <span
                                            className={cx(
                                                'checkout__summary-total'
                                            )}
                                        >
                                            Total
                                        </span>
                                        <span
                                            className={cx(
                                                'checkout__summary-price'
                                            )}
                                        >
                                            {' '}
                                            $1000
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className={cx('checkout__submit-btn', {
                                        'd-none': true,
                                        'd-lg-block': true,
                                    })}
                                >
                                    Pay now
                                </Button>
                                <footer
                                    className={cx('checkout__footer', {
                                        'd-none': true,
                                        'd-lg-block': true,
                                    })}
                                >
                                    <p className={cx('checkout__footer-label')}>
                                        All rights reserved tee
                                    </p>
                                </footer>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
