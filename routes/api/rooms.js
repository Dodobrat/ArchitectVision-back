const express = require('express');
const router = express.Router();
const Room = require('../../models/Room');

router.get('/', async (req, res) => {
    const data = await Room.getRooms();

    await res.json(data);
});

router.post('/', async (req, res) => {
    const newRoom = {
        title: req.body.title,
        createdAt: new Date()
    };

    if (!newRoom.title || !req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({msg: 'Please fill in all fields'});
    }

    const model = req.files.model;
    const timestamp = new Date();

    model.mv(`./uploads/${timestamp.getTime()}_${model.name}`);

    newRoom.model = `./uploads/${timestamp.getTime()}_${model.name}`;

    const data = await Room.addRoom(newRoom);

    await res.json(data);
});

router.get('/:id', async (req, res) => {
    const data = await Room.getRoom(req.params.id);

    await res.json(data);
});

router.put('/:id', async (req, res) => {
    const updatedRoom = {
        title: req.body.title,
    };
    const model = req.files && req.files.model;
    const timestamp = new Date();
    if (model){
        model.mv(`./uploads/${timestamp.getTime()}_${model.name}`);
        updatedRoom.model = `./uploads/${timestamp.getTime()}_${model.name}`;
    }
    const data = await Room.updateRoom(req.params.id, updatedRoom);
    await res.json(data);
});
//
// router.delete('/:id', (req, res) => {
//     const found = rooms.filter(project => project.id === parseInt(req.params.id));
//
//     if (found.length !== 0){
//         res.json({msg: 'Project Deleted!', projects: rooms.filter(project => project.id !== parseInt(req.params.id))});
//     }else {
//         res.status(404).json({
//             msg: 'Project not found!'
//         });
//     }
// });

module.exports = router;
