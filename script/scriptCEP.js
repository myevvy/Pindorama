document.addEventListener("DOMContentLoaded", () => {
  $("#busca-cep").mask("00000-000");

  const formCEP = document.getElementById("formCEP");
  let inputCEP = document.getElementById("busca-cep");
  let ongs = document.querySelectorAll("#card-ongs .perfil-ong");
  const ongContainer = document.getElementById("card-ongs");
  const filtroOpcoes = document.getElementById("selecao-proximidade");
  let opcao = "maisProximo";

  function maisProximas() {
    const ongsDiv = Array.from(ongContainer.children);

    ongsDiv.sort((a, b) => a.dataset.distancia - b.dataset.distancia);

    ongsDiv.forEach((ongDiv) => {
      ongContainer.appendChild(ongDiv);
    });
  }

  function menorPmaior(filtro) {
    const ongsDiv = Array.from(ongContainer.children);

    ongsDiv.sort((a, b) => b.dataset[filtro] - a.dataset[filtro]);

    ongsDiv.forEach((ongDiv) => {
      ongContainer.appendChild(ongDiv);
    });
  }

  formCEP.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      let cep = inputCEP.value;
      cep = cep.replace(/\D/g, "");

      if (cep.length !== 8) {
        throw new Error("CEP inválido");
      }

      let response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);

      if (!response.ok) {
        throw new Error("CEP inválido");
      }

      let dataCEP = await response.json();

      const userC = {
        lat: parseFloat(dataCEP.lat),
        lng: parseFloat(dataCEP.lng),
      };

      for (const ong of ongs) {
        let cepOng = ong.dataset.cep;

        let responseOng = await fetch(
          `https://cep.awesomeapi.com.br/json/${cepOng}`,
        );

        let dataOng = await responseOng.json();

        let ongC = {
          lat: parseFloat(dataOng.lat),
          lng: parseFloat(dataOng.lng),
        };

        let distancia = calcularDistancia(
          userC.lat,
          userC.lng,
          ongC.lat,
          ongC.lng,
        );

        ong.dataset.distancia = distancia;
        let distanciaTexto = ong.querySelector(".statusOng");
        distanciaTexto.textContent = `${distancia} km`;
      }

      filtrarDistancia(opcao);
    } catch (erro) {
      mostrarErro(erro.message);
    }
  });

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;

    return distancia.toFixed(2);
  }

  let textoErro = document.getElementById("mensagemErro");

  function mostrarErro(mensagem) {
    textoErro.classList.add("mostrar");
    textoErro.textContent = mensagem;

    setTimeout(() => {
      textoErro.classList.remove("mostrar");
    }, 1600);
  }

  function filtrarDistancia(condicao) {
    if (condicao == "maisProximo") {
      maisProximas();
    } else {
      menorPmaior("distancia");
    }
  }

  filtroOpcoes.addEventListener("click", () => {
    opcao = filtroOpcoes.value;
    if (opcao == "maisProximo" || opcao == "maisDistante") {
      if (inputCEP.value == "" || inputCEP.value.length < 8) {
        mostrarErro("Preencha o campo do CEP");
        return;
      } else {
        filtrarDistancia(opcao);
      }
    }else{
        menorPmaior("av")
    }
  });

  // FILTRO PESQUISA

  const inputPesquisaDoe = document.getElementById("busca-nome-causa");
  const opcoesCausas = document.getElementById("opcoesCausas");
  const opcoesEstados = document.getElementById("opcoesEstados");
  const textoResultados = document.querySelector("#texto-resultados");
  let resultadosDoe = ongs.length;
  textoResultados.textContent = resultadosDoe;

  inputPesquisaDoe.addEventListener("input", () => {
    inputPesquisaDoe.value = inputPesquisaDoe.value
      .toLowerCase()
      .replace(/\s+/g, "");

    buscarOng(inputPesquisaDoe.value, opcoesCausas.value, opcoesEstados.value);
  });

  opcoesCausas.addEventListener("change", () => {
    buscarOng(inputPesquisaDoe.value, opcoesCausas.value, opcoesEstados.value);
  });

  opcoesEstados.addEventListener("change", () => {
    buscarOng(inputPesquisaDoe.value, opcoesCausas.value, opcoesEstados.value);
  });

  function buscarOng(pesquisa, causa, estado) {
    resultadosDoe = 0;
    ongs.forEach((ong) => {
      let nomeOng = ong.querySelector(".nome-ong").textContent.toLowerCase();
      let causaOng = ong
        .querySelector(".causa")
        .textContent.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      let estadoOng = ong.dataset.estado;

      filtroPesquisa =
        nomeOng.includes(pesquisa) || causaOng.includes(pesquisa);

      filtroCausa = causaOng == causa || causa == "todas";

      filtroEstado = estado == estadoOng || estado == "todos";

      if (filtroPesquisa && filtroCausa && filtroEstado) {
        resultadosDoe++;
        ong.style.display = "flex";
        textoResultados.textContent = resultadosDoe;
      } else {
        ong.style.display = "none";
        textoResultados.textContent = resultadosDoe;
      }
    });
  }
});
