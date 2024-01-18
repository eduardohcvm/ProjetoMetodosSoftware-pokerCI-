import Baralho from "./Baralho.js"
import Player from "./Player.js"
import Interface from "./Interface.js"
import UserAction from "./UserAction.js"

const interfacee = new Interface()
const userAction = new UserAction()

export default class Game{
    constructor(qnt_players){
        this.player = [];
        this.baralho = new Baralho();
        this.qnt_players = qnt_players;
        this.rodada = "preflop";
        this.dealer = null;
        this.smallBlind = null;
        this.bigBlind = null;
        this.criarPlayers();
        this.definirPosiçõesIniciais();
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

    get Rodada(){
        return this.rodada 
    }

    get Dealer(){
        return this.dealer 
    }

    get SmallBlind(){
        return this.smallBlind 
    }

    get BigBlind(){
        return this.bigBlind 
    }

    set Dealer(player){
        this.dealer = player
    }

    set SmallBlind(player){
        this.smallBlind = player
    }

    set BigBlind(player){
        this.bigBlind = player
    }

    criarPlayers(){
        for(let i = 0; i <= this.Qnt_players - 1 ; i++){
            this.Player.push(new Player(i+1, 10000))
            interfacee.exibirPlayerLogo(i)
        }
    }

    definirPosiçõesIniciais(){
        if(this.Qnt_players === 8){
            this.Dealer = this.Player[Math.floor(Math.random() * (this.Qnt_players + 1))]
            //usar dealer.Id pois id vai de 1 a 8, array player de 0 a 7. Se o smallblind é o player 8 no array de players ele é 7
            this.SmallBlind = this.player[this.Dealer.Id == this.Qnt_players ? (this.Dealer.id - this.Qnt_players) : this.Dealer.id]
            this.BigBlind = this.player[this.Dealer.id + 1 >= this.Qnt_players ? ((this.Dealer.id + 1) - this.Qnt_players) : this.Dealer.id + 1]

            this.Dealer.Posicao = "D"
            this.SmallBlind.Posicao = "Small-Blind"
            this.BigBlind.Posicao = "Big-blind"

            interfacee.exibirPosicao(this.Dealer)    
        }else{
            alert("Jogos com quantidade de player != 8 ainda n foram programados")
        }
    }

    atualizarPosicoesPlayers(){
        this.Dealer = this.Player[this.Dealer.Id == 8 ? (this.Dealer.Id - this.Qnt_players) : this.Dealer.Id]
        this.SmallBlind = this.player[this.SmallBlind.Id == this.Qnt_players ? ((this.SmallBlind.Id) - this.Qnt_players) : this.SmallBlind.Id]
        this.BigBlind = this.player[this.BigBlind.Id == this.Qnt_players ? (this.BigBlind.Id - this.Qnt_players) : this.BigBlind.Id]

        this.Dealer.Posicao = "D"
        this.SmallBlind.Posicao = "Small-Blind"
        this.BigBlind.Posicao = "Big-blind"

        interfacee.exibirPosicao(this.Dealer)  
    }

    pegarPrimeiroAJogarPreFlop(){
        if(this.Qnt_players > 3){
            return this.Player[this.BigBlind.Id === this.Qnt_players ? (this.BigBlind.Id - this.Qnt_players) : this.BigBlind.Id]
        }
    }

    pegarPrimeiroAJogarPosFlop(){
        if(this.Qnt_players > 2){
            return this.SmallBlind
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

    async jogar(){
        
        console.log(this.Baralho.Cartas, this.Player)
        this.Baralho.embaralhar(this.Baralho.Cartas)
        this.entregarCartasPlayer()
        interfacee.exibirCartaPlayer(this.Player[0].Mao[0], this.Player[0].Mao[1])
    
        let botaoClicado = await this.aguardarAcaoJogador();
    
        this.colocarFlop()
        interfacee.exibirFlop(this.Baralho.Mesa[0], this.Baralho.Mesa[1], this.Baralho.Mesa[2])
        this.habilitarBotoes()
    
        botaoClicado = await this.aguardarAcaoJogador()
    
        this.colocarTurn()
        interfacee.exibirTurn(this.Baralho.Mesa[3])
        this.habilitarBotoes()
    
        botaoClicado = await this.aguardarAcaoJogador()
    
        this.colocarRiver()
        interfacee.exibirRiver(this.Baralho.Mesa[4])
            
        botaoClicado = await this.aguardarAcaoJogador()
        this.habilitarBotoes()
        
        this.showDown()

        botaoClicado = await this.aguardarAcaoJogador()
        this.habilitarBotoes()

        this.proximaRodada()
        
    }

    showDown(){
        for(let i = 1; i <this.Player.length; i++){
            interfacee.exibirCartaPlayerBot(this.Player[i].Id, this.Player[i].Mao[0], this.Player[i].Mao[1])
        }
    }

    async proximaRodada(){
        console.log("Próxima rodada!")
        for(const players of this.Player){
            players.resetMao()
        }

        this.Baralho.resetBaralho()
        this.Baralho.embaralhar(this.Baralho.Cartas)
        interfacee.resetInterface(this.Dealer.Id)
        this.atualizarPosicoesPlayers()

        //Implementar Lógica de rodar as posições dos players
        
        this.jogar()
    }


    //N entendi quase porra nenhuma dessa função, so abstrai o conceito memsmo. Méritos para o gepeto aqui.
    async aguardarAcaoJogador() {
        return new Promise((resolve) => {
          const handleButtonClick = (event) => {
            this.desabilitarBotoes();
            document.removeEventListener('click', handleButtonClick);
            resolve();
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
