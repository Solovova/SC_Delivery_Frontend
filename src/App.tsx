import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import PackageAdd from "./components/package/package-add.component";
import PackageList from "./components/package/package-list.component";


import {Routes, Route} from "react-router-dom";

import NavbarComponent from "./components/navbar/navbar.component"
import PackageUpdateLoader from "./components/package/package-update-loader.component";

function App() {
    return (
        <div className="container-xl h-100">
            <div className="row mt-3">
                <NavbarComponent/>
            </div>
            <div className="row mt-3">
                <Routes>
                    <Route path="/packages" element={<PackageList/>}/>
                    <Route path="/add" element={<PackageAdd/>}/>
                    <Route path="/update/:id" element={<PackageUpdateLoader/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
