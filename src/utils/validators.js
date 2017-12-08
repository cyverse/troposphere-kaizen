import validator from 'validator';

function isRequired(value) {
    if (value === null || value === undefined || validator.isEmpty(value)) {
        return 'This field is required'
    }
}

function isRequiredAndNumber(value) {
    if (value === null || value === undefined || !validator.isNumeric(String(value))) {
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
    number: {
        isRequired: isRequiredAndNumber,
    },
    boolean: {
        isRequired: isRequiredAndBoolean,
    }
};
