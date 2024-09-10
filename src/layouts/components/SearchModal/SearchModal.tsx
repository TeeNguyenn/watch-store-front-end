import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import styles from './SearchModal.module.scss';
import CardItem from '../CardItem';
import SearchBar from '../../../components/SearchBar';
import * as productServices from '../../../services/productServices';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

interface SearchModalProps {
    handleCloseSearchModal: () => void;
}

const SearchModal = ({ handleCloseSearchModal }: SearchModalProps) => {
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState<any[]>([]);

    // Get keyword from url
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    //Call API
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const recommendProducts = await productServices.getAllProduct(0, 6);

            if (recommendProducts) {
                setProductList(recommendProducts.result);
            }
            setLoading(false);
        };
        fetchApi();
    }, []);

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 300,
        // autoplay: true,
        // autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: false,
        // infinite: true,
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
                <SearchBar
                    handleCloseSearchModal={handleCloseSearchModal}
                    keyword={keyword}
                ></SearchBar>
                <div className={cx('search-modal__body')}>
                    <h3 className={cx('recommend-label')}>
                        Recommended products
                    </h3>
                    <div className={cx('card-list')}>
                        <div className="slider-container">
                            <Slider {...settings}>
                                {productList.map((productItem) => (
                                    <CardItem
                                        productItem={productItem}
                                    ></CardItem>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
