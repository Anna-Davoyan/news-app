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
        searchValue: null,
        error: false
    };

    componentDidMount() {
        this.fetchDataSearch(this.props.match.params.id, null, this.state.searchValue);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.fetchDataSearch(this.props.match.params.id, prevProps.match.params.id, this.state.searchValue)
        }
    }

    handleChange = (searchValue) => {
        this.setState({searchValue})
    };

    fetchDataSearch = (id, prevId, searchValue) => {
        let url = 'https://newsapi.org/v2/everything?';
        if (!id) {
            url += `q=-bitcoin`;
        } else {
            if (searchValue) {
                url += `sources=${prevId}&qInTitle=${this.props.location.state.search}`;
            } else {
                if (this.props.location.state) {
                    url += `qInTitle=${id}`;
                } else {
                    url += `sources=${id}`;
                }
            }
        }
        url += `&apiKey=${constants.API_KEY}`;

        this.setState({loading: true, articleList: []});

        fetch(url)
            .then(response => {
                return response.json().then(data => {
                    console.log(data)
                    this.setState({articleList: data.articles,error: false})
                })
            })
            .catch(error => {
                this.setState({error: true})
            })
            .finally(() => {
                this.setState({loading: false, searchValue: ''})
            });
    };


    render() {
        const checkIsCategoryPage = window.location.pathname.split('/');
        if (this.state.error) {
            return <HandleError/>
        } else {
            if (this.state.loading) {
                return <Loader/>
            } else {
                if (this.state.articleList.length === 0) {
                        return <NoResult/>
                } else {
                    return (
                        <>
                            {checkIsCategoryPage[1] === 'category' ?
                                <div className="topnav mb-3">
                                    <span>{this.state.articleList[0].source.name}</span>
                                    <div className="topnav-right">
                                        <Search
                                            searchValue={this.state.searchValue}
                                            handleChange={this.handleChange}
                                            clickSearchBtn={() => {
                                            }}
                                            to={{
                                                pathname: `/category/search/${this.state.searchValue}`,
                                                state: {search: this.state.searchValue}
                                            }}
                                        />
                                    </div>
                                </div>

                                : ''}
                            <div className="card-columns">

                                {this.state.articleList.map((element) => (
                                    <Link
                                        key={element.url}
                                        to={{
                                            pathname: `/category/article/${element.source.name}`,
                                            state: {article: element}
                                        }}
                                    >
                                        <div className="card">
                                            <img className="card-img-top" style={{width: '100%'}}
                                                 src={element.urlToImage}/>
                                            <div className="card-body">
                                                <h6 className="card-title">{element.title}</h6>
                                                <p className="btn btn-color">MORE</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )
                }
            }
        }
    }

}

export default News;