const isValidRequestBody = function (request) {
    if (Object.keys(request).length === 0) return false;
    for (const key in request) {
        if (typeof request[key] === "string") {
            request[key] = request[key].trim();
        }
    }

    return true;
};

const isValidEmail = function (email) {
    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
};

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value !== "string" || value == "") return false;
    return true;
};


//validation of  empty string
const validString = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

module.exports = { isValidRequestBody, isValidEmail, isValid, validString };
