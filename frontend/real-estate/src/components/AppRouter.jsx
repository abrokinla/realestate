import React, { Component }  from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./Main";
import PropertyList from "./PropertyList";
import NewUser from "./forms/NewUser";
import Login from "./forms/LoginForm";
import UserDashboard from "./UserDashboard";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path="/properties" element={<PropertyList />} />                    
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/user-form' element={ <NewUser /> } />
                    <Route path='/user/dashboard' element={ <UserDashboard /> } />
                </Routes>
            </BrowserRouter>
            );
    }
    }
    export default AppRouter;