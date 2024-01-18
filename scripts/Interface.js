const mesa = document.querySelector(".mesa")
const box_mesa = document.querySelector(".mao")
const flop_bordo = document.querySelector(".flop")
const turn_bordo = document.querySelector(".turn")
const river_bordo = document.querySelector(".river")

export default class Interface{

    exibirPlayerLogo(index){
        const playerDiv = document.createElement("div")
        playerDiv.className = `player player-${index + 1}`
        playerDiv.innerHTML = `Player - ${index + 1}`
        mesa.appendChild(playerDiv)
    }

    exibirCartaPlayer(carta1, carta2){
        const mao = document.createElement("div")
        const img1 = document.createElement("img")
        const img2 = document.createElement("img")

        mao.className = "mao"
        img1.src = `../img/${carta1.Valor}_of_${carta1.Naipe}.png`
        img2.src = `../img/${carta2.Valor}_of_${carta2.Naipe}.png`

        mesa.appendChild(mao)
        mao.appendChild(img1)
        mao.appendChild(img2)
    }

    exibirCartaPlayerBot(id, carta1, carta2){
        const mao = document.createElement("div")
        const img1 = document.createElement("img")
        const img2 = document.createElement("img")

        mao.className = `mao mao-${id}`
        img1.src = `../img/${carta1.Valor}_of_${carta1.Naipe}.png`
        img2.src = `../img/${carta2.Valor}_of_${carta2.Naipe}.png`

        mesa.appendChild(mao)
        mao.appendChild(img1)
        mao.appendChild(img2)
    }

    removerCartaPlayer(){
        const mesa = document.querySelector(".mao")
        while (mesa.firstChild) {
            mesa.removeChild(mesa.firstChild);
          }
    }

    removerCartaPlayerBot(){
        const elementosMao = document.querySelectorAll('.mesa .mao');

        elementosMao.forEach(elemento => {
            mesa.removeChild(elemento);
        });
    }

    exibirPosicao(playerInicial){
        const posicaoDiv     = document.createElement("div")
        posicaoDiv.className = 'posicao'
        posicaoDiv.innerHTML = `${playerInicial.Posicao}`

        const playerLogo = document.querySelector(`.player.player-${playerInicial.Id}`)
        
        playerLogo.appendChild(posicaoDiv)
    }

    removerPosicao(posicao){
        const playerLogo = document.querySelector(`.player.player-${posicao}`);
        const posicaoDiv = playerLogo.querySelector('.posicao');
    
        if (posicaoDiv) {
            playerLogo.removeChild(posicaoDiv);
        }
    }

    exibirFlop(carta1, carta2, carta3){

        const img1 = document.createElement("img")
        const img2 = document.createElement("img")
        const img3 = document.createElement("img")

        img1.src = `../img/${carta1.Valor}_of_${carta1.Naipe}.png`
        img2.src = `../img/${carta2.Valor}_of_${carta2.Naipe}.png`
        img3.src = `../img/${carta3.Valor}_of_${carta3.Naipe}.png`

        flop_bordo.appendChild(img1)
        flop_bordo.appendChild(img2)
        flop_bordo.appendChild(img3)
    }

    removerFlop(){
        while (flop_bordo.firstChild) {
            flop_bordo.removeChild(flop_bordo.firstChild);
          }
    }

    exibirTurn(carta){
        const img = document.createElement("img")
        img.src = `../img/${carta.Valor}_of_${carta.Naipe}.png`
        turn_bordo.appendChild(img)
    }

    removerTurn(){
        turn_bordo.removeChild(turn_bordo.firstChild);
    }

    exibirRiver(carta){
        const img = document.createElement("img")
        img.src = `../img/${carta.Valor}_of_${carta.Naipe}.png`
        river_bordo.appendChild(img)
    }

    removerRiver(){
        river_bordo.removeChild(river_bordo.firstChild);
    }

    resetInterface(posicao){
        this.removerCartaPlayer()
        this.removerCartaPlayerBot()
        this.removerFlop()
        this.removerTurn()
        this.removerRiver()
        this.removerPosicao(posicao)
    }
}