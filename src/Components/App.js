import React from 'react';
import '../Styles/App.css';
import {
    Switch,
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import Perfil from './Perfil';
import Login from './login';
import PrivateRoute from './PrivateRoute';
import Entrenamiento from './Entrenamiento';
import Settings from './Settings';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/login" component={ Login }/>
                    <PrivateRoute exact path="/Perfil" component={ Perfil }/>
                    <PrivateRoute exact path="/Entrenamiento" component={ Entrenamiento }/>
                    <PrivateRoute exact path="/Pvp" component={ Perfil }/>
                    <PrivateRoute exact path="/Friends" component={ Perfil }/>
                    <PrivateRoute exact path="/Opcions" component={ Settings }/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;