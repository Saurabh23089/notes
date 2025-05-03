const express = require("express");
const config = require("./config/paraenv");
const cors = require("cors");
const { configureRoute } = require("./routes/configureroute");
const { configureCORS } = require("./config/cors");
const multer = require("multer");
const dbConnect = require("./config/dbconfig");



const app = express();


app.use(cors(configureCORS()));
app.use(multer().any());
app.use(express.json())

//Configure Routes
configureRoute(app);


// Root endpoint
app.get("/", (req, res) => {
    res.send("notes-backend is running");
});

// Start Server
app.listen(config.port,() => {
    console.log(`Server is running on ${config.port}`);
    
})

dbConnect();