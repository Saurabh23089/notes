const { createNote } = require("../dao/notesDao");
const { isValidRequestBody } = require("../validator/validator")
const myconstant = require("../config/constant");
const { getAllNotes } = require("../dao/notesDao")

async function addNote(req, res) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(myconstant.BAD_REQUEST).json({
                success: false,
                message: myconstant.INPUTMISSING,
            });
        }

        if (!isValidRequestBody(req.body)) {
            return res.status(myconstant.BAD_REQUEST)
                .send({ success: false, message: myconstant.INPUTMISSING });
        }

        const payload = {
            note_title: title,
            note_content: content,
            is_active: true
        };

        const createdNoteData = await createNote(payload);

        if (!createdNoteData) {
            return res.status(myconstant.BAD_REQUEST).json({
                success: false,
                message: `${myconstant.DATACREATEERROR} of note`,
            });
        }

        return res.status(myconstant.GOOD_CODE).json({
            success: true,
            message: myconstant.SUCCESSRESPONSE,
            data: { noteData: createdNoteData },
        });




    } catch (error) {
        console.error("Error while adding note:", error);
        return res.status(myconstant.ERR_CODE).json({ success: false, message: myconstant.COMMON_ERROR });
    }
}

async function fetchAllNotes(req, res) {
    try {
      
        const notes = await getAllNotes();

        if (!notes || notes.length === 0) {
            return res.status(myconstant.BAD_REQUEST).json({
                success: false,
                message: "No notes found",
            });
        }

        return res.status(myconstant.GOOD_CODE).json({
            success: true,
            message: myconstant.SUCCESSRESPONSE,
            data: { notes },
        });

    } catch (error) {
        console.error("Error while fetching notes:", error);
        return res.status(myconstant.ERR_CODE).json({ success: false, message: myconstant.COMMON_ERROR });
    }
}


module.exports = { addNote, fetchAllNotes }