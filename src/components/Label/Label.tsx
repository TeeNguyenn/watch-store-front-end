import React from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';
import {
    CheckNoCircleIcon,
    CloseIcon,
    ErrorLabelIcon,
    ProcessingLabelIcon,
} from '../Icons';

const cx = classNames.bind(styles);

interface LabelProps {
    success?: boolean;
    unfulfilled?: boolean;
    warning?: boolean;
    processing?: boolean;
    fail?: boolean;
    title?: string;
    paymentStatus?: boolean;
    status?: string;
    paymentMethod?: string;
    cancel?: boolean;
    modifier?: boolean;
    style?: any;
}

const Label = ({
    title,
    success = false,
    unfulfilled = false,
    warning = false,
    processing = false,
    fail = false,
    paymentStatus = false,
    status,
    paymentMethod,
    cancel,
    modifier = false,
    style
}: LabelProps) => {
    if (paymentMethod === 'Payment via VNPay') {
        if (!paymentStatus) {
            fail = true;
            title = 'FAILED';
        } else {
            switch (status) {
                case 'PENDING':
                    processing = true;
                    title = 'PENDING';
                    break;
                case 'PAID':
                    success = true;
                    title = 'PAID';
                    break;
                case 'FAILED':
                    fail = true;
                    title = 'FAILED';
                    break;
                default:
                    break;
            }
        }
    } else {
        switch (status?.toUpperCase()) {
            case 'PENDING':
                processing = true;
                title = 'PENDING';
                break;
            case 'PAID':
                success = true;
                title = 'PAID';
                break;
            case 'FAILED':
                fail = true;
                title = 'FAILED';
                break;
            default:
                break;
        }
    }
    return (
        <div
            className={cx('label', {
                success,
                unfulfilled,
                warning,
                processing,
                fail,
                cancel,
                modifier
            })}
        >
            <span>{title}</span>
            {success && <CheckNoCircleIcon></CheckNoCircleIcon>}
            {unfulfilled && <CheckNoCircleIcon></CheckNoCircleIcon>}
            {warning && <ErrorLabelIcon></ErrorLabelIcon>}
            {processing && <ProcessingLabelIcon></ProcessingLabelIcon>}
            {fail && <ErrorLabelIcon></ErrorLabelIcon>}
            {cancel && <CloseIcon width="0.7rem" height="0.7rem"></CloseIcon>}
        </div>
    );
};

export default Label;
