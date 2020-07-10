import React, {Component} from 'react';
import logo from '../../logo.png';
import Menu from "./Menu";
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/'>
                        <img className='img-responsive logo' src={logo} alt=''/>
                    </Link>
                    <Menu/>
                </nav>
            </div>
        )
    }
}

export default Header;