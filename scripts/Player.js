import Cartas from "./Cartas.js"

export default class Player{
    constructor(id, stack){
        this.id = id
        this.mao = []
        this.bot = true
        this.stack = stack
        this.posicao = null
        this.jogou = false
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
    get Posicao(){
        return this.posicao
    }
    get Jogou(){
        return this.jogou
    }
    get Stack(){
        return this.stack
    }


    set Mao(valor){
        this.mao = valor
    }

    set Bot(valor){
        this.bot = valor
    }

    set Posicao(posicao){
        this.posicao = posicao
    }

    set Stack(valor){
        this.stack = valor
    }

    set Jogou(valor){
        this.jogou = valor
    }

    adicionarCartaNaMao(carta){
        this.mao.push(carta)
    }

    fazerJogada(){
        console.log(this.Id + "jogou!")
    }

    resetMao(){
        this.Mao = []
    }

    tomarDecisao(valor, rodada){

        if(rodada === 'preflop'){
            if(this.Posicao === 'Small-Blind'){
                this.callSmall(valor)
            }else if(this.Posicao === 'Big-Blind'){   
                this.check()
            }else{
                this.call(valor)
            }
        }else{
            this.call(valor)
        }
        this.Jogou = true
    }

    callSmall(valor){
        console.log(`O jogador ${this.Id} completou o Small`)
        this.Stack = this.Stack - valor
    }

    call(valor){
        console.log(`O jogador ${this.Id} deu call`)
        this.Stack = this.Stack - valor
    }

    check(){
        console.log(`O jogador ${this.Id} deu check`)
        this.Jogou = true
    }
     
}
