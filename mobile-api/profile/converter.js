const profileInfo = {
    get: (info) => {
        return {
            "fullName": info.user_full_name,
            "phone": info.user_phone,
            "address": info.user_address,
            "email": info.user_email,
        };
    }
};


module.exports = {
    profileInfo
};
