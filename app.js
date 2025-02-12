// Variáveis globais
let listaDeNumerosSorteados = []; // Array para armazenar os números já sorteados
let numeroLimite = 10; // Limite máximo para o número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Número secreto a ser adivinhado
let tentativas = 1; // Contador de tentativas

// Função para exibir texto em elementos HTML
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento pela tag
    campo.innerHTML = texto; // Define o texto do elemento
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Função para voz (depende de uma biblioteca externa)
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto'); // Título do jogo
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Instrução para o jogador
}

// Chama a função para exibir a mensagem inicial
exibirMensagemInicial();

// Função principal do jogo, verifica o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor do input

    // Verifica se o chute é igual ao número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!!!'); // Exibe mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Define a palavra "tentativa" ou "tentativas"
        let mensagemTentativas = `Você acertou o Numero secreto com ${tentativas} ${palavraTentativa}!`; // Monta a mensagem com o número de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão "Reiniciar"
    } else {
        // Se o chute for diferente, dá uma dica
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor'); // Dica: número menor
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior'); // Dica: número maior
        }
        tentativas++; // Incrementa o número de tentativas
        limparCampo(); // Limpa o campo de input
    }
}

// Função para gerar um número aleatório entre 1 e o limite
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Verifica quantos números já foram sorteados

    // Se todos os números já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []; // Limpa a lista
    }

    // Verifica se o número já foi sorteado
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Se já foi sorteado, gera outro número
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados
        console.log(listaDeNumerosSorteados); // Exibe a lista no console (para debug)
        return numeroEscolhido; // Retorna o número gerado
    }
}

// Função para limpar o campo de input
function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o input
    chute.value = ''; // Limpa o valor
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio (); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de input
    tentativas = 1; // Reseta o número de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão "Reiniciar"
}