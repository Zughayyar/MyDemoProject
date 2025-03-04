import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
        .then(() => {
            logout();
            navigate('/');
        })
        .catch(error => console.log(error));
    };

    return (
        <Button type="primary" onClick={handleLogout} className="logout-button" danger>
            Logout
        </Button>
    );
};

export default LogoutButton;