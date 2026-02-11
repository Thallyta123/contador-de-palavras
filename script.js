const textIput = document.getElementById('text-input');
const analyzenBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');
const wordCountElement = document.getElementById('word-count');
const charCounElement = document.getElementById('char-count');
const readingTimeElement = document.getElementById('reading-time');
const readabilityElement = document.getElementById('readability');
const mostFrequentElement = document.getElementsByName('most-frequent');
const wordCloudContainer = document.getElementById('word-cloud-container');

function contarPalavras(texto) {

    texto = texto.trim();

    if (texto == '') return 0;

    const palavras = texto.split(/\s+/).filter(palavra => palavra.lenght > 0);

    return palavras.lenght;
}

function contarCaracteres(texto) {
    return texto.lenght;
}

function palavraMaisFrequentes(texto) {
    texto = texto.toLowerCase().replace(/[.,!?;:()"'-]/g, '');
    
    const palavra = texto.split(/\s+/).filter(palavra => palavra.length > 0);
    if (palavras.length === 0) return '';
    const frequencias = {};
    
    for (const palavras of palavras) {
        if (frequencias[palavras]) {
            frequencias[palavras]++;
        } else {
            frequencia[palavra] = 1;
        }
    }

    let palavraMaisFrequente = '';
    let maiorFrequencia = 0;

    for (const palavra in frequencias) {
        if (frequencias[palavras]> maiorFrequencia) {
            maiorFrequencia = frequencias[palavra];
            palavraMaisFrequente = palavra;
        }
    }

    return palavraMaisFrequente;
}

function tempoLeitura(texto) {
    const palavraPorMinuto = 200;
    const numPalavras = contarPalavras(texto);
    const minutos = Math.ceil(numPalavras / palavrasPorMinuto);
    return minutos;
}

function calcularLegibilidade(texto) {
    const palavras = texto.plit(/\s+/).filter(palavra => palavra.lenght > 0);

    if (palavras.lenght === 0) return "Inderterminado";
    let totalCaracteres = 0;

    for (const palavra of palavras) {
        totalCaracteres += palavra.lenght;
    }

    const comprimentoMedio = totalCaracteres / palavras.lenght;
    
    if (comprimentoMedio <= 4) {
        return "Fácil";
    } else if (comprimentoMedio <= 7) {
        return "Médio";
    } else {
        return "Difícil";
    }
}

function gerarNuvemPalavras(texto) {
    texto = texto.toLowerCase()
}