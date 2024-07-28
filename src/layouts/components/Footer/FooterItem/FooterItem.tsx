import React from 'react';
import classNames from 'classnames/bind';

import styles from '../Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface ListProps {
    to: string;
    name: string;
}

interface FooterItemProps {
    title: string;
    list: Array<ListProps>;
}

const FooterItem = ({ title, list }: FooterItemProps) => {
    return (
        <div className={cx('footer-item')}>
            <h2 className={cx('footer-item__title')}>{title}</h2>
            <ul className={cx('footer-item__list')}>
                {list.map((item, index) => (
                    <li key={index} className={cx('footer-item__item')}>
                        <Link
                            to={item.to}
                            className={cx('footer-item__item-link')}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterItem;
