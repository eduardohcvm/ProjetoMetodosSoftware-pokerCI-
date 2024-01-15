import Cartas from "./Cartas"

export default class Player{
    constructor(){
        this.position = null
        this.mao = []
    }

    get position(){
        return this.position
    }

    get Mao(){
        return this.mao
    }
}