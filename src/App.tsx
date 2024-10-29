import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import { DefaultLayout, AdminLayout } from './layouts';

import ScrollToTop from './components/ScrollToTop';
import { jwtDecode } from 'jwt-decode';
import PrivateRoute from './routes/PrivateRoute';



function App() {

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
