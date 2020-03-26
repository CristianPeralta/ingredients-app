import React from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    login: () => {},
});

const AuthContextProvider = props => {
    return (
        <AuthContextProvider>
            {props.children}
        </AuthContextProvider>
    );
};