// Declarar váriaveis
var gamemode; // Serve para definir qual vai ser o codigo de jogo usado
var turn; // Define quem está jogando, os valores podem ser "left" ou "right"
var moveawait; // Define o movimento q ta esperando q o jogador no turn atual faça. // "roll" para jogar dado. "select" para selecionar slot
const leftSide = document.getElementById("leftSide");
const leftPlayer = document.getElementById("leftPlayer");
const rightSide = document.getElementById("rightSide");
const rightPlayer = document.getElementById("rightPlayer");
var leftPointsTotal = 0;    // Pontos totais (soma dos pontos de cada linha)
var leftPointsMap = [0,0,0,0,0,0,0,0,0];  // Pontos de cada slot separado certinho
var rightPointsTotal = 0;
var rightPointsMap = [0,0,0,0,0,0,0,0,0];
var dadoAtual; // Dado que tirou no teste




// Definir as variaveis de acordo com o modo de jogo
function start(modo) {
    let menu = document.getElementById("menu");

    if(modo == 'pvp'  && gamemode == undefined) {
        gamemode = modo;
        turn = "left";
        menu.style.top = "-100vh";
        setTimeout(() => {
            menu.style.display = "none";
        }, 1000);
    }

    if (modo == 'bot'  && gamemode == undefined) {
        // fazer mais tarde
    }
}




// Function pra retornar slots e function para calcular pontos
function getSlot(side,number) {
    let id = `${side}Side`;
    let slot = number - 1;
    let response = {
        "button": document.getElementById(id).getElementsByClassName("slot")[slot],
        "img": document.getElementById(id).getElementsByClassName("slot")[slot].firstChild
    };
    return response;
}
function calcPoints(side) {
    if (side = "left") {
        let cima = leftPointsMap[0] + leftPointsMap[1] + leftPointsMap[2];
        let meio = leftPointsMap[3] + leftPointsMap[4] + leftPointsMap[5];
        let baixo = leftPointsMap[6] + leftPointsMap[7] + leftPointsMap[8];

        leftPointsTotal = cima + meio + baixo;
    }
}




// Functions do PVP
function roll() {
    if (moveawait = "roll") {

        dadoAtual = Math.floor(Math.random()*6 + 1);
        let button = document.getElementById("rollButton");
        let result = document.getElementById("result");
        button.style.transform = "rotate(720deg)";
        button.innerHTML = ""
        setTimeout(()=>{
            button.style.display = "none";
            result.style.display = "block";
            result.src = `img/dado${dadoAtual}.png`;
            moveawait = "select";
        }, 2000)

    }
}
function selectSlot(side, number) {
    if (moveawait == "select" && side == turn) {

        // Calcular pontos e colocar imagem de dado no slot
        if (side == "left") {
            leftPointsMap[(number - 1)] = dadoAtual;
        }else{
            rightPointsMap[(number - 1)] = dadoAtual;
        }
        calcPoints(side)
        getSlot(side, number).img.src = `img/dado${dadoAtual}.png`;

        // Resetar o botão de dado
        let button = document.getElementById("rollButton");
        let result = document.getElementById("result");
        button.style.display = "block";
        button.style.transform = "rotate(0)";
        button.innerHTML = "ROLAR DADO";
        result.style.display = "none";

        // Passar turno
        moveawait = "roll";
        if (side == "left") {
            turn = "right";
        }else{
            turn = "left";
        }
        console.log(leftPointsTotal + "and" + rightPointsTotal)
    }
}