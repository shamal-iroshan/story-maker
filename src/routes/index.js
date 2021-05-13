import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../components/app';

import home from "../components/pages/home";

export default function AppRoot() {
    return (
        <React.Suspense fallback={<h1>loading</h1>}>
            <Switch>
                <Layout>
                    <Route path={`/`} component={home}/>
                </Layout>
            </Switch>
        </React.Suspense>
    );
}