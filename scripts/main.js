import Baralho from "./Baralho.js"

const baralho = new Baralho()

//SO PARA DEBUGAR ;; Ver no CONSOLE 

const array = [] 
function criarArray(){
    for(let i = 0; i < baralho.cartas.length; i++){
        array.push(baralho.cartas[i])
    }
}

document.getElementById('botaoAcao').addEventListener('click', acao);
document.getElementById('turn').addEventListener('click', turn);
document.getElementById('river').addEventListener('click', river);
document.getElementById('all').addEventListener('click', all);

function acao() {
    baralho.embaralhar(baralho.cartas)
    criarArray()
    baralho.colocarFlop()
}

function turn(){
    baralho.colocarTurn()
}

function river(){
    baralho.colocarRiver()
}

function all(){
    baralho.colocarTodoBordo()
}

console.log(array)

//SO PARA DEBUGAR ;; Ver no CONSOLE 