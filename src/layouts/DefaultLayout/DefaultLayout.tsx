import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
    children: JSX.Element;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;
