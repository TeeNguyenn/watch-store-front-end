import React from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '../../../../components/Button';
import styles from './Companion.module.scss';
import Heading from '../Heading';
import Image from '../../../../components/Image';
import images from '../../../../assets/images/home';
import ColorItem from '../../../../components/ColorItem';
import ProductIcons from '../../../../components/ProductIcons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Companion = () => {
    return (
        <section className={cx('companion')}>
            <Heading
                subHeading="SMART FEATURES"
                title="The Ultimate Companion"
                desc="Sed Ut Perspiunde Omnis Iste Voluptatem Accusantium Doloremque Laudantium, Totam Rem Aperiam, Eaque Ipsa Quae Ab Illo Inventore Veritatis Et Quasi Architecto Beatae Vitae Dicta Sunt Explicabo."
            ></Heading>
            <div className={cx('companion__wrapper')}>
                <Image
                    src={images.companionImg}
                    className={cx('companion__img')}
                ></Image>
                <div className={cx('companion__item')}>
                    <Button className={cx('companion__btn')}></Button>

                    <div className={cx('companion__popup')}>
                        <div className={cx('companion__content')}>
                            <div className={cx('card')}>
                                <Link to="#!" className={cx('card__media')}>
                                    <Image
                                        src={images.popupProductImg}
                                        className={cx('card__img')}
                                    ></Image>
                                    <ProductIcons
                                        className={cx('show')}
                                    ></ProductIcons>
                                </Link>
                                <div className={cx('card__body')}>
                                    <h3>
                                        <Button
                                            to="#!"
                                            className={cx('card__heading')}
                                        >
                                            Unisex Smartwatch
                                        </Button>
                                    </h3>
                                    <div className={cx('card__color-options')}>
                                        <ColorItem color="#7989b8"></ColorItem>
                                        <ColorItem color="#54ad68"></ColorItem>
                                        <ColorItem color="#b0e1e7"></ColorItem>
                                    </div>
                                    <p className={cx('card__price')}>
                                        $14.3369
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Companion;
