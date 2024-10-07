import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import Button from '../../../../components/Button';
import styles from './Review.module.scss';
import { renderRating } from '../../../../utils/Functions';
import Image from '../../../../components/Image';
import images from '../../../../assets/images/home';
import {
    faArrowUpFromBracket,
    faStar as starFill,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackModel from '../../../../models/FeedbackModel';

const cx = classNames.bind(styles);

interface ReviewProps {
    feedbackList?: FeedbackModel[];
}

const Review = ({ feedbackList }: ReviewProps) => {
    const [sortBy, setSortBy] = useState('Most Recent');
    const [visible, setVisible] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleSortBy = (name: string) => {
        if (name === sortBy) {
            return;
        }
        setSortBy(name);
        setVisible(false);
    };

    return (
        <div className={cx('review')}>
            <div className={cx('review__header')}>
                <h2 className={cx('review__title')}>Customer Reviews</h2>
                <div className={cx('review__row-stars')}>
                    {/* Summary */}
                    <div className={cx('review__summary')}>
                        <div className={cx('review__summary-inner')}>
                            <div className={cx('review__summary-stars')}>
                                {renderRating(5)}
                            </div>
                            <span className={cx('review__summary-average')}>
                                5.00 out of 5
                            </span>
                        </div>
                        <div className={cx('review__summary-text')}>
                            Based on 1 review
                        </div>
                    </div>
                    {/* Histogram */}
                    <div className={cx('review__histogram')}>
                        {/* 5 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(5)}
                            </div>
                            <div className={cx('review__histogram-bar')}></div>
                            <div className={cx('review__histogram-frequency')}>
                                1
                            </div>
                        </div>
                        {/* 4 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(4)}
                            </div>
                            <div className={cx('review__histogram-bar')}></div>
                            <div className={cx('review__histogram-frequency')}>
                                0
                            </div>
                        </div>
                        {/* 3 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(3)}
                            </div>
                            <div className={cx('review__histogram-bar')}></div>
                            <div className={cx('review__histogram-frequency')}>
                                0
                            </div>
                        </div>
                        {/* 2 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(2)}
                            </div>
                            <div className={cx('review__histogram-bar')}></div>
                            <div className={cx('review__histogram-frequency')}>
                                0
                            </div>
                        </div>
                        {/* 1 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(1)}
                            </div>
                            <div className={cx('review__histogram-bar')}></div>
                            <div className={cx('review__histogram-frequency')}>
                                0
                            </div>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className={cx('review__actions')}>
                        <Button
                            rounded
                            primary
                            className={cx('review__actions-btn')}
                            onClick={() => setShowReviewForm(!showReviewForm)}
                        >
                            {!showReviewForm
                                ? 'Write a review'
                                : 'Cancel review'}
                        </Button>
                        <div
                            className={cx('review__form-inner', {
                                show: showReviewForm,
                            })}
                        >
                            <div>
                                <form action="" className={cx('review-form')}>
                                    <div className={cx('review-form__title')}>
                                        Write a review
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor=""
                                            className={cx('review-form__label')}
                                        >
                                            Rating
                                        </label>
                                        <div
                                            className={cx('review-form__stars')}
                                        >
                                            <input
                                                type="radio"
                                                name="rate"
                                                id="rate-5"
                                                className=""
                                            />
                                            <label
                                                htmlFor="rate-5"
                                                className="star-5 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                name="rate"
                                                id="rate-4"
                                                className=""
                                            />
                                            <label
                                                htmlFor="rate-4"
                                                className="star-4 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                name="rate"
                                                id="rate-3"
                                                className=""
                                            />
                                            <label
                                                htmlFor="rate-3"
                                                className="star-3 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                name="rate"
                                                id="rate-2"
                                                className=""
                                            />
                                            <label
                                                htmlFor="rate-2"
                                                className="star-2 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                name="rate"
                                                id="rate-1"
                                                className=""
                                            />
                                            <label
                                                htmlFor="rate-1"
                                                className="star-1 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Review Title
                                        </label>
                                        <input
                                            id="review-form__input"
                                            type="text"
                                            className={cx('review-form__input')}
                                            placeholder="Give your review a title"
                                        />
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Review
                                        </label>
                                        <textarea
                                            id="review-form__input"
                                            rows={5}
                                            className={cx('review-form__input')}
                                            placeholder="Write your comments here"
                                        />
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor=""
                                            className={cx('review-form__label')}
                                        >
                                            Picture/Video (optional)
                                        </label>
                                        <div
                                            className={cx(
                                                'review-form__file-wrapper'
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowUpFromBracket}
                                            />
                                            <input
                                                type="file"
                                                multiple
                                                className={cx(
                                                    'review-form__file'
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="review-form__input"
                                            className={cx('review-form__input')}
                                            placeholder="Enter your name (public)"
                                        />
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            id="review-form__input"
                                            className={cx('review-form__input')}
                                            placeholder="Enter your email (private)"
                                        />
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <p className={cx('review-form__desc')}>
                                            How we use your data: We’ll only
                                            contact you about the review you
                                            left, and only if necessary. By
                                            submitting your review, you agree to
                                            Judge.me’s terms, privacy and
                                            content policies.
                                        </p>
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <Button
                                            className={cx('review-form__btn')}
                                        >
                                            Cancel review
                                        </Button>
                                        <Button
                                            className={cx('review-form__btn')}
                                            type="submit"
                                            primary
                                        >
                                            Submit Review
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('review__row-actions')}>
                <Tippy
                    visible={visible}
                    interactive
                    delay={[0, 300]}
                    placement="bottom-start"
                    onClickOutside={() => setVisible(false)}
                    render={(attrs) => (
                        <div className={cx('sort__options')}>
                            <label
                                htmlFor="option-1"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-1"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Most Recent',
                                    })}
                                    onClick={() => handleSortBy('Most Recent')}
                                >
                                    Most Recent
                                </span>
                            </label>
                            <label
                                htmlFor="option-2"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-2"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Highest Rating',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Highest Rating')
                                    }
                                >
                                    Highest Rating
                                </span>
                            </label>
                            <label
                                htmlFor="option-3"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-3"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Lowest Rating',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Lowest Rating')
                                    }
                                >
                                    Lowest Rating
                                </span>
                            </label>
                            <label
                                htmlFor="option-4"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-4"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Only Pictures',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Only Pictures')
                                    }
                                >
                                    Only Pictures
                                </span>
                            </label>
                            <label
                                htmlFor="option-5"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-5"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Pictures First',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Pictures First')
                                    }
                                >
                                    Pictures First
                                </span>
                            </label>
                            <label
                                htmlFor="option-6"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-6"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Videos First',
                                    })}
                                    onClick={() => handleSortBy('Videos First')}
                                >
                                    Videos First
                                </span>
                            </label>
                            <label
                                htmlFor="option-7"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-7"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Most Helpful',
                                    })}
                                    onClick={() => handleSortBy('Most Helpful')}
                                >
                                    Most Helpful
                                </span>
                            </label>
                        </div>
                    )}
                >
                    <p
                        className={cx('sort__title')}
                        onClick={() => setVisible(!visible)}
                    >
                        {sortBy}
                        <span className={cx('sort__title-icon')}></span>
                    </p>
                </Tippy>
            </div>
            <div className={cx('review__body')}>
                {feedbackList?.map((item, index) => (
                    <div key={item.feedbackId} className={cx('review__item')}>
                        <div className={cx('review__profile-wrapper')}>
                            <Image
                                src={images.testimonialImg01}
                                className={cx('review__profile-img')}
                            ></Image>
                        </div>
                        <div className={cx('review__top')}>
                            <p className={cx('review__author')}>Tee</p>
                            <div className={cx('review__stars')}>
                                {renderRating(item.rate || 0)}
                            </div>
                            <div className={cx('review__timestamp')}>
                                05/21/2024
                            </div>

                            <div className={cx('review__content')}>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
