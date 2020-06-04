

    function AC(time, points, boost, numberboost) {
        if(points > (time*7) + (boost*numberboost)){
            alert("Foi BAN te conhecer!")
            window.location.href = "index.html"
            localStorage.setItem("status", "BAN")
        }
    }