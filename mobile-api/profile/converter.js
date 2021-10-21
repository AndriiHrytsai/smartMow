const profileInfo = {
    get: (info) => {
        return info.reduce((previousValue, value) => {
            previousValue.push({
                "fullName": value.user_full_name,
                "phone": value.user_phone,
                "address": value.user_address,
                "email": value.user_email,
            });
            return previousValue;
        }, []);
    }
};


module.exports = {
    profileInfo
};
