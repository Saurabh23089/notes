const notesRouter = require("./notesRoutes");

function configureRoute(app) {
    app.use("/api/v1/notes",notesRouter)
}

module.exports = { configureRoute };