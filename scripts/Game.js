import Baralho from "./Baralho.js"
import Player from "./Player.js"

const mesa = document.querySelector(".mesa")
const box_mesa = document.querySelector(".mao")
const flop_bordo = document.querySelector(".flop")
const turn_bordo = document.querySelector(".turn")
const river_bordo = document.querySelector(".river")

export default class Game{
    constructor(qnt_players){
        this.player = []
        this.baralho = new Baralho()
        this.qnt_players = qnt_players
        this.criarPlayers();
    }

    criarPlayers(){
        for(let i = 0; i <= this.qnt_players - 1 ; i++){
            this.player.push(new Player(i+1))

            const playerDiv = document.createElement("div")
            playerDiv.className = `player player-${i + 1}`
            playerDiv.innerHTML = `Player - ${i + 1}`
            mesa.appendChild(playerDiv)
            
        }
    }

    entregarCartasPlayer(){
        for(let j = 0 ; j <= 1 ; j++){
            for(let i = 0; i < this.player.length; i++){
                this.player[i].mao.push(this.baralho.puxarCarta())
            }
        }
    }

    exibirCartaPlayer(){
        const carta1 = this.converterCarta(this.player[0].mao[0])
        const carta2 = this.converterCarta(this.player[0].mao[1])

        const img1 = document.createElement("img")
        const img2 = document.createElement("img")
        
        img1.src = `../img/${carta1.valor}_of_${carta1.naipe}.png`
        img2.src = `../img/${carta2.valor}_of_${carta2.naipe}.png`

        box_mesa.appendChild(img1)
        box_mesa.appendChild(img2)
    }

    exibirFlop(){
        const carta1 = this.converterCarta(this.baralho.mesa[0])
        const carta2 = this.converterCarta(this.baralho.mesa[1])
        const carta3 = this.converterCarta(this.baralho.mesa[2])

        const img1 = document.createElement("img")
        const img2 = document.createElement("img")
        const img3 = document.createElement("img")

        img1.src = `../img/${carta1.valor}_of_${carta1.naipe}.png`
        img2.src = `../img/${carta2.valor}_of_${carta2.naipe}.png`
        img3.src = `../img/${carta3.valor}_of_${carta3.naipe}.png`

        flop_bordo.appendChild(img1)
        flop_bordo.appendChild(img2)
        flop_bordo.appendChild(img3)
    }

    exibirTurn(){
        const carta = this.converterCarta(this.baralho.mesa[3])
        const img = document.createElement("img")
        img.src = `../img/${carta.valor}_of_${carta.naipe}.png`
        turn_bordo.appendChild(img)
    }

    exibirRiver(){
        const carta = this.converterCarta(this.baralho.mesa[4])
        const img = document.createElement("img")
        img.src = `../img/${carta.valor}_of_${carta.naipe}.png`
        river_bordo.appendChild(img)
    }

    converterCarta(carta){
        switch (carta.valor) {
            case 'A':
                carta.valor = 'ace';
                break;
            case 'K':
                carta.valor = 'king';
                break;
            case 'Q':
                carta.valor = 'queen';
                break;
            case 'J':
                carta.valor = 'jack';
                break;
            default:
                break;
        }

        switch (carta.naipe) {
            case 'C':
                carta.naipe = 'hearts';
                break;
            case 'O':
                carta.naipe = 'diamonds';
                break;
            case 'E':
                carta.naipe = 'spades';
                break;
            case 'P':
                carta.naipe = 'clubs';
                break;
            default:
                break;
        }

        return carta
    }

}