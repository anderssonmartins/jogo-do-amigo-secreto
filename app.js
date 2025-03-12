// Parte 1: Declarar variável array
let amigos = [];

// Parte 2: Função para adicionar amigos
function adicionarAmigo() {
    // Capturar o valor do campo de entrada
    let nomeInput = document.getElementById("amigo").value.trim();

    // Validar a entrada
    if (nomeInput === "") {
        alert("O campo não pode ficar vazio!");
        return;
    }

    // Atualizar o array de amigos
    amigos.push(nomeInput);

    // Limpar o campo de entrada
    document.getElementById("amigo").value = "";

    // Atualizar a lista de amigos
    atualizarLista();

    // Habilitar o botão de sortear se houver número par de amigos
    if (amigos.length >= 2 && amigos.length % 2 === 0) {
        document.getElementById("sortearBtn").disabled = false;
    }
}

// Parte 3: Função para atualizar a lista de amigos
function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpar a lista existente

    // Percorrer o array e adicionar elementos <li>
    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement("li");
        li.textContent = amigos[i];
        lista.appendChild(li);
    }
}

// Parte 4: Função para sortear os amigos
function sortearAmigo() {
    // Validar que há amigos disponíveis
    if (amigos.length === 0) {
        document.getElementById("resultado").innerHTML = "Nenhum amigo para sortear!";
        return;
    }

    // Verificar se o número de participantes é par
    if (amigos.length % 2 !== 0) {
        document.getElementById("resultado").innerHTML = "O número de participantes deve ser par!";
        return;
    }

    // Criar uma cópia embaralhada da lista de amigos
    let amigosEmbaralhados = [...amigos];
    for (let i = amigosEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosEmbaralhados[i], amigosEmbaralhados[j]] = [amigosEmbaralhados[j], amigosEmbaralhados[i]];
    }

    // Criar emparelhamento cíclico (cada pessoa tira o próximo, último tira o primeiro)
    let resultado = "";
    for (let i = 0; i < amigos.length; i++) {
        let amigoSorteado = amigosEmbaralhados[(i + 1) % amigos.length]; // Próximo da lista embaralhada
        if (amigoSorteado === amigos[i]) {
            // Se tirar a si mesmo, troca com o próximo (se houver)
            amigoSorteado = amigosEmbaralhados[(i + 2) % amigos.length];
        }
        resultado += `${amigos[i]} tirou ${amigoSorteado}<br>`;
    }

    // Exibir o resultado
    document.getElementById("resultado").innerHTML = resultado;
}

// Adicionar event listener para a tecla "Enter"
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão (como enviar um formulário, se houver)
        adicionarAmigo(); // Chama a função para adicionar o amigo
    }
});