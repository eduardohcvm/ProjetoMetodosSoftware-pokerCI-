import Cartas from "./Cartas.js"

export default class Player{
    constructor(id){
        this.id = id
        this.mao = []
        this.bot = true
    }

    get Mao(){
        return this.mao
    }
    get Id(){
        return this.id
    }
    get Bot(){
        return this.bot
    }

    set Bot(valor){
        this.bot = valor
    }

    adicionarCartaNaMao(carta){
        this.mao.push(carta)
    }
     
}