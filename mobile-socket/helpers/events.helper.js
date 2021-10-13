module.exports = {
    common: {
        connection: 'connection',
        disconnect: 'disconnect',
    },

    control: {
        on: {
            setWorkArea: 'set_work_area',
            setRestrictedArea: 'set_restricted_area',
        },
        emit: {
            sendWorkArea: 'send_work_area',
            sendRestrictedArea: 'send_restricted_area',
        },
    },
};
