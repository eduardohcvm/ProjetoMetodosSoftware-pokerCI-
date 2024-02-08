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
        this.rodadaAcabou = false
        this.dealer = null;
        this.smallBlind = null;
        this.bigBlind = null;
        this.smallBlindValor = null;
        this.bigBlindValor = null;
        this.pot = 0;
        this.bet = 0;
        this.definirBlinds(smallBlindValor, bigBlindValor);
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

    get Bet() {
        return this.bet
    }

    get RodadaAcabou(){
        return this.rodadaAcabou
    }


    set Dealer(player) {
        this.dealer = player
    }

    set Rodada(rodada) {
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

    set Bet(valor) {
        this.bet = valor
    }

    set RodadaAcabou(valor){
        this.rodadaAcabou = valor
    }


    esperarUmSegundo() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 250);
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
                interfacee.exibirPlayerStack(this.Player[i].Id, this.SmallBlindValor)
                interfacee.exibirPlayerStack(this.Player[i + 1 == this.Qnt_players ? ((i + 1) - this.Qnt_players) : i + 1].Id, this.BigBlindValor)
            }
        }
    }

    atualizarPosicoesPlayers() {
        this.resetarPosicaoPlayers()
        this.Dealer = this.Player[this.Dealer.Id == 8 ? (this.Dealer.Id - this.Qnt_players) : this.Dealer.Id]
        this.SmallBlind = this.Player[this.SmallBlind.Id == this.Qnt_players ? ((this.SmallBlind.Id) - this.Qnt_players) : this.SmallBlind.Id]
        this.BigBlind = this.Player[this.BigBlind.Id == this.Qnt_players ? (this.BigBlind.Id - this.Qnt_players) : this.BigBlind.Id]

        this.Dealer.Posicao = "D"
        this.SmallBlind.Posicao = "Small-Blind"
        this.BigBlind.Posicao = "Big-Blind"

        interfacee.exibirPosicao(this.Dealer)
    }

    resetarPosicaoPlayers() {
        for (let i = 0; i < this.Qnt_players; i++) {
            this.Player[i].Posicao = null
        }
    }

    resetarBetPlayers() {
        for (let i = 0; i < this.Qnt_players; i++) {
            this.Player[i].Bet = 0
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
        let playersOrdenados = this.ordenarVetorPlayers(primeiroAgir)
        let valorRaise
        let i = 0
        let contadorJogadas = 0

        for(let j = 0; j < this.Qnt_players; j++){
                playersOrdenados[j].Jogou = false
        }   
        
        while(!this.RodadaAcabou){
            if (playersOrdenados[i].Bot === false && playersOrdenados[i].Fold === false) {                         //Se for o Usuário
                let acao = await this.aguardarAcaoJogador()
                if (this.Rodada === 'preflop') {
                    if (playersOrdenados[i].Posicao === 'Small-Blind') {
                        switch (acao) {
                            case "fold":
                                playersOrdenados[i].Fold = true;
                                playersOrdenados[i].foldar();
                                break;
                            case "raise":
                                valorRaise = Number(userAction.ValorRaise);
                                playersOrdenados[i].raise(valorRaise, interfacee);
                                this.Pot += valorRaise - this.SmallBlindValor;
                                this.Bet = valorRaise;
                                break;
                            case "allin":
                                valorRaise = playersOrdenados[i].Stack
                                playersOrdenados[i].allin(playersOrdenados[i].Stack, interfacee);
                                this.Pot += valorRaise;
                                this.Bet = playersOrdenados[i].Bet;
                                break;
                            default:
                                playersOrdenados[i].call(this.Bet, interfacee);
                                this.Pot += this.Bet - this.SmallBlindValor
                                break;
                        }

                    } else if (playersOrdenados[i].Posicao === 'Big-Blind') {
                        switch (acao) {
                            case "fold":
                                playersOrdenados[i].Fold = true;
                                playersOrdenados[i].foldar();
                                break;
                            case "raise":
                                valorRaise = Number(userAction.ValorRaise);
                                playersOrdenados[i].raise(valorRaise, interfacee);
                                this.Pot += valorRaise - this.BigBlindValor;
                                this.Bet = valorRaise;
                                break;
                            case "allin":
                                valorRaise = playersOrdenados[i].Stack
                                playersOrdenados[i].allin(playersOrdenados[i].Stack, interfacee);
                                this.Pot += valorRaise;
                                this.Bet = playersOrdenados[i].Bet;
                                break;
                            case "check":
                                break;
                            default:
                                playersOrdenados[i].call(this.Bet, interfacee);
                                this.Pot += this.Bet - this.BigBlindValor
                                break;
                        }

                    } else {
                        switch (acao) {
                            case "fold":
                                playersOrdenados[i].Fold = true;
                                playersOrdenados[i].foldar();
                                break;
                            case "raise":
                                valorRaise = Number(userAction.ValorRaise, interfacee);
                                playersOrdenados[i].raise(valorRaise, interfacee);
                                this.Pot += valorRaise;
                                this.Bet = valorRaise;
                                break;
                            case "allin":
                                valorRaise = playersOrdenados[i].Stack
                                playersOrdenados[i].allin(playersOrdenados[i].Stack, interfacee);
                                this.Pot += valorRaise;
                                this.Bet = playersOrdenados[i].Bet;
                                break;
                            default:
                                playersOrdenados[i].call(this.Bet, interfacee);
                                this.Pot += this.Bet;
                                break;
                        }
                    }

                } else { // pós-flop
                    switch (acao) {
                        case "fold":
                            playersOrdenados[i].Fold = true;
                            playersOrdenados[i].foldar();
                            break;
                        case "raise":
                            valorRaise = Number(userAction.ValorRaise, interfacee);
                            playersOrdenados[i].raise(valorRaise, interfacee);
                            this.Pot += valorRaise;
                            this.Bet = valorRaise;
                            break;
                        case "check":
                            playersOrdenados[i].check(interfacee);
                            break;
                        case "allin":
                            playersOrdenados[i].allin(playersOrdenados[i].Stack);
                            this.Bet = playersOrdenados[i].Stack;
                            break;
                        default:
                            playersOrdenados[i].call(this.Bet, interfacee);
                            this.Pot += this.Bet;
                            break;
                    }   
                }

                interfacee.atualizarPlayerStackHub(playersOrdenados[i], playersOrdenados[i].Stack);
                playersOrdenados[i].Jogou = true;


            } else if (!playersOrdenados[i].Fold) {                                                         //Se for o Bot
                await this.esperarUmSegundo()
                if (playersOrdenados[i].Posicao === "Small-Blind") {
                    if (this.Rodada === 'preflop') {
                        this.Bet = playersOrdenados[i].tomarDecisao(this.Bet, this.Rodada, interfacee)
                        if (!playersOrdenados[i].Fold) {
                            this.Pot += this.Bet - this.SmallBlindValor
                        }
                    } else {
                        this.Bet = playersOrdenados[i].tomarDecisao(this.Bet, this.Rodada, interfacee, this.Pot)
                        if (!playersOrdenados[i].Fold) {
                            this.Pot += this.Bet
                        }
                    }
                } else if (playersOrdenados[i].Posicao === "Big-Blind") {
                    if (this.Rodada === 'preflop') {
                        this.Bet = playersOrdenados[i].tomarDecisao(this.Bet, this.Rodada, interfacee)

                        if (!playersOrdenados[i].Fold) {
                            this.Pot += this.Bet - this.BigBlindValor
                        }
                    } else {
                        this.Bet = playersOrdenados[i].tomarDecisao(this.Bet, this.Rodada, interfacee, this.Pot)
                        if (!playersOrdenados[i].Fold) {
                            this.Pot += this.Bet
                        }
                    }
                } else {
                    this.Bet = playersOrdenados[i].tomarDecisao(this.Bet, this.Rodada, interfacee, this.Pot)
                    if (!playersOrdenados[i].Fold) {
                        this.Pot += this.Bet
                    }
                }

            }

            if(playersOrdenados[i].Acao === "raise"){
                for(let j = 0 ; j < this.Qnt_players ; j++){
                    playersOrdenados[j].Jogou = false
                }
            }
            
            playersOrdenados[i].Jogou = true

            if (!playersOrdenados[i].Fold) {
                //interfacee.exibirPlayerStack(playersOrdenados[i].Id, this.Bet)
                interfacee.atualizarPlayerStackHub(playersOrdenados[i], playersOrdenados[i].Stack)
            } else {
                interfacee.atualizarPlayerStackHub(playersOrdenados[i], playersOrdenados[i].Stack)
            }

            console.log(this.Pot)
            interfacee.atualizarPot(this.Pot)

            await this.esperarUmSegundo()
            
            if(playersOrdenados[(i+1) % this.Qnt_players].Jogou === true){
                break
            }

            i++
            if(i === 8){
                i=0
            }
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

    apostasObrigatorias() {
        this.SmallBlind.callSmall(this.SmallBlindValor, interfacee)
        this.BigBlind.call(this.BigBlindValor, interfacee)

        this.Pot = this.SmallBlindValor + this.BigBlindValor
        console.log(this.Pot)
        interfacee.atualizarPot(this.Pot)

        interfacee.atualizarPlayerStackHub(this.SmallBlind, this.SmallBlind.Stack)
        interfacee.atualizarPlayerStackHub(this.BigBlind, this.BigBlind.Stack)
    }

    showDown() {
        for (let i = 1; i < this.Player.length; i++) {
            if(!this.Player[i].Fold){
                interfacee.exibirCartaPlayerBot(this.Player[i].Id, this.Player[i].Mao[0], this.Player[i].Mao[1])
            }
        }
    }

    async proximaRodada() {
        console.log(this.Baralho.Cartas, this.Player, this.Pot)
        console.log("Próxima rodada!")
        for (const player of this.Player) {
            player.resetMao()
            player.resetPlayerFold()
        }

        this.Baralho.resetBaralho()
        this.Baralho.embaralhar(this.Baralho.Cartas)
        interfacee.resetInterface(this.Dealer.Id, this.SmallBlind, this.BigBlind)
        this.atualizarPosicoesPlayers()
        this.definirValoresBlinds()
        this.Pot = 0

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
            userAction.BotaoFold.addEventListener('click', handleButtonClick);
            userAction.BotaoCall.addEventListener('click', handleButtonClick);
            userAction.BotaoRaise.addEventListener('click', handleButtonClick);
            userAction.BotaoCheck.addEventListener('click', handleButtonClick);
            userAction.BotaoAllin.addEventListener('click', handleButtonClick);

            // Habilita os botões para a ação do jogador
            this.habilitarBotoes();
        });
    }

    habilitarBotoes() {
        userAction.BotaoFold.disabled = false;
        userAction.BotaoCall.disabled = false;
        userAction.BotaoRaise.disabled = false;
        userAction.BotaoCheck.disabled = false;
        userAction.BotaoAllin.disabled = false;
    }

    desabilitarBotoes() {
        userAction.BotaoFold.disabled = true;
        userAction.BotaoCall.disabled = true;
        userAction.BotaoRaise.disabled = true;
        userAction.BotaoCheck.disabled = true;
        userAction.BotaoAllin.disabled = true;
    }

    async jogar() {
        let botaoClicado

        this.Baralho.embaralhar(this.Baralho.Cartas)
        this.entregarCartasPlayer()
        interfacee.exibirCartaPlayer(this.Player[0].Mao[0], this.Player[0].Mao[1])
        interfacee.exibirPot(this.Pot)
        this.definirValoresBlinds()
        this.Bet = this.BigBlindValor

        //apostas obrigatorias

        this.apostasObrigatorias()

        //PRÉ FLOP
        this.Rodada = 'preflop'
        await this.controlarRodadaPreFlop()
        interfacee.removerAllPlayerStack()
        interfacee.removerAllPlayerCheck()

        //FLOP

        this.resetarBetPlayers()
        this.Bet = 0
        await this.controlarRodadaFlop()
        interfacee.removerAllPlayerStack()
        interfacee.removerAllPlayerCheck()

        //TURN

        this.resetarBetPlayers()
        this.Bet = 0
        await this.controlarRodadaTurn()
        interfacee.removerAllPlayerStack()
        interfacee.removerAllPlayerCheck()

        //RIVER

        this.resetarBetPlayers()
        this.Bet = 0
        await this.controlarRodadaRiver()
        interfacee.removerAllPlayerStack()
        interfacee.removerAllPlayerCheck()

        this.showDown()

        botaoClicado = await this.aguardarAcaoJogador()
        this.habilitarBotoes()

        this.proximaRodada()
    }
}