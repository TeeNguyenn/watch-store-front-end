import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout, AdminLayout } from './layouts';

import ScrollToTop from './components/ScrollToTop';
import { jwtDecode } from 'jwt-decode';
import PrivateRoute from './routes/PrivateRoute';
import { useAppDispatch } from './redux/store';
import { getWishlist } from './components/Wishlist/wishlistSlice';
import { getCart } from './layouts/components/Cart/cartSlice';



function App() {
    const dispatch = useAppDispatch()
    const currentUser = localStorage.getItem('user_id');


    // Get customerId from url
    const { customerId } = useParams();


    let customerIdNumber = 0;
    try {
        customerIdNumber = parseInt(customerId + '');
        if (Number.isNaN(customerIdNumber)) {
            customerIdNumber = 0;
        }
    } catch (error) {
        customerIdNumber = 0;
        console.log('Error:', error);
    }

    // get wishlist from db
    useEffect(() => {
        dispatch(getWishlist({
            id: customerId || currentUser + '',
            currentPage: 1,
            limit: 6
        }))

    }, []);

    return (
        <Router>
            {/* <ScrollToTop></ScrollToTop> */}
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout: any = DefaultLayout;

                    // If page has a layout different default layout
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        // No layout
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <route.component></route.component>
                                </Layout>
                            }
                        ></Route>
                    );
                })}
                {privateRoutes.map((route, index) => {
                    let Layout: any = DefaultLayout;

                    // If page has a layout different default layout
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        // No layout
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <route.component></route.component>
                                    </Layout>
                                </PrivateRoute>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
