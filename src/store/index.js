import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from "../reducers";

let appliedMiddleware = applyMiddleware( thunkMiddleware );

const store = createStore( rootReducer,
    compose(
        appliedMiddleware,
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function ( f ) {
            return f;
        }
    )
);

export default store;