import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home'
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


ReactDOM.render(
    <Router>
        <Home/>
    </Router>,
document.getElementById('root')
)
;


serviceWorker.unregister();
