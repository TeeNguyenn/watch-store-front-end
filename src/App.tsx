import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';

function App() {
    return (
        <Router>
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
            </Routes>
        </Router>
    );
}

export default App;
