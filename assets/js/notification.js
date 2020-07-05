function createNotification(type, message, href) {
    if (href == null) {
        notificationCount++;

        if (notificationCount > 1) {
            notificationCount = 1;
            clearInterval(dismissInterval);
        }

        dismissCount = 4;

        createDialog.innerHTML = `
        <a href='${href}'>
            <div class="notification ${type}" style="border: 5px solid hsl(0, 0%, 86%)">
                <div class="columns">
                    <div class="column is-11">
                        <p>${message}</p>
                    </div>
                    <div class="column">
                        <div class="">
                            <span id="dismissCount">(Dismissing in 5 seconds)</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        <br>
        `;

        $("#createDialog").fadeIn("slow", function() {
            dismissInterval = setInterval(updateDismissCount, 1000);
        });
    } else {
        notificationCount = 1;

        clearInterval(dismissInterval);

        createDialog.innerHTML = `
        <div class="notification ${type}" style="border: 5px solid hsl(0, 0%, 86%)">
            <div class="columns">
                <div class="column is-four-fifths">
                    <p>${message}</p>
                </div>
                <div class="column">
                    <span class="icon is-small" onclick='dismissNotification()'>
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            </div>
        </div>
        <br>`;

        $("#createDialog").fadeIn("slow", function() {});
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
        });
    }
}
