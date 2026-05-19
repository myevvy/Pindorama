document.addEventListener("DOMContentLoaded", () => {
  const btnComp = document.getElementById("botao-compartilhar");
  const msgLink = document.getElementById("msgLink");

  btnComp.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    msgLink.classList.add("aberta");
    setTimeout(() => {
      msgLink.classList.remove("aberta");
    }, 1400);
  });
});
