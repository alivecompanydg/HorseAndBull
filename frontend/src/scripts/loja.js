
    let playerData = ""
    let hara = ""

    function verifySound() {
        if(localStorage.getItem("sound") === "True"){
            let html = `<img src="img/som.png" onclick="mute()" width="25px" height="25px">`
            document.querySelector("#soundicon").innerHTML = html
        }else{
            let html = `<img src="img/semsom.png" onclick="mute()" width="25px" height="25px">`
            document.querySelector("#soundicon").innerHTML = html
        }
    }

    if(!localStorage.getItem("sound")){
        localStorage.setItem("sound", "True")
    }

    function checkSound(){
        if(localStorage.getItem("sound") === "False"){
            document.querySelector("audio").pause()
        }else{
            document.querySelector("audio").play()
        }
    }

    function mute() {
        if(localStorage.getItem("sound") === "True"){
            localStorage.setItem("sound", "False")
        }else{
            localStorage.setItem("sound", "True")
        }
    }

    setInterval(() => {
        verifySound()
        checkSound()
    }, 500)


    function setDataFromPlayer(local, data) {
        document.getElementById(`${local}`).value = `${data}`.toUpperCase()
    }

    function mainMenu() {
        window.location.href = "index.html"
    }

    async function initGame(data) {
        playerData = await data[0]
        console.log(playerData)
        hara = await JSON.parse(data[0].animals)
        console.log(hara)
        await setDataFromPlayer("playerName", playerData.name)
        await setDataFromPlayer("coins", `${playerData.coins}`)
        await setDataFromPlayer("EventCoins", `${playerData.eventCoins}`)
        
    }

    function getAnnouncements() {
        let url = `${host}/findAn`

        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if(!data[0]){
                let html = "<br><p>Não existem anuncios na loja</p>"
                printData("anuncios", html)
            }else{
                printAn(data)
            }
        })
        .catch((err) => {
            alert("Algum erro ocorreu")
        })
    }

    let array = []

    function printAn(data) {

        let html = `<br><table id="tabelinha" border=1 style="width:90%;">`

            for(let i in data){
                array.push(data[i])
                html += "<tr>"
                    html += `<td class="imagenzinha"><img style="width:150px; height:120px;" src="img/${JSON.parse(data[i].item).nome}3.png"></td>`
                    html += `<td>Nome: ${JSON.parse(data[i].item).nome}<br>Vendedor: ${data[i].salesman}<br>Preço: ${data[i].price}<br><input type="button" value="Comprar" onclick="comprar(${i})" style="width:190px;"></td>`
                html += "</tr>"
            }

            html += "</table>"

            printData("anuncios", html)

    }

    function comprar(id){
        const item = array[id].item
        const price = array[id].price
        const email = playerData.email
        const coins = playerData.coins
        const salesman = array[id].salesman

        let conf = confirm("Deseja realmente comprar este item?")

        if(conf){
            if(coins >= price){
                let url = `${host}/playerBought?item=${item}&email=${email}&price=${price}&salesman=${salesman}`
                fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    alert(`${JSON.parse(item).nome} foi adicionado ao seu hara`)
                    window.location.href = "loja.html"
                })
                .catch((err) => {
                    alert("um erro ocorreu")
                })
            }else{
                alert("Não possui moedas o suficiente")
            }
        }

    }

    function printData(div, html){
        document.getElementById(div).innerHTML = `<center>${html}</center>`
    }

    getAnnouncements()