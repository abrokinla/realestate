import React, { Component }  from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./Main";
import PropertyList from "./PropertyList";
import SearchResult from "./SearchResult";
import NewUser from "./forms/NewUser";
import NewAgent from "./forms/NewAgent";
import Login from "./forms/LoginForm";
import Admin from "./forms/AdminLogin";
import NewProperty from "./forms/NewProperty";
import AgentDashboard from "./dashboards/AgentDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
<<<<<<< HEAD
=======
import UserProfile from "./UserProfile";
>>>>>>> publish

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Main /> } />
                    <Route path="/properties" element={<PropertyList />} />                    
                    <Route path="/search" element={<SearchResult />} />                    
                    <Route path='/login' element={ <Login /> } />
                    <Route path='/admin/login' element={ <Admin /> } />
                    <Route path='/user-form' element={ <NewUser /> } />
                    <Route path='/agent-form' element={ <NewAgent /> } />
<<<<<<< HEAD
=======
                    <Route path='/userprofile' element={ <UserProfile /> } />
>>>>>>> publish
                    <Route path='/new-property-form' element={ <NewProperty /> } />                    
                    <Route path='/agent/dashboard' element={ <AgentDashboard /> } />
                    <Route path='/admin/dashboard' element={ <AdminDashboard /> } />
                </Routes>
            </BrowserRouter>
            );
    }
    }
    export default AppRouter;