const router = require('express').Router();
const db = require('../models/games');

router.route('/')
    .get(async (req, res) => {
        await db
                .getAll()
                .then(games => res.status(200).json(games));
    })
    .post(async (req, res) => {
        if(!req.body.title || !req.body.genre) return res.status(422).json({ error: "You need to provide game title and genre!"});
        await db
                .insert(req.body)
                .then(response => {
                    response === 0 
                        ? res.status(405).json({ error: 'Title must be unique!' })
                        : res.status(201).json(response);
                })
                .catch(err => res.status(500).json({ error: "There was an error while saving this game to the database."}));
    });

router.route('/:id')
    .get(async (req, res) => {
        await db
                .getById(Number(req.params.id))
                .then(
                    response => response === 0
                        ? res.status(404).json({ message: "The game with the specified ID does not exist." })
                        : res.status(200).json(response)
                )
                .catch(err => res.status(500).json({ error: "Game could not be retrieved."}));
    })
    .delete(async (req, res) => {
        res.status(200).json({ message: 'OK' });
    });

module.exports = router;