import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import PackageList from "./components/package-list.component";
import PackageAdd from "./components/package-add.component";
import PackageUpdate from "./components/package-update.component";
import {Routes, Route, Link} from "react-router-dom";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/tutorials"} className="navbar-brand">
                    bezKoder
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/tutorials"} className="nav-link">
                            Tutorials
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/tutorials" element={<PackageList/>} />
                    <Route path="/add" element={<PackageAdd/>} />
                    {/*<Route path="/tutorials/:id" component={Tutorial} />*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
