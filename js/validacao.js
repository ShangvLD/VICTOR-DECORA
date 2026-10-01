// VALIDAÇÃO: regras do formulário de contato

var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var regexTelefone = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

function mostrarErro(campo, texto) {
    campo.classList.add("erro");
    campo.classList.remove("ok");
    campo.nextElementSibling.textContent = texto;
}

function mostrarOk(campo) {
    campo.classList.remove("erro");
    campo.classList.add("ok");
    campo.nextElementSibling.textContent = "";
}

// Valida um campo. Devolve true se está certo e false se tem erro
function validarCampo(campo) {
    var valor = campo.value.trim();

    if (campo.id === "nome") {
        if (valor === "") {
            mostrarErro(campo, "Digite seu nome.");
            return false;
        } else if (valor.length < 3) {
            mostrarErro(campo, "O nome precisa ter pelo menos 3 letras.");
            return false;
        }
    }

    if (campo.id === "email") {
        if (valor === "") {
            mostrarErro(campo, "Digite seu e-mail.");
            return false;
        } else if (!regexEmail.test(valor)) {
            mostrarErro(campo, "E-mail inválido. Exemplo: nome@email.com");
            return false;
        }
    }

    if (campo.id === "telefone") {
        if (valor === "") {
            mostrarErro(campo, "Digite seu telefone.");
            return false;
        } else if (!regexTelefone.test(valor)) {
            mostrarErro(campo, "Telefone inválido. Exemplo: (11) 91234-5678");
            return false;
        }
    }

    mostrarOk(campo);
    return true;
}

// Valida todos os campos do formulário de uma vez
function validarFormulario(formulario) {
    var campos = formulario.querySelectorAll("input");
    var tudoCerto = true;

    for (var i = 0; i < campos.length; i++) {
        if (!validarCampo(campos[i])) {
            tudoCerto = false;
        }
    }
    return tudoCerto;
}
