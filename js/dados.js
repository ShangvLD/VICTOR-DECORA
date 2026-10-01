// DADOS: lista de produtos e formatação de preço
var produtos = [
    { id: 1, nome: "Cortina Branca", descricao: "2,80m x 2,30m. Leve e clara.", preco: 89.90, imagem: "../imagens/cortina1.png" },
    { id: 2, nome: "Cortina Vermelha", descricao: "2,80m x 2,30m. Bloqueia a luz.", preco: 129.90, imagem: "../imagens/cortina2.png" },
    { id: 3, nome: "Cortina Rosa", descricao: "2,60m x 2,30m. Tecido leve.", preco: 99.90, imagem: "../imagens/cortina3.png" },
    { id: 4, nome: "Cortina Preta", descricao: "2,60m x 2,30m. Tecido de linho.", preco: 159.90, imagem: "../imagens/cortina4.png" }
];

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}
