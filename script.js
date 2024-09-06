// Declarar váriaveis
var gamemode; // Serve para definir qual vai ser o codigo de jogo usado
var turn; // Define quem está jogando, os valores podem ser "left" ou "right"
var moveawait; // Define o movimento q ta esperando q o jogador no turn atual faça. // "roll" para jogar dado. "select" para selecionar slot
var dadoAtual; // Dado que tirou no teste

const leftSide = document.getElementById("leftSide");
const leftPlayer = document.getElementById("leftPlayer");
const rightSide = document.getElementById("rightSide");
const rightPlayer = document.getElementById("rightPlayer");

var leftPointsTotal = 0;    // PointsTotal = Pontos totais(soma dos pontos de cada linha) // PointsMap = Pontos de cada slot separado certinho
var leftPointsMap = [
    {"slots":[0,0,0]},{"slots":[0,0,0]},{"slots":[0,0,0]}
];
var rightPointsTotal = 0;
var rightPointsMap = [
    {"slots":[0,0,0]},{"slots":[0,0,0]},{"slots":[0,0,0]}
];




// Definir as variaveis de acordo com o modo de jogo
function start(modo) {
    let menu = document.getElementById("menu");

    if(modo == 'pvp'  && gamemode == undefined) {
        gamemode = modo;
        turn = "left";
        moveawait = "roll"
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
function getSlot(side, line, number) {
    side = `${side}Side`;
    line = line - 1;
    number = number - 1;
    let response = {
        "line": document.getElementById(side).getElementsByClassName("line")[line],
        "slot": document.getElementById(side).getElementsByClassName("line")[line].children[number],
        "img": document.getElementById(side).getElementsByClassName("line")[line].children[number].firstChild
    };
    return response;
}
function calcPoints(side) {
    // vo fazer dps
}




// Functions do PVP
function roll() {
    if (moveawait == "roll") {

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
        }, 1500)

    }
}
function selectLine(line) {
    if (moveawait == "select") {

        // Definir qual lado ta sendo usado e a line escolhida
        let lineNumber = line;
        let isFree = false;
        if (turn == "left") {
            pointMap = leftPointsMap[line].slots;
            line = leftSide.children[line];
        } else {
            pointMap = rightPointsMap[line].slots;
            line = rightSide.children[line];
        }

        // Checar se tem espaço vazio na line e colocar dado na linha
        if (pointMap[2] == 0) {
            // Tem espaço no primeiro slot
            getSlot(turn, lineNumber + 1, 3).img.src = `img/dado${dadoAtual}.png`;
            pointMap[2] = dadoAtual;
            isFree = true;
        } else if (pointMap[1] == 0) {
            // Tem espaço no segundo slot
            getSlot(turn, lineNumber + 1, 2).img.src = `img/dado${dadoAtual}.png`;
            pointMap[1] = dadoAtual;
            isFree = true;
        } else if (pointMap[0] == 0) {
            // Tem espaço no terceiro slot
            getSlot(turn, lineNumber + 1, 1).img.src = `img/dado${dadoAtual}.png`;
            pointMap[0] = dadoAtual;
            isFree = true;
        } else {
            // Não tem espaço
            getSlot(turn, lineNumber + 1, 1).line.style.outline = "0.1vw red solid";
            setTimeout(() => {
                getSlot(turn, lineNumber + 1, 1).line.style.outline = "";
            }, 150);
        }

        // Resetar botão de rolar e passar turno caso o dado tiver sido colocado
        if (isFree == true) {
            // to fazendo
        }

        // Atualizar variaveis
        leftPointsMap[lineNumber].slots = pointMap;

        // Passar Turno
        
    }
}