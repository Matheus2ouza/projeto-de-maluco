const naoBtn = document.getElementById('nao-btn');
const simBtn = document.getElementById('sim-btn');
const modal = document.getElementById('video-modal');
const closeBtn = document.querySelector('.close-btn');
const iframe = document.getElementById('youtube-video');

// URL do vídeo com autoplay e start aos 29 segundos
const videoURL = "https://www.youtube.com/embed/QUlMp1X1Gtk?si=qmKe3Ipxj34As-o2&start=29&autoplay=1";

// Eventos para mover o botão "Não" no mouseover, clique e toque (para celulares)
naoBtn.addEventListener('mouseover', movButton);
naoBtn.addEventListener('click', movButton);
naoBtn.addEventListener('touchstart', movButton);

// Evento para abrir o modal ao clicar no botão "Sim"
simBtn.addEventListener('click', () => {
    iframe.src = videoURL;  // Define o vídeo com autoplay ativado
    modal.style.display = 'flex';
});

// Fechar o modal ao clicar no botão de fechar
closeBtn.addEventListener('click', closeModal);

// Fechar o modal ao clicar fora do conteúdo
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Função para fechar o modal e parar o vídeo
function closeModal() {
    modal.style.display = 'none';
    iframe.src = ""; // Remove o vídeo para parar a reprodução
}

function movButton() {
    let x, y;
    let isOverlapping;

    do {
        // Gera novas posições dentro dos limites da tela
        x = Math.random() * (window.innerWidth - naoBtn.offsetWidth - 30);
        y = Math.random() * (window.innerHeight - naoBtn.offsetHeight - 30);

        // Evita que o botão fique muito próximo às bordas
        x = Math.max(15, x);
        y = Math.max(15, y);

        // Verifica se há sobreposição com o botão "Sim"
        isOverlapping = checkOverlap(x, y, naoBtn, simBtn);

    } while (isOverlapping);

    naoBtn.style.position = 'absolute';
    naoBtn.style.left = `${x}px`;
    naoBtn.style.top = `${y}px`;
}

// Função para verificar sobreposição entre os botões
function checkOverlap(x, y, movingBtn, staticBtn) {
    const naoRect = {
        left: x,
        right: x + movingBtn.offsetWidth,
        top: y,
        bottom: y + movingBtn.offsetHeight
    };

    const simRect = staticBtn.getBoundingClientRect();

    return !(
        naoRect.right < simRect.left ||
        naoRect.left > simRect.right ||
        naoRect.bottom < simRect.top ||
        naoRect.top > simRect.bottom
    );
}
