import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Reviews.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import { renderRating } from '../../utils/Functions';

const cx = classNames.bind(styles);

// fake reviewList
// const reviewList = [1];
const reviewList = [1, 2, 3, 4, 5, 6];

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAll, setViewAll] = useState(false);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };
    return (
        <div className={cx('review')}>
            <div className={cx('review__container')}>
                <table className={cx('review__table')}>
                    <thead>
                        <tr>
                            <th
                                className={cx('review__heading')}
                                style={{
                                    minWidth: '220px',
                                }}
                            >
                                product
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '10%', minWidth: '100px' }}
                            >
                                rating
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{
                                    minWidth: '480px',
                                }}
                            >
                                review
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '10%' }}
                            >
                                status
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '12%' }}
                            >
                                date
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '7%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviewList.map((orderItem, index) => (
                            <tr key={index}>
                                <td className={cx('review__product')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('review__link', {
                                            'line-clamp': true,
                                            'line-clamp-1': true,
                                        })}
                                    >
                                        Fitbit Sense Advanced Smartwatch with
                                        Tools Fitbit Sense Advanced Smartwatch
                                        with Tools Fitbit Sense Advanced
                                        Smartwatch with Tools
                                    </Link>
                                </td>
                                <td className={cx('review__rating')}>
                                    {renderRating(4.5)}
                                </td>
                                <td className={cx('review__desc')}>
                                    <p
                                        className={cx('', {
                                            'line-clamp': true,
                                        })}
                                    >
                                        As others mentioned, the team behind
                                        this theme is super responsive. I sent a
                                        message during the weekend, fully
                                        expecting a response As others
                                        mentioned, the team behind this theme is
                                        super responsive. I sent a message
                                        during the weekend, fully expecting a
                                        response
                                    </p>
                                </td>
                                <td className={cx('review__status')}>
                                    <Label success title="approved"></Label>
                                </td>
                                <td className={cx('review__date')}>
                                    Nov 04, 6:53 PM
                                </td>
                                <td className={cx('review__options')}>
                                    <div className={cx('review__dropdown')}>
                                        <Tippy
                                            // visible={showDropdownProfile}
                                            interactive
                                            offset={[0, 3]}
                                            placement="bottom-end"
                                            trigger="click"
                                            // onClickOutside={() => setShowDropdownProfile(false)}
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'review__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        view
                                                    </Button>
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        export
                                                    </Button>
                                                    <hr />
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        remove
                                                    </Button>
                                                </div>
                                            )}
                                        >
                                            <Button
                                                className={cx('review__btn')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </Button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/* Review list hide */}
                        {reviewList.map((orderItem, index) => (
                            <tr
                                key={index}
                                className={cx('review__item-hide', {
                                    show: viewAll,
                                })}
                            >
                                <td className={cx('review__product')}>
                                    <Link
                                        to={'#!'}
                                        className={cx('review__link', {
                                            'line-clamp': true,
                                            'line-clamp-1': true,
                                        })}
                                    >
                                        AAA Fitbit Sense Advanced Smartwatch
                                        with Tools Fitbit Sense Advanced
                                        Smartwatch with Tools Fitbit Sense
                                        Advanced Smartwatch with Tools
                                    </Link>
                                </td>
                                <td className={cx('review__rating')}>
                                    {renderRating(4.5)}
                                </td>
                                <td className={cx('review__desc')}>
                                    <p
                                        className={cx('', {
                                            'line-clamp': true,
                                        })}
                                    >
                                        As others mentioned, the team behind
                                        this theme is super responsive. I sent a
                                        message during the weekend, fully
                                        expecting a response As others
                                        mentioned, the team behind this theme is
                                        super responsive. I sent a message
                                        during the weekend, fully expecting a
                                        response
                                    </p>
                                </td>
                                <td className={cx('review__status')}>
                                    <Label success title="approved"></Label>
                                </td>
                                <td className={cx('review__date')}>
                                    Nov 04, 6:53 PM
                                </td>
                                <td className={cx('review__options')}>
                                    <div className={cx('review__dropdown')}>
                                        <Tippy
                                            // visible={showDropdownProfile}
                                            interactive
                                            offset={[0, 3]}
                                            placement="bottom-end"
                                            trigger="click"
                                            // onClickOutside={() => setShowDropdownProfile(false)}
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'review__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        view
                                                    </Button>
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        export
                                                    </Button>
                                                    <hr />
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        remove
                                                    </Button>
                                                </div>
                                            )}
                                        >
                                            <Button
                                                className={cx('review__btn')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </Button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('review__bottom')}>
                <div className={cx('review__view')}>
                    <p
                        className={cx('review__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        1 to 6 items of 15
                    </p>
                    {/* <Button
                        className={cx('review__view-btn')}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={() => setViewAll(!viewAll)}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button> */}
                </div>
                <div className={cx('review__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={5}
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
