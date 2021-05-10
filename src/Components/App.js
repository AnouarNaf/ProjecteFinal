import React from 'react';
import '../Styles/App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import Perfil from './Perfil';
import Login from './login';
import PrivateRoute from './PrivateRoute';
import Entrenamiento from './Entrenamiento';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={ Login }/>
                    <PrivateRoute exact path="/perfil" component={ Perfil }/>
                    <PrivateRoute exact path="/Entrenamiento" component={ Entrenamiento }/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
        </BrowserRouter>        
    );
}

export default App;