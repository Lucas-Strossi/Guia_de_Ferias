const API_BASE = "../backend/api";

function exibirDestinos(destinos) {
const lista =
document.getElementById("lista-destinos");
// Remove a mensagem "Carregando destinos..."
lista.innerHTML = "";
destinos.forEach(function (destino) {
// Cria um card para o destino atual
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
// Localiza o botão criado dentro do card
const botao =
card.querySelector("button");

// Ao clicar, consulta o destino selecionado
botao.addEventListener("click", function () {
carregarDestino(destino.id);
});
lista.appendChild(card);
});
}


async function carregarDestinos() {
try {
// Envia uma requisição GET para a API
const response = await fetch(
`${API_BASE}/destinos.php`
);
// Converte o JSON recebido para JavaScript
const destinos = await response.json();
if (!response.ok) {
console.log("Erro ao carregar destinos");
return;
}
// Neste primeiro teste, mostramos os dados no Console
exibirDestinos(destinos);;
} catch (erro) {
console.log(
"Não foi possível acessar a API",
erro
);
}
}
// Executa a consulta ao abrir a página



carregarDestinos();
