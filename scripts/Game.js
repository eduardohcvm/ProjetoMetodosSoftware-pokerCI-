import Baralho from "./Baralho.js"
import Player from "./Player.js"
import Interface from "./Interface.js"
import UserAction from "./UserAction.js"

const interfacee = new Interface()
const userAction = new UserAction()

export default class Game {
    constructor(qnt_players, smallBlindValor, bigBlindValor) {
        this.player = [];
        this.baralho = new Baralho();
        this.qnt_players = qnt_players;
        this.rodada = "preflop";
        this.dealer = null;
        this.smallBlind = null;
        this.bigBlind = null;
        this.smallBlindValor = null
        this.bigBlindValor = null
        this.pot = 0
        this.definirBlinds(smallBlindValor, bigBlindValor)
        this.criarPlayers();
        this.definirPosiçõesIniciais();
    }


    get Player() {
        return this.player
    }

    get Baralho() {
        return this.baralho
    }

    get Qnt_players() {
        return this.qnt_players
    }

    get Rodada() {
        return this.rodada
    }

    get Dealer() {
        return this.dealer
    }

    get SmallBlind() {
        return this.smallBlind
    }

    get BigBlind() {
        return this.bigBlind
    }

    get Blinds() {
        return this.blinds
    }

    get Pot() {
        return this.pot
    }

    get SmallBlindValor() {
        return this.smallBlindValor
    }

    get BigBlindValor() {
        return this.bigBlindValor
    }


    set Dealer(player) {
        this.dealer = player
    }

    set Rodada(rodada){
        this.rodada = rodada
    }

    set SmallBlind(player) {
        this.smallBlind = player
    }

    set BigBlind(player) {
        this.bigBlind = player
    }

    set Pot(valor) {
        this.pot = valor
    }

    set SmallBlindValor(valor) {
        this.smallBlindValor = valor
    }

    set BigBlindValor(valor) {
        this.bigBlindValor = valor
    }

