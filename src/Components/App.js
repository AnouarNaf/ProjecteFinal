import React, { useState, useEffect } from 'react';
import '../Styles/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import Perfil from './perfil';
import Login from './login';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={ Login }/>
                    <PrivateRoute exact path="/perfil" component={ Perfil }/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
        </BrowserRouter>        
    );
}

export default App;