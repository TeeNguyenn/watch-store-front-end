import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SearchModal.module.scss';
import { CloseIcon, SearchIcon } from '../../../components/Icons';
import Button from '../../../components/Button';
import CardItem from '../CardItem';
import ProductIcons from '../../../components/ProductIcons';

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

    return (
        <div className={cx('search-modal')}>
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
                    <div className={cx('input-box')}>
                        <input
                            ref={refInput}
                            value={searchValue}
                            className={cx('input')}
                            type="text"
                            placeholder="Search"
                            onChange={handleChange}
                        />
                        {searchValue && (
                            <Button
                                className={cx('reset-btn')}
                                onClick={handleClear}
                            >
                                <CloseIcon
                                    width="1.1rem"
                                    height="1.1rem"
                                ></CloseIcon>
                            </Button>
                        )}
                        <Button className={cx('search-btn')}>
                            <SearchIcon width="2rem" height="2rem"></SearchIcon>
                        </Button>
                    </div>
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
                        <div
                            className={cx('card-list__inner', {
                                row: true,
                                'row-cols-5': true,
                            })}
                        >
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                            <CardItem></CardItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
