// Definir as variaveis de acordo com o modo de jogo
var gamemode;
function start(modo) {
    if(modo == 'pvp'  && gamemode == undefined) {
        gamemode = modo;
        document.getElementById("menu").style.animationPlayState = "running";
    }
    if (modo == 'bot'  && gamemode == undefined) {
        // fazer mais tarde
    }
}

// Variaveis dos tabuleiros e function pra retornar slots
const leftSide = document.getElementById("leftSide");
const rightSide = document.getElementById("leftSide");
const leftPlayer = document.getElementById("leftPlayer");
const rightPlayer = document.getElementById("rightPlayer");
function getSlot(board,number) {
    let id = `${board}Side`;
    let slot = number - 1;
    return document.getElementById(id).getElementsByClassName("slot")[slot];
}

// Iniciar jogo. Modo: Dois jogadores
if (gamemode == "pvp") {
    
}
