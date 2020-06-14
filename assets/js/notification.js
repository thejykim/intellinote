function createNotification(type, message, href) {
    notificationCount++;

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
        notificationCount--;
        setTimeout(dismissNotification, 4000);
    });
}

function dismissNotification() {
    if (notificationCount == 0) {
        $("#createDialog").fadeOut("slow", function() {
            createDialog.innerHTML = ``;
        })
    }
}