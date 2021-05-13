import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../components/app';

import home from "../components/pages/home";
import story from "../components/pages/story/story";
import requestName from "../components/pages/story/requestName";

export default function AppRoot() {
    return (
        <React.Suspense fallback={<h1>loading</h1>}>
            <Switch>
                <Layout>
                    <Route exact path={`/story/:id/name`} component={requestName}/>
                    <Route exact path={`/story/:id`} component={story}/>
                    <Route exact path={`/`} component={home}/>
                </Layout>
            </Switch>
        </React.Suspense>
    );
}