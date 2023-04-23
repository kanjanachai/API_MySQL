const express = require('express');
const router = express.Router();
const idcardController = require('../controller/idcardController');

router.get('/read/:id', idcardController.read);

router.post('/create', idcardController.create);

router.patch('/update/:id', idcardController.update);

router.delete('/delete/:id', idcardController.delete);

module.exports = router;