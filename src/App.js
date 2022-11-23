import React from 'react';
import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import Auth from "./auth/Auth";
import Levels from './levels/Levels'
import Game from './game/Game'
import { ctx } from './context'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/darkly/bootstrap.min.css";

const App = () => {
    const [username, setUsername] = useState()
    
    return (
        <ctx.Provider value={{username, setUsername}}>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Auth />}/>
                    <Route path='/levels' element={<Levels />}/>
                    <Route path='/game' element={<Game />}/>
                </Routes>
            </div>
        </ctx.Provider>
    );
}

export default App