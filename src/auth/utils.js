import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

export const jwtDecode = (token) => {
    try {
        if (!token) {
            return null;
        }
        return jwt_decode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const setSession = (accessToken) => {
    accessToken && Cookies.set('accessToken', accessToken, { expires: 3 });
};

export const removeSession = () => {
    Cookies.remove('accessToken');
};

export const tokenCheck = () => {
    let payload;

    try {
        const token = Cookies.get('accessToken');
        if (token) {
            let user = jwtDecode(token);
            if (user) {
                payload = {
                    token: token,
                    isLoggedIn: true,
                    user,
                };
            } else {
                // Invalid token, remove it
                removeSession();
                payload = {
                    token: null,
                    isLoggedIn: false,
                    user: null,
                };
            }
        } else {
            payload = {
                token: null,
                isLoggedIn: false,
                user: null,
            };
        }
    } catch (error) {
        console.error('Error checking token:', error);
        removeSession();
        payload = {
            token: null,
            isLoggedIn: false,
            user: null,
        };
    }
    
    return payload;
};

export const toastExpireAccess = () => {
    return toast.error('Хандах эрх дууссан байна', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    });
};
