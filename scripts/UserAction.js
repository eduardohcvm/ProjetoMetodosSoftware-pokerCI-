export default class UserAction{
    constructor(){
        this.botaoFold = document.getElementById('fold');
        this.botaoCall = document.getElementById('call');
        this.botaoRaise = document.getElementById('raise');
        this.botaoCheck = document.getElementById('check');
        this.botaoAllin = document.getElementById('allin');
        this.valorRaise = document.querySelector('.valorRaise')
    }

    get BotaoFold(){
        return this.botaoFold
    }
    get BotaoCall(){
        return this.botaoCall
    }
    get BotaoRaise(){
        return this.botaoRaise
    }
    get BotaoCheck(){
        return this.botaoCheck
    }
    get BotaoAllin(){
        return this.botaoAllin
    }
    get ValorRaise(){
        return this.valorRaise.value
    }

}