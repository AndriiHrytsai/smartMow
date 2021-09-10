const registration = {
    post: (options) => {
        return {
            'accessToken': options.access_token,
            'refreshToken': options.refresh_token,
        }
    }
};

const login = {
    post: (options) => {
        return {
            'accessToken': options.access_token,
            'refreshToken': options.refresh_token,
        }
    }
};

module.exports = {
    registration,
    login,
};
