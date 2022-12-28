import React, { Component }  from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./Main";
import PropertyList from "./PropertyList";
import Login from "../forms/LoginForm";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path="/properties" element={<PropertyList />} />                    
                    <Route path='login' element={ <Login /> } />
                </Routes>
            </BrowserRouter>
            );
    }
    }
    export default AppRouter;