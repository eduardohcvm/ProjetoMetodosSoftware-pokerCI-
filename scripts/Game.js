import Baralho from "./Baralho.js"
import Player from "./Player.js"
import Interface from "./Interface.js"

const interfacee = new Interface()

export default class Game{
    constructor(qnt_players){
        this.player = []
        this.baralho = new Baralho()
        this.qnt_players = qnt_players
        this.criarPlayers();
    }

    get Player(){
        return this.player
    }

    get Baralho(){
        return this.baralho
    }

    get Qnt_players(){
        return this.qnt_players
    }

    criarPlayers(){
        for(let i = 0; i <= this.Qnt_players - 1 ; i++){
            this.Player.push(new Player(i+1))
            interfacee.exibirPlayerLogo(i)
        }
    }

    puxarCarta(){
        return this.Baralho.Cartas.shift()
    }

    entregarCartasPlayer(){
        for(let j = 0 ; j <= 1 ; j++){
            for(let i = 0; i < this.Player.length; i++){    
                this.Player[i].adicionarCartaNaMao(this.puxarCarta())
            }
        }
    }


    colocarFlop(){
        this.Baralho.adicionarCartaNoDescarte(this.puxarCarta())
        for(let i = 0; i <= 2 ;i++){
            this.Baralho.adicionarCartaNaMesa(this.puxarCarta())
        }
    }

    colocarTurn(){
        this.Baralho.adicionarCartaNoDescarte(this.puxarCarta())
        this.Baralho.adicionarCartaNaMesa(this.puxarCarta())
    }

    colocarRiver(){
        this.Baralho.adicionarCartaNoDescarte(this.puxarCarta())
        this.Baralho.adicionarCartaNaMesa(this.puxarCarta())
    }

}