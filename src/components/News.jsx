import React, {Component} from 'react'
import {constants} from './constant';
import {Link} from "react-router-dom";
import Search from "./header/Search";
import {HandleError} from "./error/HandleError";
import {Loader} from "./Loading";
import {NoResult} from "./error/NoResult";

class News extends Component {
    state = {
        articleList: [],
        loading: false,
        error: false
    };

    componentDidMount() {
        this.fetchDataSearch();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.fetchDataSearch()
        }
    }

    fetchDataSearch = () => {
        const {id, query} = this.props.match.params;

        let url = 'https://newsapi.org/v2/everything?';

        const qParams = {apiKey: constants.API_KEY};

        if (!id) {
            qParams['q'] = '-bitcoin';
        } else {
            qParams['sources'] = id;
        }

        if (query) {
            qParams['q'] = query;
        }


        const queryString = Object.keys(qParams)
            .map(k => k + '=' + encodeURIComponent(qParams[k]))
            .join('&');

        url += queryString;

        this.setState({loading: true, articleList: []});

        fetch(url)
            .then(response => {
                return response.json().then(data => {
                    if (data.status === 'error') {
                        this.setState({error: true})
                    } else {
                        this.setState({articleList: data.articles, error: false})
                    }
                })
            })
            .catch(error => {
                this.setState({error: true})
            })
            .finally(() => {
                this.setState({loading: false})
            });
    };


    render() {
        if (this.state.error) {
            return <HandleError/>
        }

        if (this.state.loading) {
            return <Loader/>
        }

        if (this.state.articleList.length === 0) {
            return <NoResult/>
        }

        return (
            <>
                {this.props.match.params.id && (<div className="topnav mb-3">
                    <span>{this.state.articleList[0].source.name}</span>
                    <div className="topnav-right">
                        <Search
                            categoryId={this.props.match.params.id}
                        />
                    </div>
                </div>)
                }

                <div className="card-columns">
                    {this.state.articleList.map((article) => (
                        <Link
                            key={article.url}
                            to={{
                                pathname: `/article/${article.title}`,
                                state: {article}
                            }}
                        >
                            <div className="card">
                                <img className="card-img-top" style={{width: '100%'}}
                                     src={article.urlToImage}/>
                                <div className="card-body">
                                    <h6 className="card-title">{article.title}</h6>
                                    <p className="btn btn-more float-right">MORE</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

}

export default News;