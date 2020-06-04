
function createGame() {

    const state = {
        awaitRoom:[]
    }

    let number = 0
    
    function addPlayer(command) {
        state.awaitRoom.push({
            playerId:command.playerId,
            playerData:command.playerData
        })
    }

    function removePlayer(command){
        delete state.awaitRoom[number].players[command.playerId]
    }

    function addRoom() {}

    if(!state.awaitRooms.length){
        addPlayer({playerData:playerData, playerId:playerId})
    }

    return {
        addPlayer,
        removePlayer,
        state,
        addRoom
    }

}

try{
    module.exports = createGame
}catch(err) {
    console.log("Conectado com o server NodeJs")
}