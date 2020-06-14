function createNotification(type, message, href) {
    if (href == null) {
        createDialog.innerHTML = `
        <div class="notification ${type}">
            ${message}
        </div>
        <br>`;
    } else {
        createDialog.innerHTML = `
        <a href='${href}'>
            <div class="notification ${type}">
                ${message}
            </div>
        </a>
        <br>
        `;
    }

    createDialog.innerHTML = `
    <div class="notification ${type}">
        ${message}
    </div>
    <br>`;

    $("#createDialog").fadeIn("slow", function() {
        setTimeout(dismissNotification, 4000);
    });
}

function dismissNotification() {
    $("#createDialog").fadeOut("slow", function() {
        createDialog.innerHTML = ``;
    })
}