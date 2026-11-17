// Endereço base utilizado pelas requisições do frontend
const API_BASE = "http://localhost:8080/ninja/Guia_de_Ferias/backend/api";

function exibirDestinos(destinos) {
    const lista = document.getElementById("lista-destinos");
    // Remove a mensagem inicial de carregamento
    lista.innerHTML = "";
    destinos.forEach(function (destino) {
        // Cria um novo elemento para cada filme
        const card = document.createElement("article");
        card.classList.add("destino-card");
        // Insere os dados recebidos da API no card
        card.innerHTML = `
        <h3>${destino.nome}</h3>
        <p>
        <strong>Tipo:</strong>
        ${filme.tipo}
        </p>
        <p>
        <strong>Descrição:</strong>
        ${filme.descricao}
        </p>
        <button type="button">
        Ver detalhes
        </button>
        `;
        // Localiza o botão criado dentro deste card
        const botao = card.querySelector("button");
        // Executa as consultas quando o usuário seleciona o destino
        botao.addEventListener("click", function () {
            carregarDes(filme.id);
        });
        lista.appendChild(card);
    });
}


async function carregarDestinos() {
    const lista = document.getElementById("lista-destinos");
    try {
        // Solicita todos os destinos ao backend
        const response = await fetch(
            `${API_BASE}/destinos.php`
        );
        const destinos = await response.json();
        if (!response.ok) {
            lista.innerHTML =
                "<p>Erro ao carregar destinos.</p>";
            return;
        }
        // Encaminha os dados para a função de apresentação
        exibirDestinos(destinos);
    } catch (erro) {
        lista.innerHTML = "<p>Não foi possível acessar a API.</p>";
    }
}


async function carregarDestino(id) {
    const detalhes = document.getElementById("detalhes-destino");
    // Informa ao usuário que a requisição está em andamento
    detalhes.innerHTML = "<p>Carregando detalhes...</p>";
    try {
        const response = await fetch(`${API_BASE}/destinos.php?id=${id}`);
        const dados = await response.json();
        if (!response.ok) {
            detalhes.innerHTML = `<p>${dados.erro}</p>`;
            return;
        }
        // Atualiza a área de detalhes com o destino recebido
        detalhes.innerHTML = `
 <h3>${dados.nome}</h3>
 <p>
 <strong>Tipo:</strong>
 ${dados.tipo}
 </p>
 <p>
 <strong>Descrição:</strong>
 ${dados.descricao}
 </p>
 `;
    } catch (erro) {
        detalhes.innerHTML = `<p>Não foi possível carregar os detalhes do destino.
</p>`;
    }
}



carregarDestinos();
carregarDestino(1);