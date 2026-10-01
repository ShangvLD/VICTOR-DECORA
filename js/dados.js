// DADOS: lista de produtos e formatação de preço
var produtos = [
    { id: 1, nome: "Cortina Blackout Cinza", descricao: "2,80m x 2,30m. Bloqueia a luz do sol.", preco: 129.90, imagem: "../imagens/cortina1.jpg" },
    { id: 2, nome: "Cortina Voil Branca", descricao: "3,00m x 2,50m. Leve e transparente.", preco: 89.90, imagem: "../imagens/cortina2.jpg" },
    { id: 3, nome: "Cortina Linho Bege", descricao: "2,60m x 2,30m. Tecido de linho.", preco: 159.90, imagem: "../imagens/cortina3.jpg" }
];

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}
