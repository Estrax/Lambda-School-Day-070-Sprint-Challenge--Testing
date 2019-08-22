const router = require('express').Router();
const gamesController = require('../controllers/gamesController');

router.route('/')
    .get(gamesController.getAllGames)
    .post(gamesController.addNewGame);

router.route('/:id')
    .get(gamesController.getGame)
    .delete(gamesController.deleteGame);

module.exports = router;