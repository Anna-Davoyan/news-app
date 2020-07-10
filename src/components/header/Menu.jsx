import React, {Component} from "react";
import {NavLink, Link} from 'react-router-dom';
import ContactUs from "../ContactUs";
import Search from "./Search";
import {constants} from "../constant";

class Menu extends Component {

    state = {
        menuList: [],
        searchValue: '',
        articles: [],
        showMobileMenu: false,
        showContactUsModal: false
    };

    componentDidMount() {
        this.loadData()
    }

    handleChange = (searchValue) => {
        this.setState({searchValue})
    };
    handleMenuItemClick = () => {
        this.setState({
            searchValue: '',
            showMobileMenu: false
        })
    };

    handleMenuTogglerClick = (e) => {
        e.preventDefault();
        this.setState({showMobileMenu: !this.state.showMobileMenu});
    };

    handleContactUsClick = (e) => {
        e.preventDefault()
        this.setState({showContactUsModal: !this.state.showContactUsModal})
    };

    handleCloseModal = () => {
        this.setState({showContactUsModal: false})
    };

    loadData = () => {
        const url = `https://newsapi.org/v2/sources?apiKey=${constants.API_KEY}`
        fetch(url)
            .then(response => {
                return response.json().then(data => {
                    this.setState({menuList: [...data.sources.slice(0, 5)]})
                });
            }).catch(error => console.error(error));
    };


    render() {
        return (
            <>
                <button
                    onClick={this.handleMenuTogglerClick}
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>

                <div
                    className="collapse navbar-collapse "
                    id="navbarSupportedContent"
                    style={{display: (this.state.showMobileMenu) ? 'block' : 'none'}}
                >
                    <ul className="navbar-nav mr-auto ml-5">
                        <li className="nav-item ">
                            <NavLink className="nav-link" exact to='/'>Home</NavLink>
                        </li>
                        {this.state.menuList.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <NavLink
                                    className="nav-link"
                                    onClick={this.handleMenuItemClick}
                                    to={`/category/${item.id}`}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </NavLink>
                            </li>
                        ))}
                        <li className="nav-item">
                            <Link
                                onClick={this.handleContactUsClick}
                                className="nav-link"
                                to='contact-us'
                            >
                                Contact Us
                            </Link>
                        </li>

                    </ul>
                    <Search
                        searchValue={this.state.searchValue}
                        handleChange={this.handleChange}
                        to={{ pathname: `/search/${this.state.searchValue}`,
                            state: {search: this.state.searchValue}
                        }}
                    />
                </div>
                {this.state.showContactUsModal ?
                    <ContactUs
                        closeModal={this.handleCloseModal}
                        showHideModal={this.state.showContactUsModal}/>
                    : ""
                }
            </>
        )
    }

}

export default Menu;