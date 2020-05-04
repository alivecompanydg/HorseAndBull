
const host = "http://localhost:3000"
const mattress = new Mattress()
let FloatNum = Math.random()


const animals = {
    "horse": [
        {
            "nome": "Brave",
            "float":FloatNum,
            "velocidadeMaxima":200,
            "velocidade": Math.floor(200 * FloatNum)
        }
    ],

    "bull":[],

    "cow":[]
}

function changeDisplay(obj) {
    if(obj.style.display === "none"){
        obj.style.display = "block"
    }else{
        obj.style.display = "none"
    }
}

function checkData(data) {
    if(data.length === 0){
        changeDisplay(document.getElementById("newPlayerForm"))
    }else{
        initGame(data)
        clearInterval(interval)
    }
}

async function cadPlayer() {

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("senha").value
    let age = document.getElementById("idade").value
    let ip = mattress.singleId()

    let url = `${host}/cad?name=${name}&email=${email}&password=${password}&age=${age}&ip=${ip}&animals=${JSON.stringify(animals)}&principalAnimal=${JSON.stringify(animals.horse[0])}`

    const form = document.getElementById("cadPlayerForm")
    form.action = url

    fetch(url, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ name, email, password, age, ip, animals })
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        //checkData(data)
        findMe()
    })
    .catch((err) => {
        alert("Um erro ocorreu " + err)
    })

}

function showMenu(){
    document.getElementById("menu").style.display = "block"
    document.getElementById("buyCoins").style.display = "none"
    document.getElementById("allEvents").style.display = "none"
}

let arrayEventDatas = 0

function payEvent(index) {

    let price = arrayEventDatas[index].price
    let email = playerData.email
    let event = {
        name: arrayEventDatas[index].name,
        distance: arrayEventDatas[index].distance
    }

    let url = `${host}/payEvent?pay=${price}&email=${email}&event=${JSON.stringify(event)}`



    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        alert("Sua inscrição no evento foi finalizada")
        document.getElementById("allEvents").style.display = "none"
        findMe()
    })
    .catch((err) => {
        console.log(err)
        alert("Um erro ocorreu")
    })

}

async function playevent() {
    await localStorage.setItem("event", "TRUE")
    window.location.href = "game.html"
}

let playerEVENT = ""

function printEvents(data) {

    let html = ""

    if(data.length > 0){

    arrayEventDatas = data

        html = `<center><h1 onclick="showMenu()"><w>HaB</w></h1><h2>Lista de eventos</h2><table border="1" width="80%">`

        html += "<tr>"
            html += `<th>Nome</th>`
            html += `<th>Data</th>`
            html += `<th>Preço</th>`
            html += `<th>Distância</th>`
            html += `<th>Recompensa</th>`
            html += `<th>Comprar</th>`
        html += "</tr>"

    for(let i in data){

        let THISEVENT = {
            name:data[i].name,
            distance:data[i].distance
        }

        //console.log(THISEVENT)
        let EVENT = ""
        
        if(playerEVENT != ""){
            EVENT = JSON.parse(playerEVENT)
        }

        console.log(EVENT)

        html += "<tr>"
            html += `<td>${data[i].name}</td>`
            html += `<td>${data[i].data}</td>`
            html += `<td>${data[i].price}</td>`
            html += `<td>${data[i].distance}</td>`
            html += `<td>${data[i].pricePool}</td>`
            if(THISEVENT.name !== EVENT.name){
                html += `<td><button style="width:100%;" onclick="payEvent(${i})">Inscrever-se</button></td>`
            }else{
                html += `<td><button style="width:100%;" onclick="playevent()">Jogar Evento</button></td>`
            }
        html += "</tr>"
    }

    html += "</table><br><p>Você somente pode participar de um evento por vez. Caso tente se inscrever em um segundo evento, o primeiro será cancelado.</p></center>"
    
    }else{
        html = `<center><h1 onclick="showMenu()"><w>HaB</w></h1><h2>Lista de eventos</h2><table border="1" width="80%"><p>Nenhum evento cadastrado</p></center>`
    }
    printHtml("eventLeft", html)

}

function printHtml(div, html) {
    document.getElementById(`${div}`).innerHTML = html
}

function findEvents() {

    let url = `${host}/findEvent`

    fetch(url)
    .then( (response) => {
        return response.json()
    } )
    .then( ( data ) => {
        printEvents(data)
        console.log("funcionou")
    } )
    .catch((err) => {
        console.log(err)
        document.querySelector("#eventLeft").innerHTML = "<p>Nenhum evento cadastrado</p>"
    })

}

async function findMe() {

    const singleid = mattress.singleId()
    let url = `${host}/findMe?ip=${singleid}`

    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then( (data) => {
        console.log(data)
        checkData(data)
    } )
    .catch((err) => {
        checkData([])
    })

}

let interval = setInterval(() => {

    document.getElementById("cadBtn").style.display = "none"

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("senha").value
    let confPassword = document.getElementById("confsenha").value
    let idade = document.getElementById("idade").value

    if(name === "" || email === "" || password === "" || idade === ""){

    }else{
        if(parseInt(idade) < 18){

        }else{
            if(password === confPassword){
                document.getElementById("cadBtn").style.display = "block"
            }
        }
    }

},50)


findMe()