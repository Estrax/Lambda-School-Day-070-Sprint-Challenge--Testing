let games = [];

module.exports = {
    getAll,
    insert,
    getById,
    remove,
    truncate
}

async function getAll(){
    return games;
}

async function insert(game){
    if(games.filter(elem => elem.title === game.title).length > 0){
        return 0;
    }
    games.push({
        id: games.length,
        ...game
    });
    return { id: games.length-1 }
}

async function getById(id){
    const res = games.filter(elem => elem.id === id);
    if(res.length === 0) return 0;
    return res[0];
}

async function remove(id){
    const len = games.length;
    games = games.filter(elem => elem.id !== id);
    if(len > games.length) return 1;
    return 0;
}

async function truncate(){
    games = [];
    return;
}