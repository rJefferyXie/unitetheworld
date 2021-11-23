const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserRegister(data) {
    let errors = {};

    // Converting empty fields to empty string so we can compare them with validator
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Username check
    if (validator.isEmpty(data.name)) {
        errors.name = "You must enter a username.";
    }

    // Email checks
    if (validator.isEmpty(data.email)) {
        errors.email = "You must enter an email.";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    // Password checks
    if (validator.isEmpty(data.password)) {
        errors.password = "You must enter a password.";
    }

    if (validator.isEmpty(data.password)) {
        errors.password2 = "You must enter your password into the confirm box.";
    }

    if (!validator.isLength(data.password, {min: 6, max: 18})) {
        errors.password = "Your password must be between 6-18 characters in length.";
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};