import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import store from "./store";
import AppRoute from "./routes";

export function Root() {

    return (
        <Provider store={store}>
            <BrowserRouter baseanme={'/'}>
                <AppRoute/>
            </BrowserRouter>
        </Provider>
    );
}

ReactDOM.render( <Root />, document.getElementById( 'root' ) );
