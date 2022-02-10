import React, { createContext } from 'react';
import router from 'next/router';
const AuthContext = createContext();

export const AuthProvider = (props) => {
    const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };

    const login = async (email, password) => {
        return await fetch({
            method: 'post',
            url: `login`,
            data: { email, password },
            withCredentials: true,
        })
            .then(() => {
                router.push('/');
                console.log('user signed in');
            })
            .catch((error) => {
                console.error('Incorrect email or password entered.');
            });
    };
    const register = async (name, email, password) => {
        return await fetch(`/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
            .then(function (response) {
                router.push('/');
                console.log('user registered');
            })
            .catch(function (error) {
                console.error(error.message);
            });
    };
    const logout = async () => {
        return await axios
            .get(`/logout`, { withCredentials: true })
            .then(() => {
                router.push('/');
                console.log('user logged out');
            })
            .catch((error) => {
                console.error(error.message);
            });
    };
    return <AuthContext.Provider value={{ auth, logout, register, login }} {...props} />;
};


export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
