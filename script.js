// Declarar váriaveis
var gamemode; // Serve para definir qual vai ser o codigo de jogo usado
var turn; // Define quem está jogando, os valores podem ser "1" ou "2"
var moveawait; // Define o movimento q ta esperando q o jogador no turn atual faça. // "roll" para jogar dado. "select" para selecionar slot
var dice; // Dado que tirou no teste

var player1Name;
const player1Board = document.getElementById("board1");
const player1Char = document.getElementById("player1");
var player2Name;
const player2Board = document.getElementById("board2");
const player2Char = document.getElementById("player2");

var player1PointsTotal = 0;    // PointsTotal = Pontos totais(soma dos pontos de cada linha) // PointsMap = Pontos de cada slot separado certinho
var player1PointsMap = [ {"slots":[0,0,0]},{"slots":[0,0,0]},{"slots":[0,0,0]} ];
var player2PointsTotal = 0;
var player2PointsMap = [ {"slots":[0,0,0]},{"slots":[0,0,0]},{"slots":[0,0,0]} ];


// Definir as variaveis de acordo com o modo de jogo
function start(modo) {
    let menu = document.getElementById("menu");
    let nicknames = document.getElementsByClassName("playerNickname")

    if(modo == 'pvp') {
        // Input nome dos jogadores
        player1Name = prompt("Digite o nome do jogador 1","");
        player1Name = player1Name != "" ? player1Name : "Jogador 1";
        player2Name = prompt("Digite o nome do jogador 2","");
        player2Name = player2Name != "" ? player2Name : "Jogador 2";
        nicknames[0].innerHTML = player1Name;
        nicknames[1].innerHTML = player2Name;
        
        // Setar variaveis do pvp
        gamemode = modo;
        turn = `${Math.floor(Math.random()*2 + 1)}`;
        moveawait = "roll";
        alert(`O primeiro turno será do ${nicknames[turn - 1].innerHTML}!`)
        

        // Subir Menu
        menu.style.top = "-100vh";
        setTimeout(() => {
            menu.style.display = "none";
        }, 1000);
    }

    if (modo == 'bot') {
        // fazer mais tarde
    }
}

//MH: TODAS ESSAS 3 funções abaixo devem estar dentro de uma função de jogador!... 
// acredito que dps que vc setar qual o jogador esse 'moveawait' pode morrer tbm... 

// Function pra retornar slots e function para calcular pontos
function getSlot(side, line, number) {
    side = `board${side}`;
    line = line - 1;
    number = number - 1;
    let response = {
        "line": document.getElementById(side).getElementsByClassName("line")[line],
        "slot": document.getElementById(side).getElementsByClassName("line")[line].children[number],
        "img": document.getElementById(side).getElementsByClassName("line")[line].children[number].firstChild
    };
    return response;
}

// Functions do PVP
function roll() {
    if (moveawait == "roll") {

        dice = Math.floor(Math.random()*6 + 1);
        let button = document.getElementById("rollButton");
        button.style.transform = "rotate(720deg)";
        button.innerHTML = "";
        setTimeout(()=>{
            button.innerHTML = `<img src="img/dado${dice}.png">`
            moveawait = "select";
        }, 1500)

    }
}

function selectLine(line) {
    if (moveawait == "select") {

        // Definir qual lado ta sendo usado e a line escolhida
        let lineNumber = line;
        let isFree = false;
        if (turn == "1") {
            pointMap = player1PointsMap[line].slots;
            line = player1Board.children[line];
        } else {
            pointMap = player2PointsMap[line].slots;
            line = player2Board.children[line];
        }

        // Checar se tem espaço vazio na line e colocar dado na linha
        if (pointMap[2] == 0) {
            // Tem espaço no primeiro slot
            getSlot(turn, lineNumber + 1, 3).img.src = `img/dado${dice}.png`;
            pointMap[2] = dice;
            isFree = true;
        } else if (pointMap[1] == 0) {
            // Tem espaço no segundo slot
            getSlot(turn, lineNumber + 1, 2).img.src = `img/dado${dice}.png`;
            pointMap[1] = dice;
            isFree = true;
        } else if (pointMap[0] == 0) {
            // Tem espaço no terceiro slot
            getSlot(turn, lineNumber + 1, 1).img.src = `img/dado${dice}.png`;
            pointMap[0] = dice;
            isFree = true;
        } else {
            // Não tem espaço
            getSlot(turn, lineNumber + 1, 1).line.style.outline = "0.2vw red solid";
            setTimeout(() => {
                getSlot(turn, lineNumber + 1, 1).line.style.outline = "";
            }, 150);
        }
        
        // Resetar botão de rolar e passar turno caso o dado tiver sido colocado
        if (isFree == true) {
            // to fazendo
        }

        // Atualizar variaveis
        player1PointsMap[lineNumber].slots = pointMap;

        // Passar Turno
        
    }
}



//MH: considerações finais... entendo suas escolhas para uso de Arrays e maps... 
// mas tente não utilizalas por agora, domine a forma primordial de lidar com elementos, pegue elemento por 
// elemento da forma mais crua possivel... com 'getElementById' ou 'getElementsByClassName'...

//Acho que você está complicando seu codigo de formas que está fincando até complicado de ler... 
// está refenciando coisas que pingam de um lado para o outro, quando não havia a extrema necessidade para tal
// evite o uso de funções externas para executar coisas q poderiam muito bem ser feitas dentro de uma unica função..
// por exemplo, a criação da função 'getSlot' é desnecessaria... tudo poderia ser executado dentro de 'selectLine'

//Acho q mais uma vez vc vai precisar reanalisar tudo... siga o roteiro do 'sequencia.txt' e não coloque os pés pela cabeça...
// faça com que o menu esteja fncionando 100% dps disso defina a função que vai estabelecer quem são os jogadores...
// depooois de tudo isso setado... ai sim vc cria o dado e todas as suas funções e etc etc etc