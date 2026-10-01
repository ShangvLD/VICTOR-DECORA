// CARRINHO DE COMPRAS LOCAL: lógica das compras (não mexe na tela)

var carrinho = carregarCarrinho(); // recupera o que estava salvo

// Garante que a quantidade é um número inteiro maior ou igual a 1
function limparQuantidade(valor) {
    var numero = Math.floor(Number(valor));
    if (isNaN(numero) || numero < 1) {
        return 1;
    }
    return numero;
}

function adicionarNoCarrinho(id, quantidade) {
    quantidade = limparQuantidade(quantidade);

    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id === id) {
            carrinho[i].quantidade += quantidade;
            salvarCarrinho();
            return;
        }
    }
    for (var j = 0; j < produtos.length; j++) {
        if (produtos[j].id === id) {
            carrinho.push({ id: id, nome: produtos[j].nome, preco: produtos[j].preco, quantidade: quantidade });
        }
    }
    salvarCarrinho();
}

function removerDoCarrinho(posicao) {
    carrinho.splice(posicao, 1);
    salvarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
}

function calcularTotal() {
    var total = 0;
    for (var i = 0; i < carrinho.length; i++) {
        total += carrinho[i].preco * carrinho[i].quantidade;
    }
    return total;
}

function contarItens() {
    var soma = 0;
    for (var i = 0; i < carrinho.length; i++) {
        soma += carrinho[i].quantidade;
    }
    return soma;
}
