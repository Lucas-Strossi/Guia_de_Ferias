const API_BASE = "../backend/api";
function exibirDestinos(destinos) {
const lista =
document.getElementById("lista-destinos");
lista.innerHTML = "";
destinos.forEach(function (destino) {
// Cria um card para cada destino
const card =
document.createElement("article");
card.classList.add("destino-card");
card.innerHTML = `
<h3>${destino.nome}</h3>
<p>
<strong>Tipo:</strong>
${destino.tipo}
</p>
<button type="button">
Ver detalhes
</button>
`;
// Captura o clique do botão deste card
const botao =
card.querySelector("button");
botao.addEventListener("click", function () {
carregarDestino(destino.id);
});
lista.appendChild(card);
});
}
async function carregarDestinos() {
try {
// Consulta todos os destinos
const response = await fetch(
`${API_BASE}/destinos.php`
);
const destinos = await response.json();
if (!response.ok) {
console.log("Erro ao carregar destinos");
return;
}
// Apresenta os dados recebidos
exibirDestinos(destinos);
} catch (erro) {
const lista =
document.getElementById("lista-destinos");
lista.innerHTML = `
<p>Não foi possível acessar a API.</p>
`;
}
}async function carregarDestino(id) {
const detalhes =
document.getElementById("detalhes-destino");
detalhes.innerHTML =
"<p>Carregando detalhes...</p>";
try {
// Consulta apenas o destino selecionado
const response = await fetch(
`${API_BASE}/destinos.php?id=${id}`
);
const destino = await response.json();
if (!response.ok) {
detalhes.innerHTML = `
<p>${destino.erro}</p>
`;
return;
}
// Atualiza a área de detalhes
detalhes.innerHTML = `
<h3>${destino.nome}</h3>
<p>
<strong>Tipo:</strong>
${destino.tipo}
</p>
<p>
${destino.descricao}
</p>
`;
} catch (erro) {
detalhes.innerHTML = `
<p>
Não foi possível carregar os detalhes.
</p>
`;
}
}
// Carrega a lista ao abrir a página
carregarDestinos();