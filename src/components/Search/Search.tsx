import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import styles from './Search.module.scss';
import { CloseIcon, SearchIcon } from '../Icons';

const cx = classNames.bind(styles);

interface SearchProps {
    className?: string;
}

const Search = ({ className }: SearchProps) => {
    const refInput = useRef<HTMLInputElement | null>(null);

    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInputValue = e.target.value;

        if (!searchInputValue.startsWith(' ')) {
            setSearchValue(searchInputValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        refInput.current?.focus();
    };

    return (
        <div className={cx('input-box', className)}>
            <input
                ref={refInput}
                value={searchValue}
                className={cx('input')}
                type="text"
                placeholder="Search"
                onChange={handleChange}
            />
            {searchValue && (
                <Button className={cx('reset-btn')} onClick={handleClear}>
                    <CloseIcon width="1.1rem" height="1.1rem"></CloseIcon>
                </Button>
            )}
            <Button className={cx('search-btn')}>
                <SearchIcon width="2rem" height="2rem"></SearchIcon>
            </Button>
        </div>
    );
};

export default Search;
