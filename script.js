const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const botaoContagem = document.querySelector("#start-pause span");
const startPauseBt = document.querySelector("#start-pause");
const iconeStartPause = document.querySelector(".app__card-primary-butto-icon");
const timerNaTela = document.querySelector("#timer");

const musica = new Audio("/sons/relaxing-birds-and-piano-music.mp3");
const somPlay = new Audio("/sons/play.wav");
const somPause = new Audio("/sons/pause.wav");
const somBeep = new Audio("/sons/beep.wav");


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add("active");

});

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add("active");
});

function alterarContexto(contexto) {
    exibirTimer();
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Gerencie bem o seu tempo e<br>
            <strong class="app__title-strong">foque nas coisas pelo tempo certo.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Como está o clima lá fora?<br>
            <strong class="app__title-strong">Tome um sol ou uma água e relaxe.</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Às vezes uma parada é bom.<br>
            <strong class="app__title-strong">Por que não se alongar?</strong>
            `;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos<=0) {
        somBeep.play()
        alert("Tempo esgotado!");
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    exibirTimer();
}

startPauseBt.addEventListener("click", startPause)

function startPause() {
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000)
    botaoContagem.textContent = "Pausar";
    iconeStartPause.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    botaoContagem.textContent = "Começar";
    iconeStartPause.setAttribute("src", "/imagens/play_arrow.png")
    intervaloId = null;
}

function exibirTimer() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: "2-digit"})
    timerNaTela.innerHTML = `${tempoFormatado}`;
}

exibirTimer();