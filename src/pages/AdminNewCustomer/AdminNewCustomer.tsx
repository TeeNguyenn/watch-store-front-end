import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import styles from './AdminNewCustomer.module.scss';
import Image from '../../components/Image';
import images from '../../assets/images';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import Navbar from '../Dashboard/components/navbar';
import { useState } from 'react';
import * as authServices from '../../services/authServices';
import UserDTO from '../../dtos/UserDTO';
import { ErrorIcon } from '../../components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import PreLoader from '../../components/PreLoader';


const cx = classNames.bind(styles);

const AdminNewCustomer = () => {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);


    const notifyNewCustomerSuccess = () => {
        toast.success('Account registered! Check email to activate.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }; //error payment chua hien thong bao


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            country: '',
            address: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(40, 'Your first name must be under 40 characters.')
                .required('You must fill in this section.'),
            lastName: Yup.string().max(
                40,
                'Your last name must be under 40 characters.'
            ),
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.')
                .test(
                    'checkEmailExists',
                    'Email already existed.',
                    async (value) => {
                        if (!value) return true;
                        const res = await authServices.checkExistEmail(value);
                        return !res; // res trả về true nếu email đã được sử dụng, phủ định res thành false để hiển thị lỗi
                    }
                ),
            phoneNumber: Yup.string()
                .matches(/^0\d{9}$/, 'Phone number is invalid.')
                .required('You must fill in this section.'),
            password: Yup.string()
                .min(8, 'Your password must be at least 8 characters.')
                .required('You must fill in this section.')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password needs 8+ characters, uppercase, lowercase, number, special character.'
                ),
            // country: Yup.string()
            //     .max(20, 'Your first name must be under 20 characters.')
            //     .required('You must fill in this section.'),
            // address: Yup.string()
            //     .max(40, 'Your first name must be under 40 characters.')
            //     .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            const data: UserDTO = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone_number: values.phoneNumber,
                password: values.password,
                retype_password: values.password,
                role_ids: [2], //temp
            };
            const fetchApi = async () => {
                setLoading(true);
                const res = await authServices.register(data);
                if (res) {
                    formik.resetForm();
                    setLoading(false);
                    setTimeout(() => {
                        notifyNewCustomerSuccess();
                    }, 100);
                }
            };
            fetchApi();
        },
    });

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (

        <div className={cx('new')}>
            <ToastContainer />
            <div className={cx('new__top')}>
                <h1 className={cx('new__title')}>Add New User</h1>
            </div>
            <div className={cx('new__bottom')}>
                <div className={cx('new__left')}>
                    <Image
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : images.defaultAvatar
                        }
                        alt="avatar"
                        className={cx('new__avatar')}
                    ></Image>
                </div>
                <div className={cx('new__right')}>
                    <form action="" className={cx('form')} onSubmit={formik.handleSubmit}>
                        <div className={cx('form__input')}>
                            <label htmlFor="file">
                                Image:{' '}
                                <DriveFolderUploadOutlined
                                    className={cx('form__icon')}
                                />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{
                                    display: 'none',
                                }}
                                onChange={(e) =>
                                    e.target.files &&
                                    setFile(e.target.files[0])
                                }
                            />
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="firstName">First name</label>
                            <input
                                value={formik.values.firstName}
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your first name"
                            />
                            {formik.errors.firstName && formik.touched.firstName && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.4rem" height="1.4rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.firstName}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="country">Country</label>
                            <input
                                value={formik.values.country}
                                type="text"
                                name="country"
                                id="country"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your country"
                            />
                            {formik.errors.country && formik.touched.country && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.4rem" height="1.4rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.country}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="lastName">Last name</label>
                            <input
                                value={formik.values.lastName}
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={formik.handleChange}
                                placeholder="Enter your last name"
                            />
                            {formik.errors.lastName && formik.touched.lastName && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.lastName}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="phoneNumber">Phone</label>
                            <input
                                value={formik.values.phoneNumber + ''}
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your phone number"
                            />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.phoneNumber}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="email">Email</label>
                            <input
                                value={formik.values.email}
                                type="email"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your email"
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
                        <div className={cx('form__input')}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={formik.values.address}
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your address"
                            />
                            {formik.errors.address && formik.touched.address && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.address}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="password">Password</label>
                            <input
                                value={formik.values.password}
                                type="password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your password"
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
                        <Button
                            primary
                            type="submit"
                            className={cx('form__btn')}
                        >
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdminNewCustomer;
