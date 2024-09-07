// Função para carregar o conteúdo dinamicamente em uma área específica da página
function carregarConteudo(dados) {
    
    // Obtém a referência ao elemento HTML onde o conteúdo será inserido
    let conteudoArea = document.getElementById('area-conteudo');

    // Cria uma string de HTML com base nos dados fornecidos
    // A crase (`) permite a interpolação de strings
    conteudoArea.innerHTML = `
        <h2>${dados.Titulo}</h2>
        <p>${dados.Descricao}</p>
        <a href="${dados.Link}" target="_blank">Saiba mais</a>
    `;
}

// Adiciona um ouvinte de evento ao botão 'MPOX-descricao'
// Ao clicar, carrega o conteúdo da descrição do MPOX
document.getElementById('MPOX-descricao').addEventListener('click', function() {
    carregarConteudo(DescricaoMPOX);
});

// Adiciona um ouvinte de evento ao botão 'MPOX-sintomas'
// Ao clicar, carrega o conteúdo dos sintomas do MPOX
document.getElementById('MPOX-sintomas').addEventListener('click', function() {
    carregarConteudo(SintomasMPOX);
});

// Adiciona um ouvinte de evento ao botão 'MPOX-protocolo'
// Ao clicar, carrega o conteúdo do protocolo do MPOX
document.getElementById('MPox-protocolo').addEventListener('click', function() {
    carregarConteudo(ProtocoloMPOX);
});

// Adiciona um ouvinte de evento ao botão 'MPOX-cuidados'
// Ao clicar, carrega o conteúdo dos cuidados do MPOX
document.getElementById('MPox-Cuidados').addEventListener('click', function() {
    carregarConteudo(CuidadosMPOX);
});


// Adiciona um ouvinte de evento ao botão de busca
document.getElementById('botao-buscar').addEventListener('click', function() {
    // Obtém o termo de pesquisa e converte para minúsculas
    let barraPesquisa = document.querySelector('#barra-pesquisa input');
    let termoPesquisa = barraPesquisa.value.trim().toLowerCase();

    // Verifica se o termo de pesquisa está vazio
    if (termoPesquisa === '') {
        alert('Para executar uma pesquisa é necessário informar pelo menos 1 palavra.');
        return; // Interrompe a execução do código se o campo estiver vazio
    }

    // Função para remover acentuações
    function removerAcentuacao(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Filtra os dados de pesquisa, buscando correspondências em Assunto e Descrição
    let resultados = dados_pesquisa.filter(item => 
        removerAcentuacao(item.Assunto.toLowerCase()).includes(removerAcentuacao(termoPesquisa)) || 
        removerAcentuacao(item.Descrição.toLowerCase()).includes(removerAcentuacao(termoPesquisa))
    );

    // Limpa a área de conteúdo antes de exibir os resultados
    let conteudoArea = document.getElementById('area-conteudo');
    conteudoArea.innerHTML = '';

    // Exibe os resultados da pesquisa
    if (resultados.length > 0) {
        // Itera sobre os resultados e adiciona cada um à área de conteúdo
        resultados.forEach(item => {
            conteudoArea.innerHTML += `
                <h2>${item.Assunto}</h2>
                <p>${item.Descrição}</p>
                <a href="${item.Link}" target="_blank">Saiba mais</a>
                <hr>
            `;
        });
    } else {
        // Exibe uma mensagem caso não haja resultados
        conteudoArea.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
});

// Adiciona um ouvinte de evento ao botão de limpar
document.getElementById('botao-limpar').addEventListener('click', function() {
    document.querySelector('#barra-pesquisa input').value = '';
    document.getElementById('area-conteudo').innerHTML = ''; // Limpa os resultados
});