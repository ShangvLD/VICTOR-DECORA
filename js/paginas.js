// PÁGINAS: cada função devolve o HTML de uma tela

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

    if (carrinho.length === 0) {
        html += "<p>Seu carrinho está vazio.</p>";
    } else {
        html += "<ul>";
        for (var i = 0; i < carrinho.length; i++) {
            var item = carrinho[i];
            html += "<li>" + item.quantidade + "x " + item.nome + " - " + formatarPreco(item.preco * item.quantidade) +
                    " <button class='remover' data-posicao='" + i + "'>Remover</button></li>";
        }
        html += "</ul>";
    }

    html += "<p class='total'>Total: " + formatarPreco(calcularTotal()) + "</p>";
    html += "<button class='limpar'>Limpar carrinho</button></section>";
    return html;
}

function paginaContato() {
    return "<h2>Fale conosco</h2>" +
           "<form id='form-contato' novalidate>" +
               "<label for='nome'>Nome</label>" +
               "<input type='text' id='nome'><span class='mensagem'></span>" +
               "<label for='email'>E-mail</label>" +
               "<input type='text' id='email'><span class='mensagem'></span>" +
               "<label for='telefone'>Telefone</label>" +
               "<input type='text' id='telefone'><span class='mensagem'></span>" +
               "<button type='submit'>Enviar</button>" +
           "</form>";
}
