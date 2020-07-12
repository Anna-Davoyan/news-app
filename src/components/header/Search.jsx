import React, {Component} from "react";
import { withRouter } from 'react-router';

class Search extends Component {
    state = {
        searchValue: '',
    };

    handleChange = (e) => {
        this.setState({searchValue: e.target.value})
    };
    handleSubmit = (e)=>{
        e.preventDefault();
        let path;
        if (this.props.categoryId) {
            path = `/category/${this.props.categoryId}/search/${this.state.searchValue}`
        } else {
            path = `/search/${this.state.searchValue}`
        }
        this.props.history.push(path);
    };

    render() {
        return (
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                <input
                    className="form-control sm-2 search-input"
                    type="search"
                    aria-label="Search"
                    placeholder="Search"
                    value={this.state.searchValue}
                    onChange={this.handleChange}
                />
                <button
                    className="btn btn-outline-success my-2 my-sm-0"
                >
                    Search
                </button>
            </form>
        )
    }
}

export default withRouter(Search);