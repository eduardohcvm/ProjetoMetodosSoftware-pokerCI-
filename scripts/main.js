import Baralho from "./Baralho.js"
import Game from "./Game.js"

const game = new Game(8)
game.baralho.embaralhar(game.baralho.cartas)

document.getElementById('darCartas').addEventListener('click', darCartas);
document.getElementById('botaoAcao').addEventListener('click', acao);
document.getElementById('turn').addEventListener('click', turn);
document.getElementById('river').addEventListener('click', river);

console.log(game.player)

function darCartas(){
    game.entregarCartasPlayer()
    game.exibirCartaPlayer()
}

function acao() {
    game.baralho.colocarFlop()
    game.exibirFlop()
}

function turn(){
    game.baralho.colocarTurn()
    game.exibirTurn()
}

function river(){
    game.baralho.colocarRiver()
    game.exibirRiver()
}

