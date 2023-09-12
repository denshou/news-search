import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import "./RootElement.css"


const RootElement = () => {
    return (
        <div className='nav'>
            <MainHeader/>
            <Outlet/>
        </div>
    );
};

export default RootElement;