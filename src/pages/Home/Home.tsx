import React from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Feature from './components/Feature';
import VideoBanner from './components/VideoBanner';
import Specification from './components/Specification';
import Companion from './components/Companion';
import Abilities from './components/Abilities';
import HomeProduct from './components/HomeProduct';
import Testimonial from './components/Testimonial';
import News from './components/News';
import Contact from './components/Contact';

const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx('full-width')}>
            <div className={cx('container-s', { container: true })}>
                <Feature></Feature>
                <VideoBanner></VideoBanner>
                <Specification></Specification>
                <Companion></Companion>
                <Abilities></Abilities>
            </div>
            <div className={cx('', { container: true })}>
                <HomeProduct></HomeProduct>
            </div>
            <div className={cx('container-s', { container: true })}>
                <Testimonial></Testimonial>
                <News></News>
                <Contact></Contact>
            </div>
        </div>
    );
};

export default Home;
