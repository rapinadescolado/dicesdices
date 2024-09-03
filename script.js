const playerBoard = {
    "board": document.getElementsByClassName("playerSide"),
    "cima": [document.getElementsByClassName("1 player"),document.getElementsByClassName("2 player"),document.getElementsByClassName("3 player")],
    "meio": [document.getElementsByClassName("4 player"),document.getElementsByClassName("5 player"),document.getElementsByClassName("6 player")],
    "baixo": [document.getElementsByClassName("7 player"),document.getElementsByClassName("8 player"),document.getElementsByClassName("9 player")]
}

const rollButton = document.getElementById("rollButton")

function roll () {
    let dado = Math.floor(Math.random()*6 + 1);
    rollButton.innerHTML = dado;
    playerBoard.cima[1].src = "./img/dado${dado}.png"
}