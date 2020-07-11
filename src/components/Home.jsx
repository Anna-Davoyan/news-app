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
                        <Route exact path="/category/:id" component={News}/>
                        <Route exact path="/category/article/:name" component={Article}/>
                        <Route exact path="/search/:id" component={News}/>
                        <Route exact path="/category/search/:id" component={News}/>
                        <Route path="*" component={NotFoundPage}/>
                    </Switch>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Home;