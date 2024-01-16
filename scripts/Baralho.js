import Cartas from "./Cartas.js"

export default class Baralho{
    constructor(){
        this.cartas = []
        this.descartes = []
        this.mesa = []
        this.criarCartas()
    }

    get Cartas(){
        return this.cartas
    }

    criarCartas(){
        const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        const naipes = ["C", "O", "E", "P"]

        //Criando cartas e adicionando no this.cartas
        for (const naipe of naipes){
            for (const valor of valores){
                const carta = new Cartas(valor, naipe)
                this.cartas.push(carta)
            }
        }
    }

    embaralhar(lista){
        //implementando o algoritmo Fisher–Yates
        for(let i = lista.length - 1; i > 0 ; i--){
            const indiceAleatorio = Math.floor(Math.random() * (i + 1));
            
            [lista[i], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[i]];
        }
    }

    //Retira a primeira carta do array e retorna ela
    puxarCarta(){
        return this.cartas.shift()
    }

    colocarFlop(){
        this.descartes.push(this.puxarCarta())
        for(let i = 0; i <= 2 ;i++){
            this.mesa.push(this.puxarCarta())
        }
        console.log(this.descartes)     //REMOVER DEPOIS DOS TESTES
        console.log(this.mesa)          //REMOVER DEPOIS DOS TESTES
    }

    colocarTurn(){
        this.descartes.push(this.puxarCarta())
        this.mesa.push(this.puxarCarta())
    }

    colocarRiver(){
        this.descartes.push(this.puxarCarta())
        this.mesa.push(this.puxarCarta())
    }

    colocarTodoBordo(){
        this.colocarFlop()
        this.colocarTurn()
        this.colocarRiver()
    }
}
