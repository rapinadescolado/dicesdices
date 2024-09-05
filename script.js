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

        // MH: busque outra forma de animar a tela! Sem se apoiar no css, use apenas o javascript para animar a tela!
            // RV: Eu acho q é assim, ta certo?
            
        document.getElementById("menu").style.top = "-100vh";
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