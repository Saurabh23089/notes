const myconstant = require("./constant");

function configureCORS() {
    const allowedOrigins = [
        myconstant.LOCAL_SERVER_URL1,
        myconstant.LOCAL_SERVER_URL2
    ]

    return {
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    };

}

module.exports = {configureCORS}