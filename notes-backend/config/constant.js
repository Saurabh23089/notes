const dotenv = require("dotenv");
dotenv.config();
const process = require("process");

class Constants {
    constructor() {
        this.MONGODB_URL = process.env.MONGODB_URL;
        this.SUCCESSCREATE = "Created Successfully";
        this.DATA_CREATE_CODE = 201,
            this.ERR_CODE = 500,
            this.COMMON_ERROR = "Internal Server Error"
        this.BAD_REQUEST = 400,
            this.GOOD_CODE = 200,
            this.INPUTMISSING = "REQUIRED INPUTS ARE MISSING";
        this.DATACREATEERROR = "Error in creation";
        this.LOCAL_SERVER_URL1 = process.env.LOCAL_SERVER_URL1,
            this.LOCAL_SERVER_URL2 = process.env.LOCAL_SERVER_URL2
    }
}

module.exports = new Constants();