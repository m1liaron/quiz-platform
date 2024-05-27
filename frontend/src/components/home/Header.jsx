import React from 'react';
import AuthButton from "./AuthButton.jsx";

const Header = () => {
    const token = localStorage.getItem('token');
    return (
        <div
            className='w-100 h-25 p-4 justify-content-between d-flex align-items-center'
            style={{backgroundColor: '#78B8F3'
        }}>
            <h1 className='text-white'>Вікторини</h1>
            {token ? (
                <h3>Вітаю</h3>
            ) : <AuthButton/>}
        </div>
    );
};

export default Header;