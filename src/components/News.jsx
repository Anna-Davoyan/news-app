import React, {Component} from 'react'
import {constants} from './constant';
import {Link} from "react-router-dom";
import Search from "./header/Search";
import HandleError from "./error/HandleError";
import {Loader} from "./Loading";
import {NoResult} from "./error/NoResult";

class News extends Component {
    state = {
        articleList: [],
        loading: false,
        searchValue: '',
        error: false
    };

    componentDidMount() {
        this.props.location.state ?
            this.searchUrl() : this.fetchDataByCategory(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            if (this.state.searchValue) {
                this.fetchDataByCategory(prevProps.match.params.id)
            } else if (this.props.location.state) {
                this.searchUrl()
            } else {
                this.fetchDataByCategory(this.props.match.params.id)
            }
        }
    }

    handleChange = (searchValue) => {
        this.setState({searchValue})
    };

    searchUrl = () => {
        const searchValue = this.props.location.state.search;
        const url = `https://newsapi.org/v2/top-headlines?q=${searchValue}&apiKey=${constants.API_KEY}`;
        this.fetchDataBySearch(url);
    };

    fetchDataBySearch = (url) => {
        fetch(url).then(response => {
            return response.json().then(data => {
                this.setState({articleList: data.articles})
            })
        }).catch(error => {
            this.setState({error: true})
        }).finally(() => {
            this.setState({error: false})
        });
    };

    fetchDataByCategory = (id) => {
        let url = 'http://newsapi.org/v2/';
        if (this.state.searchValue) {
            const searchValue = this.state.searchValue.split(' ').join('%20')
            url += `top-headlines?sources=${id}&q=${searchValue}`;
        } else if (id) {
            url += `top-headlines?sources=${id}`;
        } else {
            url += 'everything?q=bitcoin'
        }
        url += `&apiKey=${constants.API_KEY}`;
        this.setState({loading: true, articleList: []});

        fetch(url)
            .then(response => {
                return response.json().then(data => {
                    this.setState({articleList: data.articles})
                })
            })
            .catch(error => {
                this.setState({error: true})
            })
            .finally(() => {
                this.setState({loading: false, searchValue: '', error: false})
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
                                <div className='mb-4'>
                                    <Search
                                        searchValue={this.state.searchValue}
                                        handleChange={this.handleChange}
                                        to={{
                                            pathname: `/category/search/${this.state.searchValue}`,
                                            state: {search: this.state.searchValue}
                                        }}
                                    />
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