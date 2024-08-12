import React from 'react';
import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import Button from '../Button';
import { PagingLeftArrowIcon, PrevIcon, RightArrowIcon } from '../Icons';
import PrevArrow from '../../layouts/components/SlideShow/PrevArrow';

const cx = classNames.bind(styles);

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    pagination(presentPage: number): any;
}

const Pagination = ({
    currentPage,
    totalPage,
    pagination,
}: PaginationProps) => {
    // Số trang muốn hiển thị.VD: hiện 3 trang 1 2 3
    const pageList = [];

    if (currentPage === 1) {
        pageList.push(currentPage);
        // Hiện trang 2 nếu tổng số trang >= 2
        if (totalPage >= currentPage + 1) {
            pageList.push(currentPage + 1);
        }
        // Hiện trang 3 nếu tổng số trang >= 3
        if (totalPage >= currentPage + 2) {
            pageList.push(currentPage + 2);
        }
    } else if (currentPage === totalPage) {
        // Trang - 2
        if (currentPage >= 3) {
            pageList.push(currentPage - 2);
        }
        // Trang - 1
        if (currentPage >= 2) {
            pageList.push(currentPage - 1);
        }
        // Trang đó
        pageList.push(currentPage);
    } else if (currentPage > 1) {
        // Trang - 1
        if (currentPage >= 2) {
            pageList.push(currentPage - 1);
        }
        // Trang đó
        pageList.push(currentPage);
        // Trang + 1
        if (totalPage >= currentPage + 1) {
            pageList.push(currentPage + 1);
        }
    }

    return (
        <nav className={cx('pagination')}>
            <ul className={cx('pagination__list')}>
                <li>
                    <Button
                        className={cx('pagination__prev', {
                            hide: currentPage === 1,
                        })}
                        onClick={() => pagination(currentPage - 1)}
                    >
                        <PagingLeftArrowIcon></PagingLeftArrowIcon>
                    </Button>
                </li>
                {pageList.map((page, index) => (
                    <li>
                        <Button
                            className={cx('pagination__page', {
                                active: page === currentPage,
                            })}
                            onClick={() => pagination(page)}
                        >
                            {page.toString()}
                        </Button>
                    </li>
                ))}
                <li>
                    <Button
                        className={cx('pagination__next', {
                            hide: currentPage === totalPage,
                        })}
                        onClick={() => pagination(currentPage + 1)}
                    >
                        <PagingLeftArrowIcon></PagingLeftArrowIcon>
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;