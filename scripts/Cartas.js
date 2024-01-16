export default class Cartas{
    constructor(valor, naipe){
        this.valor = valor
        this.naipe = naipe
    }

    get Valor(){
        return this.valor
    }

    get Naipe(){
        return this.naipe
    }

    set Valor(valor){
        this.valor = valor
    }

    set Naipe(naipe){
        this.naipe = naipe
    }
    
    pegarCarta(){
        return [this.valor, this.naipe]
    }
    
}