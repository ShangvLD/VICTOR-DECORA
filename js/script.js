// ===== DADOS =====
var produtos = [
    { id: 1, nome: "Cortina Blackout Cinza", descricao: "2,80m x 2,30m. Bloqueia a luz do sol.", preco: 129.90, imagem: "../imagens/cortina1.jpg" },
    { id: 2, nome: "Cortina Voil Branca", descricao: "3,00m x 2,50m. Leve e transparente.", preco: 89.90, imagem: "../imagens/cortina2.jpg" },
    { id: 3, nome: "Cortina Linho Bege", descricao: "2,60m x 2,30m. Tecido de linho.", preco: 159.90, imagem: "../imagens/cortina3.jpg" }
];

var carrinho = [];
var paginaAtual = "inicio";
var conteudo = document.getElementById("conteudo");

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

// ===== PÁGINAS =====
// Cada função devolve o HTML da página (texto)

function paginaInicio() {
    return "<h2>Bem-vindo!</h2>" +
           "<p>A Victor Decorações vende cortinas para todos os ambientes da sua casa.</p>" +
           "<p><a href='#cortinas' data-pagina='cortinas'>Ver cortinas</a></p>";
}

function paginaCortinas() {
    var html = "<h2>Nossas cortinas</h2><section class='produtos'>";

    for (var i = 0; i < produtos.length; i++) {
        var p = produtos[i];
        html += "<div class='produto' data-id='" + p.id + "'>" +
                    "<img src='" + p.imagem + "' alt='" + p.nome + "'>" +
                    "<h3>" + p.nome + "</h3>" +
                    "<p class='descricao'>" + p.descricao + "</p>" +
                    "<p class='preco'>" + formatarPreco(p.preco) + "</p>" +
                    "<div class='quantidade'>" +
                        "<button class='menos'>-</button>" +
                        "<input type='number' class='qtd' value='1' min='1'>" +
                        "<button class='mais'>+</button>" +
                    "</div>" +
                    "<button class='adicionar'>Adicionar ao carrinho</button>" +
                "</div>";
    }

    html += "</section>";
    return html;
}

function paginaCarrinho() {
    var html = "<section class='carrinho'><h2>Seu carrinho</h2>";
    var total = 0;

    if (carrinho.length === 0) {
        html += "<p>Seu carrinho está vazio.</p>";
    } else {
        html += "<ul>";
        for (var i = 0; i < carrinho.length; i++) {
            var item = carrinho[i];
            var subtotal = item.preco * item.quantidade;
            total += subtotal;
            html += "<li>" + item.quantidade + "x " + item.nome + " - " + formatarPreco(subtotal) +
                    " <button class='remover' data-posicao='" + i + "'>Remover</button></li>";
        }
        html += "</ul>";
    }

    html += "<p class='total'>Total: " + formatarPreco(total) + "</p>";
    html += "<button class='limpar'>Limpar carrinho</button></section>";
    return html;
}

// ===== ROTEAMENTO =====
// Tabela que liga o nome da rota à função que gera a página
var rotas = {
    inicio: paginaInicio,
    cortinas: paginaCortinas,
    carrinho: paginaCarrinho
};

// Coloca o conteúdo da rota na div principal
function renderizar(pagina) {
    if (!rotas[pagina]) {
        pagina = "inicio"; // rota que não existe volta para o início
    }
    paginaAtual = pagina;
    conteudo.innerHTML = rotas[pagina]();
    atualizarMenu();
}

// Muda a URL (sem recarregar) e mostra a página
function navegar(pagina) {
    history.pushState({ pagina: pagina }, "", "#" + pagina);
    renderizar(pagina);
}

// 1) Intercepta os cliques nos links com data-pagina
document.addEventListener("click", function (evento) {
    var link = evento.target.closest("[data-pagina]");
    if (link) {
        evento.preventDefault(); // impede o navegador de recarregar
        navegar(link.dataset.pagina);
    }
});

// 2) Botões voltar/avançar do navegador
window.addEventListener("popstate", function () {
    renderizar(location.hash.replace("#", "") || "inicio");
});

// 3) Primeira tela ao abrir o site (respeita a URL, ex: index.html#carrinho)
renderizar(location.hash.replace("#", "") || "inicio");

function atualizarMenu() {
    var links = document.querySelectorAll("#menu a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].dataset.pagina === paginaAtual) {
            links[i].classList.add("ativo");
        } else {
            links[i].classList.remove("ativo");
        }
    }

    var quantidadeTotal = 0;
    for (var j = 0; j < carrinho.length; j++) {
        quantidadeTotal += carrinho[j].quantidade;
    }
    document.getElementById("contador").textContent = quantidadeTotal;
}

// ===== INTERAÇÃO DENTRO DO CONTEÚDO =====
// Como o conteúdo é trocado toda hora, escutamos os cliques na div principal
// (delegação de eventos) em vez de ligar botão por botão.
conteudo.addEventListener("click", function (evento) {
    var alvo = evento.target;
    var card = alvo.closest(".produto");

    if (alvo.classList.contains("mais")) {
        var campo = card.querySelector(".qtd");
        campo.value = Number(campo.value) + 1;
    }

    if (alvo.classList.contains("menos")) {
        var campo2 = card.querySelector(".qtd");
        if (Number(campo2.value) > 1) {
            campo2.value = Number(campo2.value) - 1;
        }
    }

    if (alvo.classList.contains("adicionar")) {
        var quantidade = Number(card.querySelector(".qtd").value);
        if (quantidade < 1 || isNaN(quantidade)) {
            quantidade = 1;
        }
        adicionarNoCarrinho(Number(card.dataset.id), quantidade);
        card.querySelector(".qtd").value = 1;
        atualizarMenu();
    }

    if (alvo.classList.contains("remover")) {
        carrinho.splice(Number(alvo.dataset.posicao), 1);
        renderizar("carrinho");
    }

    if (alvo.classList.contains("limpar")) {
        carrinho = [];
        renderizar("carrinho");
    }
});

function adicionarNoCarrinho(id, quantidade) {
    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id === id) {
            carrinho[i].quantidade += quantidade;
            return;
        }
    }
    for (var j = 0; j < produtos.length; j++) {
        if (produtos[j].id === id) {
            carrinho.push({ id: id, nome: produtos[j].nome, preco: produtos[j].preco, quantidade: quantidade });
        }
    }
}
