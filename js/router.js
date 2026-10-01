// ROUTER: navegação (SPA) e eventos da tela

var conteudo = document.getElementById("conteudo");
var paginaAtual = "inicio";

// Liga o nome da rota à função que gera a página
var rotas = {
    inicio: paginaInicio,
    cortinas: paginaCortinas,
    carrinho: paginaCarrinho,
    contato: paginaContato
};

function renderizar(pagina) {
    if (!rotas[pagina]) {
        pagina = "inicio";
        history.replaceState({ pagina: pagina }, "", "#inicio"); // arruma a URL
    }
    paginaAtual = pagina;
    conteudo.innerHTML = rotas[pagina]();
    atualizarMenu();
}

function navegar(pagina) {
    history.pushState({ pagina: pagina }, "", "#" + pagina);
    renderizar(pagina);
}

function atualizarMenu() {
    var links = document.querySelectorAll("#menu a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].dataset.pagina === paginaAtual) {
            links[i].classList.add("ativo");
        } else {
            links[i].classList.remove("ativo");
        }
    }
    document.getElementById("contador").textContent = contarItens();
}

// 1) Cliques nos links de navegação
document.addEventListener("click", function (evento) {
    var link = evento.target.closest("[data-pagina]");
    if (link) {
        evento.preventDefault();
        navegar(link.dataset.pagina);
    }
});

// 2) Botões voltar/avançar do navegador
window.addEventListener("popstate", function () {
    renderizar(location.hash.replace("#", "") || "inicio");
});

// 3) Cliques dentro do conteúdo (event delegation)
conteudo.addEventListener("click", function (evento) {
    var alvo = evento.target;
    var card = alvo.closest(".produto");

    if (alvo.classList.contains("mais")) {
        var campo = card.querySelector(".qtd");
        campo.value = limparQuantidade(campo.value) + 1;
    }

    if (alvo.classList.contains("menos")) {
        var campo2 = card.querySelector(".qtd");
        campo2.value = Math.max(1, limparQuantidade(campo2.value) - 1);
    }

    if (alvo.classList.contains("adicionar")) {
        var campoQtd = card.querySelector(".qtd");
        adicionarNoCarrinho(Number(card.dataset.id), campoQtd.value);
        campoQtd.value = 1;
        atualizarMenu();
    }

    if (alvo.classList.contains("remover")) {
        removerDoCarrinho(Number(alvo.dataset.posicao));
        renderizar("carrinho");
    }

    if (alvo.classList.contains("limpar")) {
        limparCarrinho();
        renderizar("carrinho");
    }
});

// 4) Validação em tempo real enquanto digita
conteudo.addEventListener("input", function (evento) {
    if (evento.target.closest("#form-contato")) {
        validarCampo(evento.target);
    }
});

// 5) Envio do formulário
conteudo.addEventListener("submit", function (evento) {
    evento.preventDefault(); // não recarrega a página
    var formulario = evento.target;

    if (validarFormulario(formulario)) {
        conteudo.innerHTML = "<h2>Fale conosco</h2><p class='sucesso'>Mensagem enviada com sucesso!</p>";
    }
});

// Primeira tela ao abrir o site
renderizar(location.hash.replace("#", "") || "inicio");
