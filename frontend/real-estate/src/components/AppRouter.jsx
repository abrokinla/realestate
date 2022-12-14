import React, { Component }  from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./Main";
import PropertyList from "./PropertyList";
import NewUser from "./forms/NewUser";
import NewAgent from "./forms/NewAgent";
import Login from "./forms/LoginForm";
import Admin from "./forms/AdminLogin";
import UserDashboard from "./UserDashboard";
import AgentDashboard from "./AgentDashboard";
import AdminDashboard from "./AdminDashboard";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path="/properties" element={<PropertyList />} />                    
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/admin/login' element={ <Admin /> } />
                    <Route path='/user-form' element={ <NewUser /> } />
                    <Route path='/agent-form' element={ <NewAgent /> } />
                    <Route path='/user/dashboard' element={ <UserDashboard /> } />
                    <Route path='/agent/dashboard' element={ <AgentDashboard /> } />
                    <Route path='/admin/dashboard' element={ <AdminDashboard /> } />
                </Routes>
            </BrowserRouter>
            );
    }
    }
    export default AppRouter;