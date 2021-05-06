/* IMPORTS */
import React from 'react';

function Perfil(){   
    const usuario_nombre = JSON.parse(sessionStorage.getItem("Usuari")).usuari;
        return(
            <div>
                <h1>{usuario_nombre}</h1>
            </div>
        )    
    }

export default Perfil;