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

            <div className="container mt-3">
                <Routes>
                    <Route path="/packages" element={<PackageList/>} />
                    <Route path="/add" element={<PackageAdd/>} />
                    <Route path="/update/:id" element={<PackageUpdate/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
