const express = require('express');
const router = express.Router();
const { addStudent, getStudents } = require('./studentController');

router.post('/students', addStudent);
router.get('/students', getStudents);

module.exports = router;
