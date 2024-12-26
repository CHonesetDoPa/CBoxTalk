// renderer.js

// Base function
document.getElementById('minimizeButton').addEventListener('click', () => {
    window.electronAPI.minimize();
});

document.getElementById('closeButton').addEventListener('click', () => {
    window.electronAPI.close();
});

document.getElementById('fullscreenButton').addEventListener('click', () => {
    window.electronAPI.toggleFullScreen()
});

// Game Logic

document.getElementById('startGame').addEventListener('click', () => {
    window.location.href = 'startChapter.html'
});