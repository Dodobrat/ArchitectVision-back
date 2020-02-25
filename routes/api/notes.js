const express = require('express');
const router = express.Router();
const Note = require('../../models/Note');

router.get('/:id', async (req, res) => {
    const data = await Note.getNote(req.params.id);

    await res.json(data);
});

router.post('/', async (req, res) => {
    const newNote = {
        roomId: req.body.roomId,
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date()
    };

    if (!newNote.roomId || !newNote.title || !newNote.description){
        return res.status(400).json({msg: 'Please fill in all fields'});
    }

    const data = await Note.addNote(newNote);

    await res.json(data);
});

router.get('/room/:id', async (req, res) => {
    const data = await Note.getRoomNotes(req.params.id);

    await res.json(data);
});

router.put('/:id', async (req, res) => {
    const updatedNote = {
        title: req.body.title,
        description: req.body.description,
    };
    const data = await Note.updateNote(req.params.id, updatedNote);
    await res.json(data);
});

router.delete('/:id', async (req, res) => {
    const data = await Note.deleteNote(req.params.id);

    await res.json(data);
});

module.exports = router;
