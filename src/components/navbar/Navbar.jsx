import React, { useState } from 'react';
import logo from '../../assets/img/Guardehub.svg';

const NavLogo = () => {
    return (
        <div className='nav-logo-container'>
            <img
                src={logo}
                alt='Logo.svg'
                width='100%'
                height='100%'
            />
        </div>
    );
};

const NavButton = ({ text, onClickHandler, disabled }) => {
    return (
        <span onClick={onClickHandler} className={disabled ? 'disabled' : ''}>
            {text}
        </span>
    );
};

const reloadPage = () => {
      window.location.reload();
};

export const Navbar = ({ onChangeFilter, filtroActivo }) => {
    const [filterType, setFilterType] = useState('');

    const handleNavigateToTaskComplete = () => {
        setFilterType('complete');
        onChangeFilter('complete');
    };

    const handleNavigateToTaskIncomplete = () => {
        setFilterType('incomplete');
        onChangeFilter('incomplete');
    };

    return (
        <div className='nav-container'>
            <NavLogo />
            <div className='nav-buttons-container'>
                <NavButton text='Home' onClickHandler={reloadPage} disabled={filtroActivo} />
                <NavButton text='Tareas completadas' onClickHandler={handleNavigateToTaskComplete} disabled={filtroActivo} />
                <NavButton text='Tareas incompletas' onClickHandler={handleNavigateToTaskIncomplete} disabled={filtroActivo} />
            </div>
        </div>
    );
};
