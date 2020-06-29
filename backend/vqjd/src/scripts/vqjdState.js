
let _playerData = ""

function createGame() {

    const state = {
        rooms: []
    }

    const stateOBS = {
        observers: [],
        playerId: null,
        room: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        stateOBS.observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log(`Notifying ${stateOBS.observers.length} observers`)

        for(const observerFunction of stateOBS.observers) {
            observerFunction(command)
        }

    }

    function destroyAloneRoom(room){
        state.rooms.splice(room, 1)
    }

    function analyseForDestroyAloneRooms() {
        for(let room = 0; room < state.rooms.length; room++){
            const Room = state.rooms[room]
            if(Object.keys(Room).length === 0){
                console.log(`Sala ${room} esta vazia`)
                destroyAloneRoom(room)
            }
        }
        //notifyAll({})
    }
    
    function addPlayer(command) {
        const playerId = command.playerId
        stateOBS.playerId = playerId
        if(!state.rooms[0] || Object.keys(state.rooms[state.rooms.length-1]).length === 2){
            console.log("metodo 1")
            const room = addRoom()
            state.rooms[room][playerId] = {
                playerId
            }
            stateOBS.room = room
        }else{
            console.log("Metodo 2")
            const room = state.rooms.length
            console.log(Object.keys(state.rooms[room-1]).length)
            state.rooms[room-1][playerId] = {
                playerId
            }
        }

        notifyAll({
            type:"add-player",
            playerId
        })
        
    }

    function modifyState(command) {
        const playerId = command.playerId
        state.rooms[command.room][playerId] = command
        console.log(state.rooms[command.room][playerId])
        notifyAll({
            type:"modify-state",
            playerId:command.playerId,
            name:command.name,
            horse:command.horse,
            room:command.room,
            hit:command.hit
        })
    }

    function qtEvent(command) {
        setHit(command)
    }

    function setHit(command) {
        const playerId = command.playerId
        const room = command.thisRoom
        const hit = command.hit

        state.rooms[room][playerId].hit = hit
    }

    function removePlayer(command){
        const playerId = command.playerId
        for(const room in state.rooms){
            if(state.rooms[room][playerId]){
                delete state.rooms[room][playerId]
            }
        }
        notifyAll({
            type:"remove-player",
            playerId
        })
        notifyAll({
            type:"delete-room"
        })
    }

    function setState(newState) {
        Object.assign(state, newState)
        console.log(state)
    }

    function addRoom() {
        state.rooms.push({})
        return state.rooms.length-1
    }

    return {
        addPlayer,
        setState,
        removePlayer,
        notifyAll,
        subscribe,
        qtEvent,
        setHit,
        registerPlayerId,
        analyseForDestroyAloneRooms,
        destroyAloneRoom,
        modifyState,
        state,
        stateOBS,
        addRoom
    }

}

try{
    module.exports = createGame
}catch(err) {
    console.log("Conectado com o server NodeJs")
}