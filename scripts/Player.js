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

    tomarDecisao(valor, rodada, interfacee, pote){
        let smallTemp = 5
        let bigTemp = 10
        let numeroAleatorio = Math.floor(Math.random() * 99);

        let agressivo = numeroAleatorio <= 32;
        let passivo = numeroAleatorio > 32 && numeroAleatorio <= 65;
        let medroso = numeroAleatorio > 65;
        
        if(rodada === 'preflop'){
            if(this.Posicao === 'Small-Blind'){
                if(medroso){ // Sempre fold
                    this.foldar(interfacee)
                    return valor
                }else if(passivo){ // Completa o small ou 50% fold/50% call se teve raise
                    if(valor === bigTemp) {
                        this.callSmall(smallTemp, interfacee)
                    } else {
                        let numeroAleatorio2 = Math.floor(Math.random() * 100)

                        if(numeroAleatorio2 < 50) {
                            this.foldar(interfacee)
                        } else {
                            this.call(valor - smallTemp, interfacee)
                        }
                    }
                    return valor
                }else{ // 70% call/30% raise 2x
                    let numeroAleatorio3 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio3 < 70) {
                        if(valor === bigTemp) {
                            this.callSmall(smallTemp, interfacee)
                        } else {
                            this.call(valor - smallTemp, interfacee)
                        }
                        return valor
                    } else {
                        this.raise(valor * 2 - smallTemp, interfacee)
                        return valor * 2
                    }
                }
            }else if(this.Posicao === 'Big-Blind'){   
                if(medroso){ // Check/fold
                    if(valor === bigTemp){
                        this.check(interfacee)
                    }else{
                        this.foldar(interfacee)
                    }
                    return valor
                }else if(passivo){ // Check ou 50% fold/50% call (se teve raise)
                    if(valor === bigTemp){
                        this.check(interfacee)
                    }else{
                        let numeroAleatorio4 = Math.floor(Math.random() * 100)

                        if(numeroAleatorio4 < 50) {
                            this.foldar(interfacee)
                        } else {
                            this.call(valor - bigTemp, interfacee)
                        }
                    }
                    return valor
                }else{ // 70% check ou call/30% raise 2x
                    let numeroAleatorio5 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio5 < 70) {
                        if(valor === bigTemp) {
                            this.check(interfacee)
                        } else {
                            this.call(valor - bigTemp, interfacee)
                        }
                        return valor
                    } else {
                        this.raise(valor * 2 - bigTemp, interfacee)
                        return valor * 2
                    }
                }
            }else{
                if(medroso){ // Sempre fold
                    this.foldar(interfacee)
                    return valor
                }else if(passivo){ // 50% fold/50% call
                    let numeroAleatorio6 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio6 < 50) {
                        this.foldar(interfacee)
                    } else {
                        this.call(valor, interfacee)
                    }
                    return valor
                }else{ // 70% call/30% raise 2x
                    let numeroAleatorio7 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio7 < 70) {
                        this.call(valor, interfacee)
                        return valor
                    } else {
                        this.raise(valor * 2, interfacee)
                        return valor * 2
                    }
                }
            }
        }else{ // Flop, turn e river
            if(medroso){ // Check/fold
                if (valor === 0){
                    this.check(interfacee)
                }else{
                    this.foldar(interfacee)
                }
                return valor
            }else if(passivo){ // 70% check/30% bet 40% do pote (se open) ou 50% fold/50% call (se teve raise/bet)
                if(valor === 0){
                    let numeroAleatorio8 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio8 < 70) {
                        this.check(interfacee)
                        return valor
                    } else {
                        this.raise(pote * 4 / 10, interfacee)
                        return pote * 4 / 10
                    }
                }else{
                    let numeroAleatorio9 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio9 < 50) {
                        this.foldar(interfacee)
                    } else {
                        this.call(valor, interfacee)
                    }
                    return valor
                }
            }else{ //Sempre bet 60% do pote (se open) ou 70% call/30% raise 2x (se teve raise/bet)
                if(valor === 0){
                    this.raise(pote * 6 / 10, interfacee)
                    return pote * 6 / 10
                }else{
                    let numeroAleatorio10 = Math.floor(Math.random() * 100)

                    if(numeroAleatorio10 < 70) {
                        this.call(valor, interfacee)
                        return valor
                    } else {
                        this.raise(valor * 2, interfacee)
                        return valor * 2
                    }
                }
            }
        }
    }

    callSmall(valor, interfacee){
        console.log(`O jogador ${this.Id} colocou o Small`)
        this.Stack = this.Stack - valor

        interfacee.atualizarPlayerStack(this.Id, valor)
    }

    call(valor, interfacee){
        console.log(`O jogador ${this.Id} deu call`)
        this.Stack = this.Stack - valor

        interfacee.exibirPlayerStack(this.Id, valor)
    }

    check(interfacee){
        console.log(`O jogador ${this.Id} deu check`)
        if(interfacee.existeStackInterface(this.id)){
            interfacee.removerPlayerStack(this.id)
        }
        interfacee.exibirPlayerCheck(this.Id)
    }

    foldar(interfacee){
        console.log(`O jogador ${this.Id} foldou`)

        if(this.Id != 1){
            interfacee.removerPlayerBackCards(this.Id)
            interfacee.atualizarPlayerNameFold(this.Id)
        }
        
        this.Fold = true
    }

    raise(valor, interfacee){  //Adicioar verificaçao da linha 244
        console.log(`O jogador ${this.Id} deu raise para ${valor}`)
        this.Stack -= valor
        interfacee.exibirPlayerStack(this.Id, valor)
    }

    allin(valor){
        console.log(`O jogador ${this.Id} deu ALL IN de ${valor}`)
        this.Stack -= valor
    }
     
}
