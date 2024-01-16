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
}