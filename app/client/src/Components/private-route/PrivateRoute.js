import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return auth.isAuthenticated ? <Outlet {...rest}/> : <Navigate to="/login"/>;
}

//     <Route
//     {...rest}
//     render={props =>
//     auth.isAuthenticated === true ? 
//     (<Outlet {...props} />) : (<Navigate to="/login" />)}
//     />
// };

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);