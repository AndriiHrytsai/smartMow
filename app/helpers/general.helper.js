const EMPTY_NAME = '';

/**
 * Combines all transferred objects into one.
 */
function assign() {
    let obj = {};

    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        Object.keys(arg).forEach((key) => {
            obj[key] = arg[key];
        });
    }

    return obj;
}

function getChanges(changes) {
    let str = [];
    for (let change of changes) {
        str.push(change.changes);
    }
    return str;
}

module.exports = {
    EMPTY_NAME,
    assign,
    getChanges
};
