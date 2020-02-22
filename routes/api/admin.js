const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');

router.get('/create-tables', async (req, res) => {
    await Admin.createTables();
    await res.json({msg: "Tables Created"});
});

module.exports = router;
