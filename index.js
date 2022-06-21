let $button = document.querySelector("#start")
let $game= document.querySelector("#game")
let $time = document.querySelector("#time")
let $gameTime = document.querySelector("#game-time")

let score = 0
let isGameStarted = false

$button.addEventListener("click",buttonClick)
$game.addEventListener("click",boxClick)
$gameTime.addEventListener("input",setGameTime)

function buttonClick() {
    isGameStarted = true
    score = 0

    setGameTime()
    $gameTime.setAttribute("disabled","false")



    $button.classList.toggle('hide')
    $game.style.backgroundColor = "white"

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)

        if (time<=0){
            clearInterval(interval)
            endGame()
        }
        else {
            $time.textContent = (time - 0.1).toFixed(1)

        }

    }, 100)


    renderBox()
}

function renderBox() {
   let box = document.createElement("div")
    let gameSize = $game.getBoundingClientRect()
    let boxSize = get(10,100)

    let topMax = gameSize.height - boxSize
    let leftMax = gameSize.width - boxSize

    // let colors = []

    box.style.height = box.style.width = boxSize + "px"
    box.style.top = get(0,topMax)+"px"
    box.style.left = get (0,leftMax) + "px"
    box.style.backgroundColor = getRandomColor()
    box.style.position = "absolute"
    box.style.cursor = "pointer"
    box.setAttribute("id","box")
    $game.insertAdjacentElement("beforeend",box)

}

function boxClick(event) {
    if (!isGameStarted){
        return
    }
    let target = event.target
    if (target.getAttribute("id") === "box"){
        score++
        document.querySelector("#box").remove()
        renderBox()
    }
}

function get(min,max) {
    let x = Math.random() * (max-min)+min
    return Math.floor(x)
}

function endGame() {
    isGameStarted = false
    $gameTime.removeAttribute("disabled")
    $button.classList.toggle('hide')
    $game.style.backgroundColor = "#ccc"
    document.querySelector("#box").remove()
    document.querySelector("#result-header").classList.toggle('hide')
    document.querySelector("#time-header").classList.toggle('hide')

    let result = document.querySelector("#result")
        result.textContent  = score.toString()

}

function setGameTime() {
    document.querySelector("#result-header").classList.add('hide')
    document.querySelector("#time-header").classList.remove('hide')

    let inputTime = +$gameTime.value

    $time.textContent = inputTime.toFixed(1)


}

function getRandomColor() {
    // let letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    //
    // if (color==="#FFFFFF") {
    //     return getRandomColor()
    // }
    //
    // return color;

    let color = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()

    if (color === "#FFFFFF") {
        return getRandomColor()
    }
    else {
        return color
    }
    
}

