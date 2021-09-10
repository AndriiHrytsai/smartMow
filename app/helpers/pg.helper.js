let config = require('./config.helper');

module.exports = {
    firstResultOrNull: (sql) => {
        const {rows} = sql;

        if (rows.length !== 0) {
            return rows[0];
        } else {
            return null;
        }
    },

    firstResultOrEmptyObject: (sql) => {
        const {rows} = sql;

        if (rows.length !== 0) {
            return rows[0];
        } else {
            return {};
        }
    },

    resultOrEmptyArray: (sql) => {
        const {rows} = sql;

        if (rows.length === 0) {
            return [];
        } else {
            return rows;
        }
    },

    getId: (result, fieldName) => {
        return result.rows[0][fieldName];
    },

    withPagination: (sql, page, limit) => {
        if (page === undefined) return sql + '';
        page -= 1;

        limit = limit || config.database.limit;
        page = page * limit;

        return sql + `OFFSET ${page} LIMIT ${limit}`;
    }
};
