import Cartas from "./Cartas.js"

export default class Player{
    constructor(id, stack){
        this.id = id
        this.mao = []
        this.bot = true
        this.stack = stack
        this.posicao = null
        this.jogou = false
        this.fold = false
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
    get Fold(){
        return this.fold
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

    set Fold(valor){
        this.fold = valor
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

    resetPlayerFold(){
        this.fold = false;
    }

    tomarDecisao(valor, rodada, pote){
        let smallTemp = 5
        let bigTemp = 10
        let numeroAleatorio = Math.floor(Math.random() * 99);

        let agressivo = numeroAleatorio <= 32;
        let passivo = numeroAleatorio > 32 && numeroAleatorio <= 65;
        let medroso = numeroAleatorio > 65;
        
        if(rodada === 'preflop'){
            if(this.Posicao === 'Small-Blind'){
                if(medroso){ // Sempre fold
                    this.foldar()
                    return valor
                }else if(passivo){ // Completa o small ou 50% fold/50% call se teve raise
                    if(valor === bigTemp) {
                        this.callSmall(smallTemp)
                    } else {
                        let numeroAleatorio2 = Math.floor(Math.random() * 100)

                        if(numeroAleatorio2 < 50) {
                            this.foldar()
                        } else {
                            this.call(valor)
                        }
                    }
                    return valor
                }else{ // 70% call/30% raise 2x
                    let numeroAleatorio3 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio3 < 70) {
                        if(valor === bigTemp) {
                            this.callSmall(smallTemp)
                        } else {
                            this.call(valor)
                        }
                        return valor
                    } else {
                        this.raise(valor * 2)
                        return valor * 2
                    }
                }
            }else if(this.Posicao === 'Big-Blind'){   
                if(medroso){ // Check/fold
                    if(valor === bigTemp){
                        this.check()
                    }else{
                        this.foldar()
                    }
                    return valor
                }else if(passivo){ // Check ou 50% fold/50% call (se teve raise)
                    if(valor === bigTemp){
                        this.check()
                    }else{
                        let numeroAleatorio4 = Math.floor(Math.random() * 100)

                        if(numeroAleatorio4 < 50) {
                            this.foldar()
                        } else {
                            this.call(valor)
                        }
                    }
                    return valor
                }else{ // 70% check ou call/30% raise 2x
                    let numeroAleatorio5 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio5 < 70) {
                        if(valor === bigTemp) {
                            this.check()
                        } else {
                            this.call(valor)
                        }
                        return valor
                    } else {
                        this.raise(valor * 2)
                        return valor * 2
                    }
                }
            }else{
                if(medroso){ // Sempre fold
                    this.foldar()
                    return valor
                }else if(passivo){ // 50% fold/50% call
                    let numeroAleatorio6 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio6 < 50) {
                        this.foldar()
                    } else {
                        this.call(valor)
                    }
                    return valor
                }else{ // 70% call/30% raise 2x
                    let numeroAleatorio7 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio7 < 70) {
                        this.call()
                        return valor
                    } else {
                        this.raise(valor * 2)
                        return valor * 2
                    }
                }
            }
        }else{ // Flop, turn e river
            if(medroso){ // Check/fold
                if (valor === 0){
                    this.check()
                }else{
                    this.fold()
                }
                return valor
            }else if(passivo){ // 70% check/30% bet 40% do pote (se open) ou 50% fold/50% call (se teve raise/bet)
                if(valor === 0){
                    let numeroAleatorio8 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio8 < 70) {
                        this.check()
                        return valor
                    } else {
                        this.raise(pote * 4 / 10)
                        return pote * 4 / 10
                    }
                }else{
                    let numeroAleatorio9 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio9 < 50) {
                        this.foldar()
                    } else {
                        this.call(valor)
                    }
                    return valor
                }
            }else{ //Sempre bet 60% do pote (se open) ou 70% call/30% raise 2x (se teve raise/bet)
                if(valor === 0){
                    this.raise(pote * 6 / 10)
                    return pote * 6 / 10
                }else{
                    let numeroAleatorio10 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio10 < 70) {
                        this.call(valor)
                        return valor
                    } else {
                        this.raise(valor * 2)
                        return valor * 2
                    }
                }
            }
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

    foldar(){
        console.log(`O jogador ${this.Id} foldou`)
        this.Fold = true
        this.jogou = true
    }

    raise(valor){
        console.log(`O JOGADOR ${this.Id} deu raise para ${valor}`)
        this.Stack -= valor
        this.jogou = true
    }

    allin(valor){
        console.log(`O JOGADOR ${this.Id} deu ALL IN de ${valor}`)
        this.Stack -= valor
        this.jogou = true
    }
     
}
