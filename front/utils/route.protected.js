import React               from 'react';
import { Route, Redirect } from 'react-router-dom';


export const ProtectedRoute = ({ component: Component, ...rest }) => {

    console.log( authContext.userId ? 'Logado' : 'Não logado' );
    return  authContext.userId ? <Route {...rest} render = {
        (props) => {
            return <Component {...props} /> 
        }} /> : <Redirect to='/' />;
}; 

export const authContext = { userId: null };