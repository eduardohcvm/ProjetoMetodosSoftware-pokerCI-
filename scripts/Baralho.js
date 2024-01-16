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

    get Descartes(){
        return this.descartes
    }

    get Mesa(){
        return this.mesa
    }

    adicionarCartaNaMesa(carta){
        this.mesa.push(carta)
    }

    adicionarCartaNoDescarte(carta){
        this.descartes.push(carta)
    }

    criarCartas(){
        const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]
        const naipes = ["hearts", "diamonds", "spades", "clubs"]

        //Criando cartas e adicionando no this.cartas
        for (const naipe of naipes){
            for (const valor of valores){
                const carta = new Cartas(valor, naipe)
                this.Cartas.push(carta)
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
}
