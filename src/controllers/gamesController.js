const db = require('../models/games');

module.exports = {
    getAllGames,
    addNewGame,
    getGame,
    deleteGame
}

async function getAllGames(req, res){
    await db
            .getAll()
            .then(games => res.status(200).json(games))
            .catch(err => res.status(500).json({ error: "There was an error while fetching games from the database."}));
};

async function addNewGame(req, res){
    if(!req.body.title || !req.body.genre) return res.status(422).json({ error: "You need to provide game title and genre!"});
    await db
            .insert(req.body)
            .then(response => {
                response === 0 
                    ? res.status(405).json({ error: 'Title must be unique!' })
                    : res.status(201).json(response);
            })
            .catch(err => res.status(500).json({ error: "There was an error while saving this game to the database."}));
};

async function getGame(req, res){
    await db
            .getById(Number(req.params.id))
            .then(
                response => response === 0
                    ? res.status(404).json({ error: "The game with the specified ID does not exist." })
                    : res.status(200).json(response)
            )
            .catch(err => res.status(500).json({ error: "Game could not be retrieved."}));
};

async function deleteGame(req, res){
    await db
            .remove(Number(req.params.id))
            .then(response => response === 0
                ? res.status(404).json({ error: "The game with the specified ID does not exist." })
                : res.status(200).json({ success: true })
            )
            .catch(err => res.status(500).json({ error: "Game could not be deleted." }));
};