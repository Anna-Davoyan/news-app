import React, {Component} from "react";
import {Link} from "react-router-dom";

class Search extends Component {
    state = {
        searchValue: '',
    };

    handleChange = (e) => {
        this.setState({searchValue: e.target.value})
    };

    render() {
        let path;
        if (this.props.categoryId) {
            path = `/category/${this.props.categoryId}/search/${this.state.searchValue}`
        } else {
            path = `/search/${this.state.searchValue}`
        }

        return (
            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    aria-label="Search"
                    placeholder="Search"
                    value={this.state.searchValue}
                    onChange={this.handleChange}
                />
                <Link
                    className="btn btn-outline-success my-2 my-sm-0"
                    to={{pathname: path}}
                >
                    Search
                </Link>
            </form>
        )
    }
}

export default Search;