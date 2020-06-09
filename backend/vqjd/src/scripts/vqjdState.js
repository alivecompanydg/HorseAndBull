
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
    
    function addPlayer(command) {
        const playerId = command.playerId
        if(!state.rooms[0]){
            console.log("metodo 1")
            const room = addRoom()
            state.rooms[room][playerId] = {
                playerId
            }
            stateOBS.room = room
        }else{
            const room = state.rooms.length
            state.rooms[room-1][playerId] = {
                playerId
            }
        }

        notifyAll({
            type:"add-player",
            playerId
        })
        
    }

    function removePlayer(command){
        for(const room in state.rooms){
            if(state.rooms[room][command.playerId]){
                delete state.rooms[room][command.playerId]
            }
        }
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
        registerPlayerId,
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