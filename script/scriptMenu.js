document.addEventListener("DOMContentLoaded", ()=>{
    ultimoScroll = window.scrollY;
    const menu = document.getElementById("navegacao");
    
    window.addEventListener("scroll", ()=>{
        scrollAtual = window.scrollY;

        if(scrollAtual > ultimoScroll){
            menu.style.top = "-100px";
        }else{
            menu.style.top = "0";
        }

        ultimoScroll = scrollAtual;
    });
});