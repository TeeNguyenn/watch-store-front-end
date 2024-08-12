import React from 'react';
import classNames from 'classnames/bind';

import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';
import { BreadcrumbSepIcon } from '../Icons';

const cx = classNames.bind(styles);

interface BreadcrumbProps {
    title: string;
    links: string[];
}

const Breadcrumb = ({ title, links }: BreadcrumbProps) => {
    return (
        <div className={cx('breadcrumb')}>
            <h1 className={cx('title')}>{title}</h1>
            <div className={cx('links')}>
                <Link to={links[0]} className={cx('link')}>
                    {links[0]}
                </Link>
                <BreadcrumbSepIcon className={cx('sep')}></BreadcrumbSepIcon>
                <span className={cx('link')}>{links[1]}</span>
            </div>
        </div>
    );
};

export default Breadcrumb;
