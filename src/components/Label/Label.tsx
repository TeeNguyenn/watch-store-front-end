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
    title: string;
}

const Label = ({
    title,
    success = false,
    unfulfilled = false,
    warning = false,
    processing = false,
    fail = false,
}: LabelProps) => {
    return (
        <div
            className={cx('label', {
                success,
                unfulfilled,
                warning,
                processing,
                fail,
            })}
        >
            {title}
            {success && <CheckNoCircleIcon></CheckNoCircleIcon>}
            {unfulfilled && <CheckNoCircleIcon></CheckNoCircleIcon>}
            {warning && <ErrorLabelIcon></ErrorLabelIcon>}
            {processing && <ProcessingLabelIcon></ProcessingLabelIcon>}
            {fail && <CloseIcon width="0.7rem" height="0.7rem"></CloseIcon>}
        </div>
    );
};

export default Label;
