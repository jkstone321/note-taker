const notes = require('express').Router();
const fs = require('fs');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid'); 

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
            id: uuidv4(),
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

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(id) {
        fs.readFile("./db/db.json", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                const filteredData = parsedData.filter(parsedData => parsedData.id !== id)
                writeToFile("./db/db.json", filteredData);
            }
          });
        
    }
});

module.exports = notes;