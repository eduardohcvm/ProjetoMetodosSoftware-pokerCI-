const mesa = document.querySelector(".mesa")
const box_mesa = document.querySelector(".mao")
const flop_bordo = document.querySelector(".flop")
const turn_bordo = document.querySelector(".turn")
const river_bordo = document.querySelector(".river")


export default class Interface{

    exibirPlayerLogo(player){
        const playerDiv = document.createElement("div")
        const playerNameDiv = document.createElement("p")
        playerDiv.className = `player player-${player.Id}`
        playerNameDiv.innerHTML = `Player - ${player.Id}`
        playerDiv.append(playerNameDiv)
        mesa.appendChild(playerDiv)
    }

    exibirPlayerBackCards(player){
        const box_player = document.querySelector(`.player.player-${player.Id}`)
        if(player.Id != 1){
            const divBackCards = document.createElement("div")
            const backCard1 = document.createElement("img")
            const backCard2 = document.createElement("img")

            backCard1.src = "../img/Back_Blue.png"
            backCard2.src = "../img/Back_Blue.png"

            divBackCards.className = `boxBackCards playerBackCard-${player.id}`
            backCard1.className = "backCard"
            backCard2.className = "backCard"
    
            box_player.append(divBackCards)
            divBackCards.append(backCard1, backCard2)
        }
    }
    
    removerPlayerBackCards(id){
        document.querySelector(`.playerBackCard-${id}`).remove()
    }

    atualizarPlayerNameFold(id){
        document.querySelector(`.player.player-${id} p`).innerHTML = "Foldou"
    }

    exibirPlayerStackHub(player){
        const box_player = document.querySelector(`.player.player-${player.Id}`)
        const stackHub = document.createElement("div")

        stackHub.className = "boxStack"
        stackHub.innerHTML = `${player.stack}`
        if(player.Id === 4 || player.Id === 5 || player.Id === 6){
            stackHub.className = "boxStack boxStackBottom"
        }
        box_player.appendChild(stackHub)
    }

    atualizarPlayerStackHub(player, valor){
        const divPai = document.querySelector(`.player.player-${player.id}`)
        const divFilha = divPai.querySelector('.boxStack');

        divFilha.innerHTML = valor
    }

    exibirPlayerStack(id, valor){
        const stack= document.createElement("div")
        const chipImg = document.createElement("img")
        const chipTextValue = document.createElement("p")

        stack.className = `stack stack-${id}`
        chipImg.src = "../img/chip.png"
        chipTextValue.innerHTML = valor

        mesa.appendChild(stack)
        stack.appendChild(chipImg)
        stack.appendChild(chipTextValue)
    }

    atualizarPlayerStack(id, valor){
        const stack = document.querySelector(`.stack-${id} p`)
        stack.innerHTML = valor
    }

    exibirPlayerCheck(id){
        const stack = document.createElement("img")
        stack.src = "../img/check.png"
        stack.className = `check stack-${id}`

        mesa.appendChild(stack)
    }

    removerPlayerCheck(id){
        document.querySelector(`.check.stack-${id}`).remove()
    }


    removerPlayerStack(id){
        const divStack = document.querySelector(`.stack.stack-${id}`)
        if(divStack){
            mesa.removeChild(divStack)
        }
    }

    removerAllPlayerStack(){
        const divsStack = document.querySelectorAll('.mesa .stack');
        divsStack.forEach(div => div.remove());
    }

    removerAllPlayerCheck(){
        const divCheck = document.querySelectorAll('.mesa .check')
        divCheck.forEach(div => div.remove())
    }

    exibirPlayerCompleto(player){
        this.exibirPlayerLogo(player)
        this.exibirPlayerBackCards(player)
        this.exibirPlayerStackHub(player)
    }

    exibirPot(valor){
        const pot = document.createElement("div")
        const ficha = document.createElement("img")
        const valorDiv = document.createElement("p")

        pot.className = "pot"
        ficha.src = "../img/chip.png"
        valorDiv.className = "potValor"
        valorDiv.innerHTML = valor

        pot.append(ficha, valorDiv)
        mesa.append(pot)
    }

    atualizarPot(valor){
        document.querySelector(".potValor").innerHTML = valor
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

    resetInterface(posicaoDealer, smallBlind, bigBlind){
        this.removerCartaPlayer()
        this.removerCartaPlayerBot()
        this.removerFlop()
        this.removerTurn()
        this.removerRiver()
        this.removerPosicao(posicaoDealer)
        this.removerPlayerStack(smallBlind)
        this.removerPlayerStack(bigBlind)
    }

    existeStackInterface(id){
        const stack = document.querySelector(`.stack-${id}`)
        console.log(stack)
        return stack !== null;
    }
}