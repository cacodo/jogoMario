const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverImage = document.querySelector('.game-over');
const restartButton = document.querySelector('#restart-button');
const scoreElement = document.querySelector('#score');
const music = document.querySelector('#music');

let score = 0;
let gameRunning = true;

const startGame = () => {
    pipe.classList.add('pipe-animation');

    music.play().catch(() => {
        // O navegador pode bloquear áudio antes da primeira interação.
    });
};

const jump = () => {
    if (!gameRunning || mario.classList.contains('jump')) {
        return;
    }

    mario.classList.add('jump');

    music.play().catch(() => {});

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const gameLoop = setInterval(() => {
    if (!gameRunning) {
        return;
    }

    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(
        window.getComputedStyle(mario).bottom.replace('px', '')
    );

    const collision =
        pipePosition <= 120 &&
        pipePosition > 0 &&
        marioPosition < 80;

    if (collision) {
        gameRunning = false;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        gameOverImage.style.display = 'block';
        restartButton.style.display = 'block';

        music.pause();

        return;
    }

    score++;
    scoreElement.textContent = Math.floor(score / 10);
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
});

document.addEventListener('click', (event) => {
    if (event.target !== restartButton) {
        jump();
    }
});

restartButton.addEventListener('click', () => {
    window.location.reload();
});

startGame();