// Declarar váriaveis
var gamemode;
var turn;
var moveawait;


// Definir as variaveis de acordo com o modo de jogo
function start(modo) {

    // MH: pq a necessidade do gamemode estar como 'undefined' aqui??
        // RV: coloquei pra ele precisar estar undefined pra n ter a possibilidade da pessoa apertar um botao de menu depois de ter apertado o outro enquanto o menu sobe, pq senao buga tudo
    // MH: algum outro objeto/função modifica essa função para ser necessario que o gamemode esteja como undefined aqui??
        // RV: sim, quando a pessoa escolhe o modo de jogo la pelos botoes do menu, o gamemode altera seu valor pra esse modo de jogo escolhido
    
    if(modo == 'pvp'  && gamemode == undefined) {
        gamemode = modo;
        turn = "left";
        // MH: busque outra forma de animar a tela! Sem se apoiar no css, use apenas o javascript para animar a tela!
            // RV: Eu acho q é assim, ta certo?

        document.getElementById("menu").style.top = "-100vh";
    }
    if (modo == 'bot'  && gamemode == undefined) {
        // fazer mais tarde
    }
}





// Variaveis dos tabuleiros e function pra retornar slots
function getSlot(side,number) {
    let id = `${side}Side`;
    let slot = number - 1;
    return document.getElementById(id).getElementsByClassName("slot")[slot];
}

const leftSide = document.getElementById("leftSide");
const leftPlayer = document.getElementById("leftPlayer");
var leftSideMap = {
    "cima": [getSlot("left", 1), getSlot("left", 2), getSlot("left", 3)],
    "meio": [getSlot("left", 4), getSlot("left", 5), getSlot("left", 6)],
    "baixo": [getSlot("left", 7), getSlot("left", 8), getSlot("left", 9)]
}

const rightSide = document.getElementById("rightSide");
const rightPlayer = document.getElementById("rightPlayer");
var rightSideMap = {
    "cima": [getSlot("right", 1), getSlot("right", 2), getSlot("right", 3)],
    "meio": [getSlot("right", 4), getSlot("right", 5), getSlot("right", 6)],
    "baixo": [getSlot("right", 7), getSlot("right", 8), getSlot("right", 9)]
}





// Functions do PVP
function roll() {
    if (moveawait = "roll") {

        let dado = Math.floor(Math.random()*6 + 1);
        let button = document.getElementById("rollButton");
        let result = document.getElementById("result");
        button.style.transform = "rotate(720deg)";
        button.innerHTML = ""
        setTimeout(()=>{
            button.style.display = "none";
            result.style.display = "block";
            result.src = `img/dado${dado}.png`;
            moveawait = "select"
        }, 2000)

    }
}