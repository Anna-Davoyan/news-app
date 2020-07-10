import React, {Component} from 'react'
import Header from "./header/Header";
import '../style.css';
import News from "./News";
import { Route, Switch } from 'react-router-dom';
import Article from "./Article";
import NotFoundPage from "./error/NotFoundPage";

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
                <footer className="page-footer font-small blue">
                    <div className="footer-copyright text-center py-3">
                        © 2020 Copyright:
                        <a href="https://www.news24.com/"> news24.com</a>
                    </div>
                </footer>
            </>
        )
    }
}

export default Home;