
export default class UserAction{
    constructor(){
        this.botaoCall = document.getElementById('call');
        this.botaoRaise = document.getElementById('raise');
        this.botaoCheck = document.getElementById('check');
        this.botaoAllin = document.getElementById('allin');
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

}
