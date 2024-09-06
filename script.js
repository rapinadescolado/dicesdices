// MH: IMPORTANTE!!! defina um padrão para declarar suas variaveis, ou declara em portugues ou em ingles.... tu ta fazendo salada declarando hora em portugues hora em ingles.


// Declarar váriaveis
var gamemode; // Serve para definir qual vai ser o codigo de jogo usado
var turn; // Define quem está jogando, os valores podem ser "left" ou "right"
var moveawait; // Define o movimento q ta esperando q o jogador no turn atual faça. // "roll" para jogar dado. "select" para selecionar slot
var dadoAtual; // Dado que tirou no teste


//MH: Acho q antes de continuar as funções de calculo de dados e etc etc... faça a entrada dos players...
// novamente vc ta colocando o carro na frente dos bois... olha o arquivo 'sequencia.txt'... vc pulou o item 1
// que é identificar os jogadores.. faça a parte de identificação de jogadores... e ajuste as outras funções com base nisso
// e não com esquerda e direita... Entendo sua decisão de esquerda e direita, pois é oq faz mais sentido com o visual que você tem atualmente
// mas acho q seria melhor começar a definir como 'player1' e 'player2'...

const leftSide = document.getElementById("leftSide");
const leftPlayer = document.getElementById("leftPlayer");
const rightSide = document.getElementById("rightSide");
const rightPlayer = document.getElementById("rightPlayer");

var leftPointsTotal = 0;    // PointsTotal = Pontos totais(soma dos pontos de cada linha) // PointsMap = Pontos de cada slot separado certinho
var leftPointsMap = [ {"slots":[0,0,0]},{"slots":[0,0,0]},{"slots":[0,0,0]} ];
var rightPointsTotal = 0;
var rightPointsMap = [ {"slots":[0,0,0]},{"slots":[0,0,0]},{"slots":[0,0,0]} ];


// Definir as variaveis de acordo com o modo de jogo
function start(modo) {
    let menu = document.getElementById("menu");

    //MH: olha ainda acho desnecessario essa validação de gamemode 'undefined' 
    // pq a animação da tela subindo acontece muito rapido, rapido o suficiente 
    // para n permitir o jogador clicar nos dois btns ao mesmo tempo.
    if(modo == 'pvp' && gamemode == undefined) {

        //MH: reorganize as ordens dessas variaveis, hora vc está falando do menu, 
        // hora falando do jogo... siga um padrão logico, primeiro estabeleça oq precisa
        // para a animação do menu acontecer, dps estabeleça as variaveis que serão utilizadas no jogo.
        
        gamemode = modo;
        turn = "left";
        moveawait = "roll"
        menu.style.top = "-100vh";
        setTimeout(() => {
            menu.style.display = "none";
        }, 1000);

        //MH: Na variavel 'Turn' acima, acredito que vc precisará criar um if e um else ou um 
        // ternario para definir quem é o player da rodada, e reforço, passe a utilizar 'player1' e 'player2'
        // e não left e right.
    }

    if (modo == 'bot'  && gamemode == undefined) {
        // fazer mais tarde
    }
}




function calcPoints(side) {
    // vo fazer dps
}

//MH: TODAS ESSAS 3 funções abaixo devem estar dentro de uma função de jogador!... 
// acredito que dps que vc setar qual o jogador esse 'moveawait' pode morrer tbm... 

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

// Functions do PVP
function roll() {
    if (moveawait == "roll") {

        //MH: nessa função de roll, vc não precisa dessa variavel 'result'... Pense um pouco...
        // Dica: vc dentro do innerHTML vc pode colocar QUALQUER COISA... inclusive HTML...
        
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