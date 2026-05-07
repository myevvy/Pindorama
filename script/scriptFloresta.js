document.addEventListener("DOMContentLoaded", () => {
    let inputPesquisa = document.querySelector("#pesquisa_texto");
    console.log(inputPesquisa)
    let filtros = document.querySelectorAll("#botoes-filtro .filtros");
    let noticias = document.querySelectorAll("#bloco-textos .blocos");
    let filtroSelecionado = "todos";
    let resultadosTexto = document.getElementById("textoResultados");
    let resultados = 0;

        filtros.forEach((filtro) => {
            filtro.addEventListener("click", () => {
                filtros.forEach((f) => {
                    f.classList.remove("selecionado");
                });
    
                if (filtroSelecionado == filtro.dataset.filtro) {
                    filtroSelecionado = "todos";
                    const todos = document.querySelector('[data-filtro="todos"]');
                    todos.classList.add("selecionado");
                } else {
                    filtro.classList.add("selecionado");
                    filtroSelecionado = filtro.dataset.filtro;
                }
                buscarNoticia(
                    inputPesquisa.value.toLowerCase().replace(/\s+/g, ""),
                    filtroSelecionado,
                );
            });
        });

    inputPesquisa.addEventListener("input", () => {
        buscarNoticia(
            inputPesquisa.value.toLowerCase().replace(/\s+/g, ""),
            filtroSelecionado,
        );
    });

    function buscarNoticia(pesquisa, filtroSelecionado) {
        pesquisa = pesquisa.toLowerCase();
        noticias.forEach((noticia) => {
            let categoria = noticia.dataset.categoria;
            let titulo = noticia
                .querySelector(".titulos-blocos")
                .textContent.toLowerCase()
                .replace(/\s+/g, "");
            let desc = noticia
                .querySelector(".textinhos")
                .textContent.toLowerCase()
                .replace(/\s+/g, "");

            let filtroTexto = titulo.includes(pesquisa) || desc.includes(pesquisa);
            let filtroCategoria =
                categoria === filtroSelecionado || filtroSelecionado === "todos";

            if (filtroTexto && filtroCategoria) {
                noticia.style.display = "flex";
                resultados++;
            } else {
                noticia.style.display = "none";
            }
        });
        resultadosTexto.textContent = resultados;
        resultados = 0;
    }

    buscarNoticia(inputPesquisa.value, filtroSelecionado);

  
    
});