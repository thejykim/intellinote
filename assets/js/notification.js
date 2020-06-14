function createNotification(type, message, href) {
    notificationCount++;

    if (notificationCount > 1) {
        clearInterval(dismissInterval);
    }

    if (href == null) {
        dismissCount = 4;

        createDialog.innerHTML = `
        <div class="notification ${type}">
            <div class="has-text-right is-size-7">
                <span id="dismissCount">(Dismissing in 5 seconds)</span>
            </div>
            <p>${message}</p>
        </div>
        <br>`;

        $("#createDialog").fadeIn("slow", function() {
            dismissInterval = setInterval(updateDismissCount, 1000);
        });
    } else {
        createDialog.innerHTML = `
        <a href='${href}'>
            <div class="notification ${type}">
                <p>${message}</p>
            </div>
        </a>
        <br>
        `;
    }
}

function updateDismissCount() {
    if (dismissCount > 1) {
        $("#dismissCount").text("(Dismissing in " + dismissCount + " seconds)");
    } else if (dismissCount == 1) {
        $("#dismissCount").text("(Dismissing in " + dismissCount + " second)");
    } else {
        $("#dismissCount").text("(Dismissing in " + dismissCount + " seconds)");
        clearInterval(dismissInterval);
        dismissNotification();
    }

    dismissCount--;
}

function dismissNotification() {
    notificationCount--;

    if (notificationCount == 0) {
        $("#createDialog").fadeOut("slow", function() {
            createDialog.innerHTML = ``;
        })
    }
}