    esperarUmSegundo() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 200);
        });
    }

    criarPlayers() {
        for (let i = 0; i <= this.Qnt_players - 1; i++) {
            this.Player.push(new Player(i + 1, 10000))
            interfacee.exibirPlayerCompleto(this.Player[i])
        }
        this.Player[0].Bot = false
    }

    definirPosiçõesIniciais() {
        if (this.Qnt_players === 8) {
            this.Dealer = this.Player[Math.floor(Math.random() * (this.Qnt_players))]
            //usar dealer.Id pois id vai de 1 a 8, array player de 0 a 7. Se o smallblind é o player 8 no array de players ele é 7
            this.SmallBlind = this.player[this.Dealer.Id == this.Qnt_players ? (this.Dealer.Id - this.Qnt_players) : this.Dealer.Id]
            this.BigBlind = this.player[this.Dealer.Id + 1 >= this.Qnt_players ? ((this.Dealer.Id + 1) - this.Qnt_players) : this.Dealer.Id + 1]

            this.Dealer.Posicao = "D"
            this.SmallBlind.Posicao = "Small-Blind"
            this.BigBlind.Posicao = "Big-Blind"

            interfacee.exibirPosicao(this.Dealer)

        } else {
            alert("Jogos com quantidade de player != 8 ainda n foram programados")
        }
    }

    definirBlinds(smallBlindValor, bigBlindValor) {
        this.SmallBlindValor = smallBlindValor
        this.BigBlindValor = bigBlindValor
    }

    definirValoresBlinds() {
        for (let i = 0; i <= this.Qnt_players - 1; i++) {
            if (this.Player[i].Posicao == "Small-Blind") {
                interfacee.exibirPlayerStack(this.Player[i], this.SmallBlindValor)
                interfacee.exibirPlayerStack(this.Player[i + 1 == this.Qnt_players ? ((i + 1) - this.Qnt_players) : i + 1], this.BigBlindValor)
            }
        }
    }

    atualizarPosicoesPlayers() {
        this.resetarPosicaoPlayers()
        this.Dealer = this.Player[this.Dealer.Id == 8 ? (this.Dealer.Id - this.Qnt_players) : this.Dealer.Id]
        this.SmallBlind = this.player[this.SmallBlind.Id == this.Qnt_players ? ((this.SmallBlind.Id) - this.Qnt_players) : this.SmallBlind.Id]
        this.BigBlind = this.player[this.BigBlind.Id == this.Qnt_players ? (this.BigBlind.Id - this.Qnt_players) : this.BigBlind.Id]

        this.Dealer.Posicao = "D"
        this.SmallBlind.Posicao = "Small-Blind"
        this.BigBlind.Posicao = "Big-blind"

        interfacee.exibirPosicao(this.Dealer)
    }

    resetarPosicaoPlayers() {
        for (let i = 0; i < this.Qnt_players; i++) {
            this.Player[i].Posicao = null
        }
    }

    pegarPrimeiroAJogarPreFlop() {
        if (this.Qnt_players > 3) {
            return this.Player[this.BigBlind.Id === this.Qnt_players ? (this.BigBlind.Id - this.Qnt_players) : this.BigBlind.Id]
        }
    }

    pegarPrimeiroAJogarPosFlop() {
        if (this.Qnt_players > 2) {
            return this.SmallBlind
        }
    }

    puxarCarta() {
        return this.Baralho.Cartas.shift()
    }

    entregarCartasPlayer() {
        for (let j = 0; j <= 1; j++) {
            for (let i = 0; i < this.Player.length; i++) {
                this.Player[i].adicionarCartaNaMao(this.puxarCarta())
            }
        }
    }


    colocarFlop() {
        this.Baralho.adicionarCartaNoDescarte(this.puxarCarta())
        for (let i = 0; i <= 2; i++) {
            this.Baralho.adicionarCartaNaMesa(this.puxarCarta())
        }
        interfacee.exibirFlop(this.Baralho.Mesa[0], this.Baralho.Mesa[1], this.Baralho.Mesa[2])
    }

    colocarTurn() {
        this.Baralho.adicionarCartaNoDescarte(this.puxarCarta())
        this.Baralho.adicionarCartaNaMesa(this.puxarCarta())
        interfacee.exibirTurn(this.Baralho.Mesa[3])
    }

    colocarRiver() {
        this.Baralho.adicionarCartaNoDescarte(this.puxarCarta())
        this.Baralho.adicionarCartaNaMesa(this.puxarCarta())
        interfacee.exibirRiver(this.Baralho.Mesa[4])
    }

    ordenarVetorPlayers(primeiroAgir) {
        const aux = []

        for (let i = primeiroAgir.Id; i <= this.Qnt_players; i++) {
            aux.push(this.Player[i - 1])
        }
        if (aux.length <= this.Qnt_players) {
            for (let i = 1; i < primeiroAgir.Id; i++) {
                aux.push(this.Player[i - 1])
            }
        }
        return aux
    }

    async controlarAcaoPlayerBot(primeiroAgir) {
        const playersOrdenados = this.ordenarVetorPlayers(primeiroAgir)

        for (let i = 0; i < this.Qnt_players; i++) {
            if (playersOrdenados[i].Bot === false) {                         //Se for o Usuário
                await this.aguardarAcaoJogador();
                if (playersOrdenados[i].Posicao === 'Small-Blind') {
                    if (this.Rodada === 'preflop'){
                        playersOrdenados[i].tomarDecisao(this.SmallBlindValor, this.Rodada)
                        interfacee.removerPlayerStack(playersOrdenados[i])
                        this.Pot += this.smallBlindValor 
                    }else{
                        playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                        this.Pot += this.BigBlindValor 
                    }

                } else if (playersOrdenados[i].Posicao === 'Big-Blind') {
                    if (this.Rodada === 'preflop') {
                        playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                        interfacee.removerPlayerStack(playersOrdenados[i])
                        this.Pot += this.BigBlindValor 
                    }else{
                        playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                        this.Pot += this.BigBlindValor 
                    }

                } else {
                    playersOrdenados[i].call(this.BigBlindValor)
                    this.Pot += this.BigBlindValor 
                }
                interfacee.atualizarPlayerStackHub(playersOrdenados[i], playersOrdenados[i].Stack)
                playersOrdenados[i].Jogou = true

            } else {                                                         //Se for o Bot
                await this.esperarUmSegundo()
                if (playersOrdenados[i].Posicao === "Small-Blind") {
                    if (this.Rodada === 'preflop') {
                        playersOrdenados[i].tomarDecisao(this.SmallBlindValor, this.Rodada)
                        interfacee.removerPlayerStack(playersOrdenados[i])
                        this.Pot += this.SmallBlindValor 
                    }else{
                        playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                        this.Pot += this.BigBlindValor 
                    }
                }else if (playersOrdenados[i].Posicao === "Big-Blind"){
                    if (this.Rodada === 'preflop') {
                        playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                        interfacee.removerPlayerStack(playersOrdenados[i])
                        this.Pot += 0
                    }else{
                        playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                        this.Pot += this.BigBlindValor 
                    }
                }else {
                    playersOrdenados[i].tomarDecisao(this.BigBlindValor, this.Rodada)
                    this.Pot += this.BigBlindValor 
                }
            }
            interfacee.exibirPlayerStack(playersOrdenados[i], this.BigBlindValor)
            interfacee.atualizarPlayerStackHub(playersOrdenados[i], playersOrdenados[i].Stack)
            console.log(this.Pot)
            await this.esperarUmSegundo()
        }

    }

    async controlarRodadaPreFlop() {
        const primeiroAgir = this.pegarPrimeiroAJogarPreFlop()
        await this.controlarAcaoPlayerBot(primeiroAgir)

        this.Rodada = 'posflop'
        this.habilitarBotoes()
    }

    async controlarRodadaFlop() {
        const primeiroAgir = this.pegarPrimeiroAJogarPosFlop()
        this.colocarFlop()
        await this.controlarAcaoPlayerBot(primeiroAgir)

        this.habilitarBotoes()
    }

    async controlarRodadaTurn() {
        const primeiroAgir = this.pegarPrimeiroAJogarPosFlop()
        this.colocarTurn()
        await this.controlarAcaoPlayerBot(primeiroAgir)

        this.habilitarBotoes()
    }

    async controlarRodadaRiver() {
        const primeiroAgir = this.pegarPrimeiroAJogarPosFlop()
        this.colocarRiver()
        await this.controlarAcaoPlayerBot(primeiroAgir)

        this.habilitarBotoes()
    }

    verificarSeTodosBotsJogaram() {
        for (let i = 0; i < this.Qnt_players; i++) {
            if (this.Player[i].Jogou === false) {
                return console.log(false)
            }
        }
        return true
    }

    verificarSePlayerJogou(player) {
        return player.Jogou === true ? true : false
    }

    apostasObrigatorias() {
        this.SmallBlind.callSmall(this.SmallBlindValor)
        this.BigBlind.call(this.BigBlindValor)

        this.Pot = this.SmallBlindValor + this.BigBlindValor
        console.log(this.Pot)
        
        interfacee.atualizarPlayerStackHub(this.SmallBlind, this.SmallBlind.Stack)
        interfacee.atualizarPlayerStackHub(this.BigBlind, this.BigBlind.Stack)
    }


    async jogar() {
        let botaoClicado

        this.Baralho.embaralhar(this.Baralho.Cartas)
        this.entregarCartasPlayer()
        interfacee.exibirCartaPlayer(this.Player[0].Mao[0], this.Player[0].Mao[1])
        this.definirValoresBlinds()

        //apostas obrigatorias
        this.apostasObrigatorias()

        //PRÉ FLOP

        await this.controlarRodadaPreFlop()
        interfacee.removerAllPlayerStack()

        console.log(this.Baralho.Cartas, this.Player, this.Pot)
        //FLOP

        await this.controlarRodadaFlop()
        interfacee.removerAllPlayerStack()

        console.log(this.Baralho.Cartas, this.Player, this.Pot)
        //TURN

        await this.controlarRodadaTurn()
        interfacee.removerAllPlayerStack()

        console.log(this.Baralho.Cartas, this.Player, this.Pot)
        //RIVER

        await this.controlarRodadaRiver()
        interfacee.removerAllPlayerStack()

        console.log(this.Baralho.Cartas, this.Player, this.Pot)
        this.showDown()

        botaoClicado = await this.aguardarAcaoJogador()
        this.habilitarBotoes()

        this.proximaRodada()

    }

    showDown() {
        for (let i = 1; i < this.Player.length; i++) {
            interfacee.exibirCartaPlayerBot(this.Player[i].Id, this.Player[i].Mao[0], this.Player[i].Mao[1])
        }
    }

    async proximaRodada() {
        console.log("Próxima rodada!")
        for (const players of this.Player) {
            players.resetMao()
        }

        this.Baralho.resetBaralho()
        this.Baralho.embaralhar(this.Baralho.Cartas)
        interfacee.resetInterface(this.Dealer.Id, this.SmallBlind, this.BigBlind)
        this.atualizarPosicoesPlayers()
        this.definirValoresBlinds()

        //Implementar Lógica de rodar as posições dos players

        this.jogar()
    }


    //N entendi quase porra nenhuma dessa função, so abstrai o conceito memsmo. Méritos para o gepeto aqui.
    async aguardarAcaoJogador() {
        return new Promise((resolve) => {
            const handleButtonClick = (event) => {
                this.desabilitarBotoes();
                document.removeEventListener('click', handleButtonClick);
                resolve(event.target.id);
            };

            // Adiciona event listeners para os botões
            userAction.BotaoCall.addEventListener('click', handleButtonClick);
            userAction.BotaoRaise.addEventListener('click', handleButtonClick);
            userAction.BotaoCheck.addEventListener('click', handleButtonClick);
            userAction.BotaoAllin.addEventListener('click', handleButtonClick);

            // Habilita os botões para a ação do jogador
            this.habilitarBotoes();
        });
    }

    habilitarBotoes() {
        userAction.BotaoCall.disabled = false;
        userAction.BotaoRaise.disabled = false;
        userAction.BotaoCheck.disabled = false;
        userAction.BotaoAllin.disabled = false;
    }

    desabilitarBotoes() {
        userAction.BotaoCall.disabled = true;
        userAction.BotaoRaise.disabled = true;
        userAction.BotaoCheck.disabled = true;
        userAction.BotaoAllin.disabled = true;
    }
}
