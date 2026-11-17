const API_BASE = "../../backend/api"; // Verifique se não precisa tirar a primeira barra: "backend/api"

function exibirDestinos(destinos) {
  const lista = document.getElementById("lista-destinos");
  lista.innerHTML = "";

  if (!Array.isArray(destinos) || destinos.length === 0) {
    lista.innerHTML = "<p>Nenhum destino encontrado.</p>";
    return;
  }

  destinos.forEach(function (destino) {
    const card = document.createElement("article");
    card.classList.add("destino-card");
    card.innerHTML = `
      <h3>${destino.nome}</h3>
      <p><strong>Tipo:</strong> ${destino.tipo}</p>
      <button type="button">Ver detalhes</button>
    `;

    const botao = card.querySelector("button");
    botao.addEventListener("click", function () {
      carregarDestino(destino.id);
    });

    lista.appendChild(card);
  });
}

async function carregarDestinos() {
  const lista = document.getElementById("lista-destinos");
  
  try {
    const response = await fetch(`${API_BASE}/destinos.php`);

    if (!response.ok) {
      lista.innerHTML = `<p>Erro ao carregar destinos (Status: ${response.status}).</p>`;
      return;
    }

    const destinos = await response.json();
    exibirDestinos(destinos);
  } catch (erro) {
    console.error("Falha na requisição:", erro);
    lista.innerHTML = `<p>Não foi possível acessar a API.</p>`;
  }
}

async function carregarDestino(id) {
  const detalhes = document.getElementById("detalhes-destino");
  detalhes.innerHTML = "<p>Carregando detalhes...</p>";

  try {
    const response = await fetch(`${API_BASE}/destinos.php?id=${id}`);
    const destino = await response.json();

    if (!response.ok) {
      detalhes.innerHTML = `<p>${destino.erro || "Erro ao buscar detalhes."}</p>`;
      return;
    }

    detalhes.innerHTML = `
      <h3>${destino.nome}</h3>
      <p><strong>Tipo:</strong> ${destino.tipo}</p>
      <p>${destino.descricao || "Sem descrição disponível."}</p>
    `;
  } catch (erro) {
    console.error("Falha nos detalhes:", erro);
    detalhes.innerHTML = `<p>Não foi possível carregar os detalhes.</p>`;
  }
}

// Garante que o HTML já existe antes de rodar
document.addEventListener("DOMContentLoaded", carregarDestinos);
