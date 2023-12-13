const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');

// Route LIVRES
router.get('/', livreController.getLivres);

// Route LIVRE
router.get('/:numlivre', livreController.getLivreById);

// Route PGS
router.get('/:numlivre/pages', livreController.getPagesDuLivre);

// Route PG
router.get('/:numlivre/pages/:numpage', livreController.getPageDuLivre);

// Route ADD
router.post('/', livreController.addLivre);

// Route DEL
router.delete('/:numlivre', livreController.deleteLivre);

// Route UPDATE
router.put('/:numlivre', livreController.updateLivre);





module.exports = router;
