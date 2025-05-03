const express  = require("express");
const notesRouter  = express.Router();
const { addNote } = require("../services/notesService");
const {fetchAllNotes} = require("../services/notesService")

notesRouter.post("/add-note", addNote);

notesRouter.get("/get-all-notes",fetchAllNotes)

module.exports = notesRouter;