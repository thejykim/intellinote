function setupContext() {
    // Right click handler
    sheetDiv.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        contextMenu.classList.remove('is-hidden');

        let bounds = mainContentDiv.getBoundingClientRect();
        contextMenu.style.left = event.clientX - bounds.left + 'px';
        contextMenu.style.top = event.clientY - bounds.top + 'px';
        return false;
    }, false);

    // Click out handler
    document.addEventListener('click', function (event) {
        if (!event.target.classList.contains('is-contextMenu')) {
            contextMenu.classList.add('is-hidden');
        } else {
            event.stopPropagation();
        }
    });
}