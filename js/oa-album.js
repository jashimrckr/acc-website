const grid = document.querySelector('.album-grid');
const photos = Array.from(grid.querySelectorAll('a'));
const more = document.querySelector('.album-more');
const viewer = document.querySelector('.album-viewer');
const enlarged = viewer.querySelector('img');
const counter = viewer.querySelector('output');
const batchSize = 24;
let shown = 0;
let current = 0;

function showBatch() {
    const end = Math.min(shown + batchSize, photos.length);
    photos.slice(shown, end).forEach(photo => { photo.hidden = false; });
    shown = end;
    more.hidden = shown === photos.length;
}

photos.forEach(photo => { photo.hidden = true; });
showBatch();
more.addEventListener('click', () => {
    const firstNew = photos[shown];
    showBatch();
    firstNew.focus();
});

function selectPhoto(index) {
    current = (index + photos.length) % photos.length;
    enlarged.src = photos[current].href;
    enlarged.alt = photos[current].querySelector('img').alt;
    counter.textContent = 'Photo ' + (current + 1) + ' of ' + photos.length;
}

grid.addEventListener('click', event => {
    const photo = event.target.closest('a');
    if (!photo || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.showModal) return;
    event.preventDefault();
    selectPhoto(photos.indexOf(photo));
    viewer.showModal();
});
viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
viewer.querySelector('[data-prev]').addEventListener('click', () => selectPhoto(current - 1));
viewer.querySelector('[data-next]').addEventListener('click', () => selectPhoto(current + 1));
viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') selectPhoto(current + 1);
    if (event.key === 'ArrowLeft') selectPhoto(current - 1);
});
