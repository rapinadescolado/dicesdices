const leftSide = document.getElementById("leftSide");
const rightSide = document.getElementById("leftSide");
function getSlot(board,number) {
    let id = `${board}Side`;
    let slot = number - 1;
    return document.getElementById(id).getElementsByClassName("slot")[slot];
}

function start() {
    
}
