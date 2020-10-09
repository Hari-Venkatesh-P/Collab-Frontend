// Author : Hari Venkatesh P 
// This Component is used for creating protetced routes for maintaing the auth

import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import {isMemberLoggedIn,isAdminLoggedIn} from "../Auth/authutils"

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isMemberLoggedIn() || isAdminLoggedIn()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

                }
            }}
        />
    );
}

export const MemberRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isMemberLoggedIn()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

                }
            }}
        />
    );
}