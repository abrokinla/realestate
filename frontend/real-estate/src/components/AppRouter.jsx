import React, { Component }  from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./Main"
import PropertyList from "./PropertyList"

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path='/properties' element={ <PropertyList /> } />
                </Routes>
            </BrowserRouter>
            );
    }
    }
    export default AppRouter;