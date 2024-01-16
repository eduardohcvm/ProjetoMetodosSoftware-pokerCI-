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
        const img1 = document.createElement("img")
        const img2 = document.createElement("img")
        
        img1.src = `../img/${carta1.Valor}_of_${carta1.Naipe}.png`
        img2.src = `../img/${carta2.Valor}_of_${carta2.Naipe}.png`

        box_mesa.appendChild(img1)
        box_mesa.appendChild(img2)
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

    exibirTurn(carta){
        const img = document.createElement("img")
        img.src = `../img/${carta.Valor}_of_${carta.Naipe}.png`
        turn_bordo.appendChild(img)
    }

    exibirRiver(carta){
        const img = document.createElement("img")
        img.src = `../img/${carta.Valor}_of_${carta.Naipe}.png`
        river_bordo.appendChild(img)
    }
}