import React, {Component} from 'react'
import Header from "./header/Header";
import '../style.css';
import News from "./News";
import {Route, Switch} from 'react-router-dom';
import Article from "./Article";
import {NotFoundPage} from "./error/NotFoundPage";
import {Footer} from "./Footer";

class Home extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className='wrapper'>
                    <Switch>
                        <Route exact path="/" component={News}/>
                        <Route exact path="/search/:query" component={News}/>
                        <Route exact path="/category/:id" component={News}/>
                        <Route exact path="/category/:id/search/:query" component={News}/>
                        <Route exact path="/article/:name" component={Article}/>
                        <Route path="*" component={NotFoundPage}/>
                    </Switch>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Home;