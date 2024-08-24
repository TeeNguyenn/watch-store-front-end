import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import styles from './SearchModal.module.scss';
import { CloseIcon, SearchIcon } from '../../../components/Icons';
import Button from '../../../components/Button';
import CardItem from '../CardItem';
import Search from '../../../components/Search';

const cx = classNames.bind(styles);

interface SearchModalProps {
    handleCloseSearchModal: () => void;
}

const SearchModal = ({ handleCloseSearchModal }: SearchModalProps) => {
    const refInput = useRef<HTMLInputElement | null>(null);

    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInputValue = e.target.value;

        if (!searchInputValue.startsWith(' ')) {
            setSearchValue(searchInputValue);
        }
    };

    //Call API

    const handleClear = () => {
        setSearchValue('');
        refInput.current?.focus();
    };

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1199.98,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 991.98,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 767.98,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div className={cx('search-modal', { 'search-modal-slider': true })}>
            <div className={cx('modal-overlay')}></div>
            <div className={cx('search-modal__content')}>
                <div className={cx('search-modal__top')}>
                    <Button
                        onClick={handleCloseSearchModal}
                        className={cx('close-btn')}
                        leftIcon={
                            <CloseIcon
                                className={cx('icon')}
                                height="1.5rem"
                                width="1.5rem"
                            ></CloseIcon>
                        }
                    ></Button>
                    <h2 className={cx('title')}>What are you looking for ?</h2>
                    <Search className={cx('input-box')}></Search>
                    <div className={cx('popular')}>
                        <p className={cx('label')}>Popular searches:</p>
                        <Button href="#!" className={cx('btn')}>
                            Featured
                        </Button>
                        <Button href="#!" className={cx('btn')}>
                            Trendy
                        </Button>
                        <Button href="#!" className={cx('btn')}>
                            Sale
                        </Button>
                        <Button href="#!" className={cx('btn')}>
                            New
                        </Button>
                    </div>
                </div>
                <div className={cx('search-modal__body')}>
                    <h3 className={cx('recommend-label')}>
                        Recommended products
                    </h3>
                    <div className={cx('card-list')}>
                        <div className="slider-container">
                            <Slider {...settings}>
                                <CardItem soldOut></CardItem>
                                <CardItem></CardItem>
                                <CardItem></CardItem>
                                <CardItem></CardItem>
                                <CardItem></CardItem>
                                <CardItem></CardItem>
                                <CardItem></CardItem>
                                <CardItem></CardItem>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
