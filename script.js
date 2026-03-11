const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');
const wordCountElement = document.getElementById('word-count');
const charCountElement = document.getElementById('char-count');
const readingTimeElement = document.getElementById('reading-time');
const readabilityElement = document.getElementById('readability');
const mostFrequentElement = document.getElementById('most-frequent');
const wordCloudContainer = document.getElementById('word-cloud-container');


function contarPalavras(texto) {

    texto = texto.trim();
    
    if (texto === '') return 0;
    
    const palavras = texto.split(/\s+/).filter(palavra => palavra.length > 0);
    
    return palavras.length;
}


function contarCaracteres(texto) {
    
    return texto.length;
}


function palavraMaisFrequente(texto) {

    texto = texto.toLowerCase().replace(/[.,!?;:()"'-]/g, '');
    
    const palavras = texto.split(/\s+/).filter(palavra => palavra.length > 0);
    
    if (palavras.length === 0) return '';
    
    const frequencias = {};
    
    for (const palavra of palavras) {
        if (frequencias[palavra]) {
            frequencias[palavra]++;
        } else {
            frequencias[palavra] = 1;
        }
    }
    
    let palavraMaisFrequente = '';
    let maiorFrequencia = 0;
    
    for (const palavra in frequencias) {
        if (frequencias[palavra] > maiorFrequencia) {
            maiorFrequencia = frequencias[palavra];
            palavraMaisFrequente = palavra;
        }
    }
    
    return palavraMaisFrequente;
}

function tempoLeitura(texto) {
 
    const palavrasPorMinuto = 200;
    
    const numPalavras = contarPalavras(texto);
    
    const minutos = Math.ceil(numPalavras / palavrasPorMinuto);
    
    return minutos;
}

function calcularLegibilidade(texto) {

    const palavras = texto.split(/\s+/).filter(palavra => palavra.length > 0);

    if (palavras.length === 0) return "Indeterminado";
    
    let totalCaracteres = 0;
    
    for (const palavra of palavras) {
        totalCaracteres += palavra.length;
    }
    
    const comprimentoMedio = totalCaracteres / palavras.length;
    
    if (comprimentoMedio <= 4) {
        return "Fácil";
    } else if (comprimentoMedio <= 7) {
        return "Médio";
    } else {
        return "Difícil";
    }
}

function gerarNuvemPalavras(texto) {

    texto = texto.toLowerCase().replace(/[.,!?;:()"'-]/g, '');
    
    const palavras = texto.split(/\s+/).filter(palavra => palavra.length > 1); // Filtramos palavras com mais de 1 caractere
    
    const frequencias = {};
    
    for (const palavra of palavras) {
        if (frequencias[palavra]) {
            frequencias[palavra]++;
        } else {
            frequencias[palavra] = 1;
        }
    }

    const palavrasOrdenadas = Object.entries(frequencias)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); 
    
    let html = '';
    
    for (const [palavra, frequencia] of palavrasOrdenadas) {

        const tamanhoFonte = 14 + (frequencia * 4);

        const hue = 200 + frequencia * 10;
        html += `<span class="word-item" style="font-size: ${tamanhoFonte}px; background-color: hsl(${hue}, 70%, 50%)">${palavra} (${frequencia})</span>`;
    }
    
    return html;
}

function analisarTexto() {
    const texto = textInput.value;

    const numPalavras = contarPalavras(texto);
    const numCaracteres = contarCaracteres(texto);
    const palavraFrequente = palavraMaisFrequente(texto);
    const tempo = tempoLeitura(texto);
    const legibilidade = calcularLegibilidade(texto);
    const nuvemPalavras = gerarNuvemPalavras(texto);
    
    wordCountElement.textContent = numPalavras;
    charCountElement.textContent = numCaracteres;
    mostFrequentElement.textContent = palavraFrequente || "Nenhuma";
    readingTimeElement.textContent = `${tempo} min`;
    readabilityElement.textContent = legibilidade;
    wordCloudContainer.innerHTML = nuvemPalavras || "<p>Não há palavras suficientes para gerar a nuvem.</p>";
}

function limparTudo() {
    textInput.value = '';
    wordCountElement.textContent = '0';
    charCountElement.textContent = '0';
    mostFrequentElement.textContent = 'Nenhuma';
    readingTimeElement.textContent = '0 min';
    readabilityElement.textContent = '-';
    wordCloudContainer.innerHTML = '';
}

analyzeBtn.addEventListener('click', analisarTexto);
clearBtn.addEventListener('click', limparTudo);

window.addEventListener('DOMContentLoaded', analisarTexto);

textInput.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        analisarTexto();
    }
});