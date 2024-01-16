import Baralho from "./Baralho.js"
import Game from "./Game.js"
import Interface from "./Interface.js"

const game = new Game(8)
const interfacee = new Interface()

game.Baralho.embaralhar(game.Baralho.Cartas)

document.getElementById('darCartas').addEventListener('click', darCartas);
document.getElementById('botaoAcao').addEventListener('click', acao);
document.getElementById('turn').addEventListener('click', turn);
document.getElementById('river').addEventListener('click', river);

function darCartas(){
    game.entregarCartasPlayer()
    interfacee.exibirCartaPlayer(game.Player[0].Mao[0], game.Player[0].Mao[1])
}

function acao() {
    game.colocarFlop()
    interfacee.exibirFlop(game.Baralho.Mesa[0], game.Baralho.Mesa[1], game.Baralho.Mesa[2])
}

function turn(){
    game.colocarTurn()
    interfacee.exibirTurn(game.Baralho.Mesa[3])
}

function river(){
    game.colocarRiver()
    interfacee.exibirRiver(game.Baralho.Mesa[4])
}

