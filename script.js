document.addEventListener("DOMContentLoaded", () => {
    const btnTema = document.querySelector("#btn-tema");
    
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("escuro");
        const isEscuro = document.body.classList.contains("escuro");
        
        btnTema.setAttribute("aria-pressed", isEscuro);
        btnTema.textContent = isEscuro ? "Tema Claro" : "Alternar Tema";
    });

    const btnMostrarMais = document.querySelector("#btn-mostrar-mais");
    const textoSobreMais = document.querySelector("#sobre-mais");

    btnMostrarMais.addEventListener("click", () => {
        const estaOculto = textoSobreMais.hasAttribute("hidden");

        if (estaOculto) {
            textoSobreMais.removeAttribute("hidden");
            textoSobreMais.classList.remove("oculto");
            btnMostrarMais.setAttribute("aria-expanded", "true");
            btnMostrarMais.textContent = "Mostrar menos";
        } else {
            textoSobreMais.setAttribute("hidden", "");
            textoSobreMais.classList.add("oculto");
            btnMostrarMais.setAttribute("aria-expanded", "false");
            btnMostrarMais.textContent = "Mostrar mais";
        }
    });

    const selectFiltro = document.querySelector("#filtro-categoria");
    const containerCards = document.querySelector("#container-cards");
    const contadorSpan = document.querySelector("#contador-projetos span");
    const statusP = document.querySelector("#status-portfolio");

    function atualizarFiltroEContador() {
        const filtro = selectFiltro.value;
        const cards = containerCards.querySelectorAll(".card");
        let visiveis = 0;

        cards.forEach(card => {
            const categoriaCard = card.dataset.categoria;

            if (filtro === "todos" || categoriaCard === filtro) {
                card.classList.remove("oculto");
                visiveis++;
            } else {
                card.classList.add("oculto");
            }
        });

        if (contadorSpan) {
            contadorSpan.textContent = visiveis;
        }
    }

    selectFiltro.addEventListener("change", () => {
        atualizarFiltroEContador();
        statusP.textContent = `Filtro aplicado: ${selectFiltro.value.toUpperCase()}`;
    });

    const formCadastro = document.querySelector("#form-cadastro-projeto");
    const inputNome = document.querySelector("#nome-projeto");

    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeDigitado = inputNome.value.trim();
        const categoriaSelecionada = document.querySelector("#categoria-projeto").value;

        if (nomeDigitado.length < 3) {
            statusP.textContent = "Erro: O nome do projeto deve conter pelo menos 3 caracteres.";
            statusP.style.color = "#ef4444";
            return;
        }

        const novoCard = document.createElement("article");
        novoCard.className = "card projeto";
        novoCard.dataset.categoria = categoriaSelecionada;

        novoCard.innerHTML = `
            <img src="./img/portifolio.png" alt="Novo projeto" class="img-projeto">
            <div class="info-card">
                <h3></h3>
                <p>Novo projeto adicionado dinamicamente via formulário.</p>
                <p>Tecnologias: ${categoriaSelecionada.toUpperCase()}</p>
                <div class="acoes-card">
                    <a href="#" class="botao">Ver projeto</a>
                    <button type="button" class="btn-remover remover">Remover</button>
                </div>
            </div>
        `;

        novoCard.querySelector("h3").textContent = nomeDigitado;

        containerCards.appendChild(novoCard);

        statusP.textContent = `Projeto "${nomeDigitado}" adicionado com sucesso!`;
        statusP.style.color = "#2563eb";

        formCadastro.reset();
        atualizarFiltroEContador();
    });

    containerCards.addEventListener("click", (e) => {
        const btnRemover = e.target.closest(".remover");
        if (!btnRemover) return;

        const cardParaRemover = btnRemover.closest(".card");
        if (cardParaRemover) {
            const titulo = cardParaRemover.querySelector("h3")?.textContent || "Projeto";
            cardParaRemover.remove();

            statusP.textContent = `Projeto "${titulo}" removido.`;
            statusP.style.color = "#ef4444";
            atualizarFiltroEContador();
        }
    });

    atualizarFiltroEContador();

   
    const formContato = document.querySelector("#form-contato");
    const selectMotivo = document.querySelector("#motivo");
    const grupoAssunto = document.querySelector("#grupo-assunto");
    const inputAssunto = document.querySelector("#assunto");
    const textareaMensagem = document.querySelector("#mensagem");
    const spanContador = document.querySelector("#contador");
    const mensagemValidacao = document.querySelector("#mensagem-validacao");

    if (formContato) {
        
        selectMotivo.addEventListener("change", () => {
            if (selectMotivo.value === "outro") {
                grupoAssunto.classList.remove("oculto"); 
            } else {
                grupoAssunto.classList.add("oculto"); 
                inputAssunto.value = ""; 
            }
        });

       
        textareaMensagem.addEventListener("input", () => {
            const tamanhoTexto = textareaMensagem.value.trim().length;
            spanContador.textContent = tamanhoTexto;
            
            
            spanContador.style.color = tamanhoTexto > 1000 ? "#ef4444" : "inherit";
        });

        
        formContato.addEventListener("submit", (evento) => {
            evento.preventDefault(); 
            
            
            const nome = document.querySelector("#nome").value.trim();
            const email = document.querySelector("#email").value.trim();
            const motivo = selectMotivo.value;
            const assunto = inputAssunto.value.trim();
            const mensagem = textareaMensagem.value.trim();

            
            const exibirErro = (texto) => {
                mensagemValidacao.textContent = texto;
                mensagemValidacao.style.color = "#ef4444";
            };

            
            if (nome.length < 3 || nome.length > 80) {
                return exibirErro("Erro: O nome deve ter entre 3 e 80 caracteres válidos.");
            }

           
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return exibirErro("Erro: Insira um endereço de e-mail válido.");
            }

            
            if (motivo === "") {
                return exibirErro("Erro: Selecione um motivo para o contato.");
            }

            
            if (motivo === "outro") {
                if (assunto.length < 5 || assunto.length > 100) {
                    return exibirErro("Erro: O assunto adicional deve ter entre 5 e 100 caracteres.");
                }
            }

            
            if (mensagem.length < 30 || mensagem.length > 1000) {
                return exibirErro(`Erro: A mensagem deve ter entre 30 e 1000 caracteres. (Atual: ${mensagem.length})`);
            }

            
            mensagemValidacao.textContent = `Tudo certo, ${nome}! Formulário validado com sucesso.`;
            mensagemValidacao.style.color = "#2563eb";
            
           
            formContato.reset();
            grupoAssunto.classList.add("oculto");
            spanContador.textContent = "0";
            spanContador.style.color = "inherit";
        });
    }


});