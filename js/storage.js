// STORAGE: só este arquivo mexe no localStorage

function salvarCarrinho() {
    try {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    } catch (erro) {
        console.log("Não foi possível salvar o carrinho", erro);
    }
}

function carregarCarrinho() {
    try {
        return JSON.parse(localStorage.getItem("carrinho")) || [];
    } catch (erro) {
        return [];
    }
}
