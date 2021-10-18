const { StatusCodes } = require('http-status-codes');

const errorCode = {
    // Wrong data. To send the correct data you need to use the documentation.
    validation: 100,

    // The notification in the request was not found.
    tokenNotFound: 110,

    // The notification in the request is not correct.
    tokenNotValid: 111,

    // Token lifetime expired.
    tokenExpired: 112,

    /**
     * This email has already been registered.
     * Therefore, we can not register it twice.
     * So, as it is already in our database.
     */
    emailAlreadyRegistered: 120,

    // This email is not found in the database.
    emailNotFound: 121,

    // Password does not match email.
    passwordNotValid: 130,

    // User account was not found.
    accountNotFound: 140,

    // User account was not found.
    notificationNotFound: 150,

    // Robot Already Exist.
    robotAlreadyExist: 160,

    // Robot Not Found.
    robotNotFound: 170,
};

const error = {
    validation: (res, error) => {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: error.message.replace(/"/g, ''),
            error: 'Bad request',
            errorCode: errorCode.validation,
        });
    },

    tokenNotFound: (res) => {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'To pass the identification, we need a notification.',
            error: "Token not found",
            errorCode: errorCode.tokenNotFound,
        });
    },

    tokenNotValid: (res) => {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Token failed validation.',
            error: "Unauthorized access",
            errorCode: errorCode.tokenNotValid,
        });
    },

    tokenExpired: (res) => {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Token lifetime expired.',
            error: "Unauthorized access",
            errorCode: errorCode.tokenExpired,
        });
    },

    emailAlreadyRegistered: () => {
        return {
            statusCode: StatusCodes.CONFLICT,
            success: false,
            message: 'This email is already registered.',
            error: "Conflict",
            errorCode: errorCode.emailAlreadyRegistered,
        }
    },

    emailNotFound: (email) => {
        return {
            statusCode: StatusCodes.UNAUTHORIZED,
            success: false,
            message: `This email: '${email}' is not found.`,
            error: "Access Denied",
            errorCode: errorCode.emailNotFound,
        }
    },

    passwordNotValid: () => {
        return {
            statusCode: StatusCodes.UNAUTHORIZED,
            success: false,
            message: 'Password is not valid.',
            error: "Access Denied",
            errorCode: errorCode.passwordNotValid,
        }
    },

    accountNotFound: () => {
        return {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: 'Account was not found.',
            error: "Account not found",
            errorCode: errorCode.accountNotFound,
        }
    },

    notificationNotFound: () => {
        return {
            statusCode: StatusCodes.NOT_FOUND,
            success: false,
            message: 'Notification was not found.',
            error: "Notification not found",
            errorCode: errorCode.notificationNotFound,
        }
    },

    robotAlreadyExist: () => {
        return {
            statusCode: StatusCodes.CONFLICT,
            success: false,
            message: 'Such a robot already exists for this person',
            error: "Robot already exist",
            errorCode: errorCode.robotAlreadyExist,
        }
    },

    robotNotFound: () => {
        return {
            statusCode: StatusCodes.CONFLICT,
            success: false,
            message: 'Robot not found',
            error: "Robot not found",
            errorCode: errorCode.robotNotFound,
        }
    },
};

module.exports = {
    errorCode,
    error,
};
