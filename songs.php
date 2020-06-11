<!DOCTYPE html>
<html>
    <head>
        <title>IntelliNote | Custom Sheet Music</title>

        <!-- bulma css -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">

        <!-- font awesome (for icons) -->
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

        <!-- custom css -->
        <link rel="stylesheet" href="assets/css/custom.css">

        <!-- tonejs -->
        <script src="https://unpkg.com/tone@13.8.25/build/Tone.js"></script>

        <!-- Google OAuth -->
        <meta name="google-signin-client_id" content="551645492483-lal6djpa0n6d64u6k2bvqmfvgoverdak.apps.googleusercontent.com">

        <!-- Hotjar  -->
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1850543,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        </script>

    </head>

    <body>

        <nav class="navbar is-dark navbar-gradient" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <p class="navbar-item is-size-5 poppins" style="font-weight: 600;padding-right:0.3rem"><a
                            class="has-text-white" href="index.html">IntelliNote</a></p>
                    <p class="navbar-item is-size-6 poppins" style="font-weight: 400;padding-left:0px;top:0.1rem">Custom
                        Sheet Music</p>
                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                        data-target="navbarMain">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarMain" class="navbar-menu">
                    <div class="navbar-start">
                    </div>

                    <div class="navbar-end">
                        <div class="g-signin2" data-onsuccess="onSignInSong"></div>
                        <p class="navbar-item has-text-weight-light karla"><a class="has-text-white" href='index.html' onclick="signOut()">Sign Out</a></p>
                        <p class="navbar-item has-text-weight-light karla"><a class="has-text-white" href='profile.php'>Profile</a></p>
                        <p class="navbar-item has-text-weight-light karla"><a class="has-text-white" href="about.html">About us</a></p>
                    </div>
                </div>
        </nav>

        <!-- padding container for style points-->

        <div class="empty-padding"></div>

        <!-- main body div -->
        <div class="container site-content">

            <!-- div for alerts -->
            <div class="container karla" id="createDialog"></div>

            <!-- div for columns -->
            <div class="columns">

                <!-- first column -->
                <div class="column is-one-quarter">
                    <nav class="panel has-background-white">
                        <div class="panel-heading">
                            <p class="poppins">Settings
                                <button id="open-info-modal" style="float:right"
                                    class="button gradient is-small is-info is-rounded karla">
                                    <span>How-To</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-info-circle"></i>
                                    </span>
                                </button>
                            </p>
                        </div>
                        <div class="panel-block" style="padding: 0.5rem 1.5rem;">
                            <div class="container">
                                <!-- play/stop buttons -->
                                <div class="field has-addons">
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient" id="start"
                                            onclick="startPlaying()">
                                            <span class="icon is-small">
                                                <i class="fas fa-play"></i>
                                            </span>
                                            <span>Play</span>
                                        </button>
                                    </p>
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient" id="stop"
                                            onclick="stopPlaying()" disabled>
                                            <span class="icon is-small">
                                                <i class="fas fa-stop"></i>
                                            </span>
                                            <span>Stop</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="panel-block" style="padding: 0.5rem 1.5rem">
                            <div class="container">
                                <p class="subtitle is-6 poppins"
                                    style="margin-bottom: 0.5rem;font-weight: 500;font-size:small">Tempo</p>
                                <!-- Tempo Slider -->
                                <div class="sliderDiv">
                                    <input type="range" min="30" max="240" value="120" id="tempoSlider"
                                        oninput="updateTempo(this.value);">
                                </div>
                                <p class="karla" style="font-size: 0.85rem">Current tempo: <input class="karla is-small"
                                        type="text" size="3" style="text-align:right" value="120" id="tempoBox"
                                        onchange="updateTempo(this.value)"> BPM</p>
                            </div>
                        </div>

                        <div class="panel-block" style="padding: 0.5rem 1.5rem">
                            <div class="container">
                                <p class="subtitle is-6 poppins"
                                    style="margin-bottom: 0.5rem;font-weight: 500;font-size:small">Time Signature</p>
                                <div class="control has-icons-left">
                                    <div class="select">
                                        <select class="karla" id="timeSig" onchange="changeTimeSig()">
                                            <option value="2">2/4</option>
                                            <option value="3">3/4</option>
                                            <option selected="selected" value="4">4/4</option>
                                        </select>
                                    </div>
                                    <span class="icon is-left">
                                        <i class="fas fa-clock"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="panel-block" style="padding: 0.5rem 1.5rem;">
                            <div class="container">
                                <p class="subtitle is-6 poppins"
                                    style="margin-bottom: 0.5rem;font-weight: 500;font-size:small">Change Note</p>
                                <!-- note lengths -->
                                <form id="lengthForm">
                                    <input type="radio" name="note" id="eighthNote" value="eighthNote"
                                        onclick="assignNote()" checked>
                                    <label for="eighthNote"> <img src="assets/img/eighthNote.png" style="height: 2rem;">
                                    </label>
                                    <input type="radio" name="note" id="quarterNote" value="quarterNote"
                                        onclick="assignNote()">
                                    <label for="quarterNote"> <img src="assets/img/quarterNote.png" style="height: 2rem;">
                                    </label>
                                    <input type="radio" name="note" id="halfNote" value="halfNote" onclick="assignNote()">
                                    <label for="halfNote"> <img src="assets/img/halfNote.png" style="height: 2rem;">
                                    </label>
                                    <input type="radio" name="note" id="wholeNote" value="wholeNote" onclick="assignNote()">
                                    <label for="wholeNote"> <img src="assets/img/wholeNote.png" style="height: 2rem;">
                                    </label>
                                </form>

                                <br>

                                <!-- accidentals -->
                                <form id="accidentalForm">
                                    <input type="radio" name="accidental" id="natural" value="" onclick="assignNote()"
                                        checked>
                                    <label for="natural"> <img src="assets/img/Natural.png" style="height: 1.75rem;">
                                    </label>
                                    <input type="radio" name="accidental" id="sharp" value="#" onclick="assignNote()">
                                    <label for="sharp"> <img src="assets/img/Sharp.png" style="height: 1.75rem;">
                                    </label>
                                    <input type="radio" name="accidental" id="flat" value="b" onclick="assignNote()">
                                    <label for="sharp"> <img src="assets/img/Flat.png" style="height: 1.75rem;"> </label>
                                </form>
                            </div>
                        </div>

                        <div class="panel-block" style="padding: 0.5rem 1.5rem;">
                            <div class="container">
                                <p class="subtitle is-6 poppins"
                                    style="margin-bottom: 0.5rem;font-weight: 500;font-size:small">Sheet</p>
                                <!-- add/remove row buttons -->
                                <div class="field is-grouped">
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient"
                                            onclick="addRow()">
                                            <span class="icon is-small">
                                                <i class="fas fa-plus"></i>
                                            </span>
                                            <span>Add row</span>
                                        </button>
                                    </p>
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient"
                                            onclick="removeRow()" id="removeButton" disabled>
                                            <span class="icon is-small">
                                                <i class="fas fa-minus"></i>
                                            </span>
                                            <span>Remove row</span>
                                        </button>
                                    </p>
                                </div>

                                <!-- clear sheet button -->
                                <div class="field">
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient"
                                            onclick="clearSheet()">
                                            <span class="icon is-small">
                                                <i class="fas fa-ban"></i>
                                            </span>
                                            <span id="clearText">Clear sheet</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="panel-block" style="padding: 0.5rem 1.5rem;">
                            <div class="container">
                                <p class="subtitle is-6 poppins"
                                    style="margin-bottom: 0.5rem;font-weight: 500;font-size:small">Share</p>
                                <!-- textbox modal button -->
                                <div class="field is-grouped">
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient"
                                            id="saveButton" onclick = "editLogic(<?php echo $_GET["songID"] ?>)">
                                            <span class="icon is-small" id="saveIcon">
                                                <i class="fas fa-save"></i>
                                            </span>
                                            <span>Save</span>
                                        </button>
                                    </p>
                                    <p class="control">
                                        <button class="button is-info is-small is-rounded karla gradient"
                                            id="open-export-modal">
                                            <span class="icon is-small">
                                                <i class="fas fa-upload"></i>
                                            </span>
                                            <span>Import/Export</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="panel-block" style="padding: 0.5rem 1.5rem;">
                            <div class="container">
                                <p class="subtitle is-6 poppins"
                                    style="margin-bottom: 0.5rem;font-weight: 500;font-size:small">Preset Songs</p>
                                <div class="control has-icons-left">
                                    <div class="select">
                                        <select class="karla" id="songDropdown" onchange="loadSong(this.value)">
                                            <option selected value="none"> None </option>
                                            <option value="miiTheme"> Mii Theme</option>
                                            <option value="tetris">Tetris Theme</option>
                                            <option value="fallinginlove">Can't Help Falling In Love</option>
                                            <option value="epilogue">Epilogue - La La Land</option>
                                        </select>
                                    </div>
                                    <span class="icon is-left">
                                        <i class="fas fa-folder-open"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <!-- second column -->
                <div class="column is-three-quarters" id="sheet-rows">

                    <!-- title -->
                    <input class="input is-info karla" type="text" id="title" autocomplete="off" placeholder="Give your piece an appropriately grand title.">

                    <div class="empty-padding" style="padding: 1rem"></div>

                    <!-- treble clef -->
                    <div class="columns">
                        <div class="column is-2" style="padding-right:0" id="column-left">
                            <div id="timeSigImgT">
                            </div>
                            <img src="assets/img/treble-clef.png"
                                style="height:4.5rem;float:right;position:relative;top:1rem">
                        </div>
                        <div class="column is-10" id="t-col">
                            <table class="sheet" id="treble-sheet-1">
                            </table>
                        </div>
                    </div>

                    <!-- bass clef -->
                    <div class="columns">
                        <div class="column is-2" style="padding-right:0" id="column-left">
                            <div id="timeSigImgB">
                            </div>
                            <img src="assets/img/bass-clef.png"
                                style="height:2.5rem;float:right;position:relative;top:1.5rem">
                        </div>
                        <div class="column is-10" id="b-col">
                            <table class="sheet" id="bass-sheet-1">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="empty-padding"></div>

        <!-- textbox modal for import/export -->
        <div class="modal" id="exportModal">
            <div class="modal-background" id="background-export"></div>
            <div class="modal-content">
                <nav class="panel has-background-white">
                    <p class="panel-heading poppins">
                        Import/Export
                    </p>
                    <div class="container" style="padding: 1rem 1.5rem;">
                        <p class="karla">Press the "Export" button to generate plaintext for you to store your current song,
                            or paste a song you exported earlier and press "Import" to bring it back up.</p><br>
                        <div class="field">
                            <div class="control relative">
                                <textarea class="textarea is-info is-small karla" id="exportBox"
                                    placeholder="If you don't know what to put in here, try pressing export first!"></textarea>
                                <button class="button has-background-light is-small is-text karla" id="copy"
                                    onclick="copy()">Copy to clipboard</button>
                            </div>
                        </div>
                        <!-- import/export buttons -->
                        <div class="container">
                            <button class="button is-info is-small is-rounded karla gradient" id="import"
                                onclick="importSong()">Import</button>
                            <button class="button is-info is-small is-rounded karla gradient" id="export"
                                onclick="exportSong()">Export</button>
                        </div>
                    </div>
                </nav>
            </div>
            <button class="modal-close is-large" id="close-export" aria-label="close"></button>
        </div>

        <!-- textbox modal for instructions -->
        <div class="modal" id="infoModal">
            <div class="modal-background" id="background-info"></div>
            <div class="modal-content">
                <nav class="panel has-background-white">
                    <p class="panel-heading poppins">
                        How-To
                    </p>
                    <div class="container" style="padding: 1rem 1.5rem;">
                        <div class="slideshow">
                            <div class="mySlides">
                                <h5 class="title is-5 poppins has-text-info"> Tempo and Time </h5>
                                <p class="karla">
                                    Tempo is controlled from the Settings panel, either by using the slider
                                    or by inputting a value in the text box. The time signature can also be changed
                                    from the Settings panel by selecting an option from the dropdown menu.
                                </p>
                                <img src="https://i.imgur.com/BAgOm7r.png" style="margin-top:20px;">
                            </div>
                            <div class="mySlides">
                                <h5 class="title is-5 poppins has-text-info"> Adding Notes </h5>
                                <p class="karla">
                                    Notes can be added or removed by clicking on a specific spot
                                    on the staff. You can specify note length and accidental from the
                                    Settings panel. Keep in mind your currently set number of beats per measure!
                                </p>
                                <img src="https://i.imgur.com/pgsjZNe.gif">
                            </div>
                            <div class="mySlides">
                                <h5 class="title is-5 poppins has-text-info"> Importing Songs </h5>
                                <p class="karla">
                                    Using the Import/Export button, you can either copy your music
                                    to your clipboard to send to a friend or import music that someone sent you.
                                    The Preset Songs dropdown allows you to auto-import preset songs.
                                </p>
                                <img src="https://i.imgur.com/5wTeVx3.gif" style="margin-top:20px;">
                            </div>
                            <div class="mySlides">
                                <h5 class="title is-5 poppins has-text-info"> Note Logic </h5>
                                <p class="karla">
                                    Each measure is separated into a number of columns equal to two
                                    times the beats per measure (i.e. 8 columns in 4/4). This enables
                                    you to <strong> assign invisible rests </strong> by skipping columns or
                                    create dotted notes with less gaps.
                                </p>
                                <div style="width:100%; text-align:left;">
                                    <img src="https://i.imgur.com/4d4x8pR.png" style="width:48%;margin-right:1%;">
                                    <img src="https://i.imgur.com/2kYqHZS.png" style="width:48%;">
                                </div>
                            </div>
                        </div>
                        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                        <a class="next" onclick="plusSlides(1)">&#10095;</a>
                        <div style="text-align:center">
                            <span class="dot" onclick="currentSlide(1)"></span>
                            <span class="dot" onclick="currentSlide(2)"></span>
                            <span class="dot" onclick="currentSlide(3)"></span>
                            <span class="dot" onclick="currentSlide(4)"></span>
                        </div>
                    </div>
                </nav>
            </div>
            <button class="modal-close is-large" id="close-info" aria-label="close"></button>
        </div>

        <!-- textbox modal for saving a new song -->
        <div class="modal" id="registerModal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <nav class="panel has-background-white">
                    <p class="panel-heading poppins">
                        Register
                    </p>
                    <div class="container" style="padding: 1rem 1.5rem;">
                        <p class="karla has-text-grey">Looks like you haven't created a username yet! Take some time to fill in the field below, and then you'll be able to save your creation.</p></br>

                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label poppins" for="username">Username</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-info karla" type="text" id="username" placeholder="Quick, think up a cool username!">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label poppins" for="title">Title</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-info karla" type="text" id="title" placeholder="Give your piece an appropriately grand title, too.">
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="field is-horizontal">
                            <div class="field-label is-normal"></div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-info is-small is-rounded karla gradient" id="registerButton"
                                            onclick="registerUser()">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal"></div>
                            <div class="field-body" id="registerDialog"></div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        <!-- footer -->
        <footer class="footer" style="padding-top: 4rem; padding-bottom: 4rem;">
            <div class="content has-text-centered">
                <p class="karla">
                    <b>IntelliNote</b> &copy 2020. Source code available on <a class="has-text-info"
                        href="https://github.com/thejykim/intellinote"><i class="fab fa-github"></i> GitHub</a>. Built
                    with <a class="has-text-info" href="https://tonejs.github.io/">Tone.js</a> and <a class="has-text-info"
                        href="https://bulma.io/">Bulma</a>.
                </p>
                <p class="karla is-inline-block">
                    Home to <span class="tag is-normal has-text-weight-medium has-text-white gradient karla" id="totalSongs">
                        <i class="fas fa-sync-alt fa-pulse"></i>
                    </span> songs made by people like you.
                </p>
                <p class="karla is-size-7"><a class="has-text-info" href="privacy.html">Privacy Policy</a></p>
            </div>
        </footer>

        <!-- js files -->
        <script src="assets/js/globalVars.js"></script>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <script src="assets/js/generate-sheet.js"></script>
        <script src="assets/js/player.js"></script>
        <script src="assets/js/noteLogic.js"></script>
        <script src="assets/js/timeSig.js"></script>
        <script src="assets/js/export.js"></script>
        <script src="assets/js/parseTextFromServer.js"></script>
        <script src="assets/js/displaySongs.js"></script>
        <script src="assets/js/presetSongs.js"></script>
        <script src="assets/js/instructions.js"></script>
        <script src="assets/js/create-song.js"></script>
        <script src="assets/js/login.js"></script>
        <script src="assets/js/saveLogic.js"></script>
        <script src="assets/js/userMap.js"></script>

        <!-- start everything off -->
        <script>
            window.onload = function () {
                generateSheet(clefEnum.TREBLE, 'treble-sheet-1');
                generateSheet(clefEnum.BASS, 'bass-sheet-1');
                setModalJS();
                setInfoModalJS();
                globalSongID = <?php echo $_GET["songID"] ?>;
                getSong(gloalSongID);
                getTotalSongs();
            }
        </script>

        <!-- cookies -->
        <script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>
        <script>
        window.cookieconsent.initialise({
        "palette": {
            "popup": {
            "background": "#edeff5",
            "text": "#838391"
            },
            "button": {
            "background": "#4b81e8"
            }
        },
        "theme": "classic",
        "position": "bottom-left",
        "content": {
            "message": "Our login system uses cookies so that you don't have to sign in as often.",
            "dismiss": "Got it!",
            "href": "https://www.thejyk.com/intellinote/privacy.html"
        }
        });
        </script>

    </body>

</html>
