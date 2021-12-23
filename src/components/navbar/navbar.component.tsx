import React, {Component} from "react";
import {Link} from "react-router-dom";
type Props = {};

type State = {};

export default class NavbarComponent extends Component<Props, State>{

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/packages"} className="navbar-brand">
                        Delivery
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/packages"} className="nav-link">
                                Packages
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                </nav>
            </div>
        );
    }
}