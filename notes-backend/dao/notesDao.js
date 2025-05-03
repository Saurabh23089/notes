const Notes = require("../models/note");


async function createNote(noteData) {
    try {

        const note = new Notes(noteData);
        const savedNote = await note.save();

        // eslint-disable-next-line no-unused-vars
        const { _id, created_at, modified_at, __v, ...noteResponse } = savedNote.toObject();


        return noteResponse;
    } catch (error) {
        throw new Error(error);
    }
}

async function getAllNotes() {
    try {
        const notes = await Notes.find().select('note_title note_content is_active').lean(); // .lean() converts to plain objects
        return notes;
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = { createNote, getAllNotes };
