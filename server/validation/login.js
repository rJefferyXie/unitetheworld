const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserLogin(data) {
    let errors = {};

    // Converting empty fields to empty string so we can compare them with validator
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";


    // Email check
    if (validator.isEmpty(data.email)) {
        errors.email = "You must enter an email.";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    // Password check
    if (validator.isEmpty(data.password)) {
        errors.password = "You must enter a password.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};