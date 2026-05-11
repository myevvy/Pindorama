let nivel = parseInt(localStorage.getItem("nivel")) || 0;
let erros = parseInt(localStorage.getItem("erros")) || 0;
let fases = [
  {
    pergunta: "A Mata Atlântica é um(a):",
    opcoes: ["Floresta", "Cidade", "Escola", "Deserto"],
    imagens: [
      "../assets/images/quiz/quiz_floresta.png",
      "../assets/images/quiz/quiz_cidade.png",
      "../assets/images/quiz/quiz_Escola.png",
      "../assets/images/quiz/quiz_deserto.png",
    ],
    correta: 0,
  },
  {
    pergunta: "Qual animal vive na Mata Atlântica?",
    opcoes: ["Pinguim", "Urso polar", "Camelo", "Mico-leão-dourado"],
    imagens: [
      "../assets/images/quiz/quiz_pinguim.png",
      "../assets/images/quiz/quiz_polar.png",
      "../assets/images/quiz/quiz_camelo.png",
      "../assets/images/quiz/quiz_mico.png",
    ],
    correta: 3,
  },
  {
    pergunta: "O que encontramos na Mata Atlântica?",
    opcoes: ["Apenas areia", "Apenas prédios", "Muitas árvores", "Apenas gelo"],
    correta: 2,
  },
  {
    pergunta: "O que NÃO devemos fazer na floresta?",
    opcoes: [
      "Cuidar dos animais",
      "Jogar lixo",
      "Plantar árvores",
      "Proteger a natureza",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual animal grande vive na Mata Atlântica?",
    opcoes: ["Elefante", "Onça-pintada", "Girafa", "Leão"],
    imagens: [
      "../assets/images/quiz/quiz_elefante.png",
      "../assets/images/quiz/quiz_onca.png",
      "../assets/images/quiz/quiz_girafa.png",
      "../assets/images/quiz/quiz_leao.png",
    ],
    correta: 1,
  },
  {
    pergunta: "As árvores ajudam a:",
    opcoes: [
      "Construir prédios",
      "Fazer celulares",
      "Fazer carros",
      "Produzir oxigênio",
    ],
    imagens: [
      "../assets/images/quiz/quiz_predios.png",
      "../assets/images/quiz/quiz_celular.png",
      "../assets/images/quiz/quiz_carro.png",
      "../assets/images/quiz/quiz_ProduzirOxi.png",
    ],
    correta: 3,
  },
  {
    pergunta: "Quem vive na Mata Atlântica?",
    opcoes: ["Apenas pessoas", "Animais e plantas", "Robôs", "Apenas carros"],
    imagens: [
      "../assets/images/quiz/quiz_pessoa.png",
      "../assets/images/quiz/quiz_animaisEplantas.png",
      "../assets/images/quiz/quiz_robo.png",
      "../assets/images/quiz/quiz_carro.png",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual dessas coisas ajuda a natureza?",
    opcoes: [
      "Jogar lixo no rio",
      "Poluir o ar",
      "Cortar todas as árvores",
      "Plantas árvores",
    ],
    imagens: [
      "../assets/images/quiz/quiz_lixo.png",
      "../assets/images/quiz/quiz_poluirOAr.png",
      "../assets/images/quiz/quiz_cortarArvores.png",
      "../assets/images/quiz/quiz_plantararvores.png",
    ],
    correta: 3,
  },
  {
    pergunta: " A Mata Atlântica precisa ser:",
    opcoes: ["Esquecida", "Queimada", "Destruída", "Protegida"],
    imagens: [
      "../assets/images/quiz/quiz_Esquecida.png",
      "../assets/images/quiz/quiz_queimada.png",
      "../assets/images/quiz/quiz_destruida.png",
      "../assets/images/quiz/quiz_Protegida.png",
    ],
    correta: 3,
  },
  {
    pergunta: "Cuidar da natureza é:",
    opcoes: ["Muito importante", "Chato", "Inútil", "Desnecessário"],
    correta: 0,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const perguntasDiv = document.querySelectorAll(".alternativas-quiz");
  const nivelTexto = document.getElementById("numero-pergunta");
  const tituloPergunta = document.getElementById("texto-pergunta");
  const textos = document.querySelectorAll(".texto-alternativa");
  const imgs = document.querySelectorAll(".alternativas-quiz img");
  const progresso = document.getElementById("progrecao");
  const botaoAvancar = document.getElementById("botao-avancar");
  const textoMensagem = document.querySelector(".mensagemQuiz");
  const popUp = document.getElementById("popUp");
  const tituloPop = document.getElementById("tituloPopUp");
  const subPop = document.getElementById("subTituloPop");
  const btnJogar = document.getElementById("jogarN");
  progresso.max = fases.length;

  function atualizarFase() {
    nivelTexto.textContent = `Pergunta ${nivel + 1}`;
    tituloPergunta.textContent = fases[nivel].pergunta;
    textos.forEach((texto, i) => {
      texto.textContent = fases[nivel].opcoes[i];
    });

    if (fases[nivel].imagens) {
      imgs.forEach((img, i) => {
        img.style.display = "flex";
        img.src = fases[nivel].imagens[i];
      });
    } else {
      imgs.forEach((img) => {
        img.style.display = "none";
      });
    }
  }

  function renderizarProgresso() {
    progresso.value = nivel;
  }

  function limparSelecao() {
    perguntasDiv.forEach((div) => {
      div.classList.remove("selecionada");
    });
  }

  function limparFeedback() {
    perguntasDiv.forEach((div) => {
      div.classList.remove("certa");
      div.classList.remove("errada");
    });
  }

  function resetarSelecao() {
    respostaUser = undefined;
    divSelecionada = null;
  }

  function salvarProgresso() {
    localStorage.setItem("nivel", nivel);
    localStorage.setItem("erros", erros);
  }

  function mostrarMensagem(mensagem) {
    textoMensagem.textContent = mensagem;
    textoMensagem.classList.add("ativo");
    setTimeout(() => {
      textoMensagem.classList.remove("ativo");
    }, 1300);
  }

  function abrirPop(titulo, subtitulo = "") {
    popUp.classList.add("aberto");
    tituloPop.textContent = titulo;
    subPop.textContent = subtitulo;
  }

  function carregarFase() {
    if (nivel >= fases.length) {
      abrirPop("GANHOU", "Parabéns, você finalizou o quiz!");
      nivel = fases.length - 1;
      return;
    } else if (erros >= 3) {
      abrirPop("PERDEU", "Tente novamente!");
      nivel = 0;
      erros = 0;
    }

    limparSelecao();
    limparFeedback();
    resetarSelecao();
    atualizarFase();
    renderizarProgresso();
  }

  function respostaCorreta() {
    mostrarMensagem("Alternativa correta!");
    divSelecionada.classList.remove("selecionada");
    divSelecionada.classList.add("certa");
    nivel++;
    salvarProgresso();

    setTimeout(() => {
      carregarFase();
    }, 1200);
  }

  function respostaErrada() {
    erros++;
    divSelecionada.classList.remove("selecionada");
    divSelecionada.classList.add("errada");
    mostrarMensagem("Alternativa incorreta!");
    salvarProgresso();

    if (erros >= 3) {
      abrirPop("PERDEU", "Tente novamente!");
      nivel = 0;
      erros = 0;
      setTimeout(() => {
        salvarProgresso();
        carregarFase();
      }, 1500);
    }
  }

  perguntasDiv.forEach((div) => {
    div.addEventListener("click", () => {
      limparSelecao();

      respostaUser = Number(div.dataset.numpergunta);

      divSelecionada = div;

      div.classList.add("selecionada");
    });
  });

  botaoAvancar.addEventListener("click", () => {
    if (respostaUser === undefined) {
      mostrarMensagem("Escolha uma alternativa");
      return;
    }

    if (respostaUser === fases[nivel].correta) {
      respostaCorreta();
    } else {
      respostaErrada();
    }
  });

  btnJogar.addEventListener("click", () => {
    nivel = 0;
    erros = 0;
    salvarProgresso();

    popUp.classList.remove("aberto");

    carregarFase();
  });

  carregarFase();
});
