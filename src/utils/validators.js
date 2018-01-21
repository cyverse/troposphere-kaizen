import validator from 'validator';

function isRequired(value) {
    if (value === null || value === undefined || validator.isEmpty(value)) {
        return 'This field is required'
    }
}

function isNumber(value) {
    if (value === null || value === undefined) {
        return;
    }

    if (!validator.isInt(String(value), { allow_leading_zeroes: false })) {
        return 'Must be a number'
    }
}

function isNumberAndGreaterThan(min) {
    return function(value) {
        if (!isNumber(value) && !validator.isInt(String(value), { min: min })) {
            return `Must be greater than ${min}`;
        }
    }
}

function isRequiredAndNumber(value) {
    if (value === null || value === undefined || isNumber(value)) {
        return 'This field is required'
    }
}

function isRequiredAndBoolean(value) {
    if (value === true || value === false) {
        return;
    }

    return 'This field is required';
}

function isEmail(value) {
    if (!validator.isEmail(value)) {
        return 'Must be an email address'
    }
}

function isUrl(value) {
    if (value === null || value === undefined || value === '') {
        return;
    }

    if (!validator.isURL(value)) {
        return 'Must be a url'
    }
}

export default {
    isRequired: isRequired,
    isEmail: isEmail,
    isUrl: isUrl,
    isNumber: isNumber,
    number: {
        minimum: isNumberAndGreaterThan,
        isRequired: isRequiredAndNumber,
    },
    boolean: {
        isRequired: isRequiredAndBoolean,
    }
};
