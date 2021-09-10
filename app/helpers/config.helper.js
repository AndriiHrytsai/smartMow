const config = require('config');

config.regExp = {
    password: new RegExp("^\\S{6,128}$"),
};

config.general = {
    "host": config.general.host,
    "port": config.general.port,
    "link": config.general.link,
    "fullMode": config.general.fullMode,
};

config.loading = {
    'simulateLoading': config.loading.simulateLoading,
    'maxLoading': config.loading.maxLoading,
    'minLoading': config.loading.minLoading,
};

config.morgan = {
    'name': config.morgan.name,
    'format': config.morgan.format,
    'morganBody': config.morgan.morganBody,
};

config.database = {
    'user': config.database.user,
    'host': config.database.host,
    'database': config.database.database,
    'password': config.database.password,
    'port': config.database.port,
    'limit': config.database.limit,
};

config.JWT = {
    'secret': {
        'user': {
            'accessToken': config.JWT.secret.user.accessToken,
            'refreshToken': config.JWT.secret.user.refreshToken,
        },
    },
    'lifetime': {
        'accessToken': config.JWT.lifetime.accessToken,
        'refreshToken': config.JWT.lifetime.refreshToken,
    }
};

config.userStatus = {
    'login': 'login',
    'logout': 'logout',
};

config.userType = {
    'user': 'user',
    'doctor': 'doctor',
};

module.exports = config;
