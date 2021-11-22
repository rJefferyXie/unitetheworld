import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData) => dispatch => {
    axios.post("/api/users/register", userData)
    .then(res => document.location.pathname = "/login")
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

// Login, get user token
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login", userData)
    .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decodedToken = jwt_decode(token);
        dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => 
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        })
    );
};

// Set logged in user
export const setCurrentUser = decodedToken => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedToken
    };
};

// Set user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
