import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userRegistrationService from '../../services/user-registration.service';

//로그아웃
const LogOut = () => {
    let navigate = useNavigate();

    useEffect(() => {
        logout();
    });

    const logout = () => {
        userRegistrationService.logout();
        return navigate('/');
    };
    return null;
};

export default LogOut;
