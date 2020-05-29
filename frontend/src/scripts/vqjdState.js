

function createGame() {

    const state = {
        rooms:[]
    }

    let number = 0
    
    function addPlayer(playerData) {

        const playerName = playerData.name

        const player = {
            playerId: playerData.name,
            horse:horse,
            horseVelocity,
            selectedMode
        }

        if(state.rooms[number].players.length === 2){
            addRoom(roomNumber)
            state.rooms[roomNumber-1].players.push(player)
        }else{
            state.rooms[number].players.push(player)
        }
    }

    function addRoom(roomIndex) {

        number = roomIndex

        state.rooms[roomIndex] = {
            players:[]
        }

        roomNumber++
    }

    if(!state.rooms.length){
        addRoom(roomNumber)
        addPlayer(playerData)
    }

    return {
        addPlayer,
        number,
        state,
        addRoom
    }

}

try{
    module.exports = createGame
}catch(err) {
    console.log("Conectado com o server NodeJs")
}