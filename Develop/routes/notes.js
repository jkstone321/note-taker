const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for saving a new note
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if(title && text) {
        const newNote = {
            title,
            text,
        }

        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: "Success!",
            body: newNote,
        };

        res.json(response);

    } else {
        res.json("Error in posting note")
    }
});

module.exports = notes;