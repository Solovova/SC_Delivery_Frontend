import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import PackageListMain from "./components/package/package-list-main.component";
import PackageAdd from "./components/package-add.component";
import PackageUpdate from "./components/package-update.component";
import {Routes, Route, Link} from "react-router-dom";

import NavbarComponent from "./components/navbar/navbar.component"

function App() {
    return (
        <div className="container-xl mt-3">
            <div className="h-100">
                <NavbarComponent/>

                <div className="container-xl mt-3">
                    <Routes>
                        <Route path="/packages" element={<PackageListMain/>}/>
                        <Route path="/add" element={<PackageAdd/>}/>
                        <Route path="/update/:id" element={<PackageUpdate/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
