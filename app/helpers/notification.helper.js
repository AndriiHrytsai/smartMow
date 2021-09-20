const admin = require("firebase-admin");
const serviceAccount = require("../../config/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {
    send: async (template) => {
        return new Promise((resolve, reject) => {
            admin.messaging().send(template)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    template: {
        notification: (token, data) => {
            return {
                data: data.value,
                notification: {
                    title: data.title,
                    body: data.body
                },
                token: token
            }
        }
    }
};
