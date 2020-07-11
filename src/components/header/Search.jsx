import React, {Component} from "react";
import {Link} from "react-router-dom";

class Search extends Component {
    handleChange = (e) => {
        this.props.handleChange(e.target.value);
    };
    onClickSearch = () => {
        this.props.clickSearchBtn()
    };

    render() {
        return (
            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    aria-label="Search"
                    placeholder="Search"
                    value={this.props.searchValue}
                    onChange={this.handleChange}
                />
                <Link
                    className="btn btn-outline-success my-2 my-sm-0"
                    onClick={this.onClickSearch}
                    to={this.props.to}
                >
                    Search
                </Link>
            </form>
        )
    }
}

export default Search;