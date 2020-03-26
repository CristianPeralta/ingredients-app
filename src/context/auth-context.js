import React, { useState } from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    login: () => {},
});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => {
        setIsAuthenticated(true);
    };

    return (
        <AuthContextProvider>
            {props.children}
        </AuthContextProvider>
    );
};