// assignNote() saves the currently selected note
function assignNote() {
    let form = document.getElementById("lengthForm");
    currentNoteLength = form.elements["note"].value;

    let accidentalForm = document.getElementById("accidentalForm");
    accidental = accidentalForm.elements["accidental"].value;
}

// parseNoteLen() finds location based on id (string), sets noteLen to correct length for
// onToggleNote()
function parseNoteLen(noteLoc) {
    if(noteLoc[1] == 0 || noteLoc[1] == 12) {
      noteIcon = '<img src = "assets/img/eighthNoteLedger.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
    } else {
      noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
    }

    let lengths = ["eighthNote", "quarterNote", "halfNote", "wholeNote"];
    var lenArrLoc = lengths.indexOf(currentNoteLength);
    // add correct lengths based on api documentation
    switch (lenArrLoc) {
        case 0:
            setEighth(noteLoc[1]);
            break;
        case 1:
            setQuarter(noteLoc[1]);
            break;
        case 2:
            setHalf(noteLoc[1]);
            break;
        case 3:
            setWhole(noteLoc[1]);
            break;
    }
}

function setEighth(noteLoc) {
    if (noteLoc == 0 || noteLoc == 12) {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/eighthNoteLedger.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/eighthNoteSharpLedger.png" style = "display: block; right: 15%; bottom: -130%; position: absolute; height: 2.55rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/eighthNoteFlatLedger.png" style = "display: block; right: 15%; bottom: -100%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    } else {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/eighthNoteSharp.png" style = "display: block; right: 15%; bottom: -130%; position: absolute; height: 2.55rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/eighthNoteFlat.png" style = "display: block; right: 15%; bottom: -100%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    }
    noteLen = 8;
}

function setQuarter(noteLoc) {
    if (noteLoc == 0 || noteLoc == 12) {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/quarterNoteLedger.png" style = "display: block; right: 12%; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/quarterNoteSharpLedger.png" style = "display: block; right: 18%; bottom: -120%; position: absolute; height: 2.6rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/quarterNoteFlatLedger.png" style = "display: block; right: 18%; bottom: -95%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    } else {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/quarterNote.png" style = "display: block; right: 12%; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/quarterNoteSharp.png" style = "display: block; right: 18%; bottom: -120%; position: absolute; height: 2.6rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/quarterNoteFlat.png" style = "display: block; right: 18%; bottom: -95%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    }
    noteLen = 4;
}

function setHalf(noteLoc) {
    if (noteLoc == 0 || noteLoc == 12) {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/halfNoteLedger.png" style = "display: block; right: 12%; bottom: -10%; position: absolute; height: 2rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/halfNoteSharpLedger.png" style = "display: block; right: 25%; bottom: -140%; position: absolute; height: 2.55rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/halfNoteFlatLedger.png" style = "display: block; right: 13%; bottom: -110%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    } else {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/halfNote.png" style = "display: block; right: 12%; bottom: -10%; position: absolute; height: 2rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/halfNoteSharp.png" style = "display: block; right: 18%; bottom: -140%; position: absolute; height: 2.55rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/halfNoteFlat.png" style = "display: block; right: 18%; bottom: -110%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    }
    noteLen = 2;
}

function setWhole(noteLoc) {
    if (noteLoc == 0 || noteLoc == 12) {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/wholeNoteLedger.png" style = "display: block; left: 16%; bottom: -60%; position: absolute; width: 1rem; height: 2.1rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/wholeNoteSharpLedger.png" style = "display: block; right: 24%; bottom: -145%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/wholeNoteFlatLedger.png" style = "display: block; right: 23%; bottom: -110%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    } else {
        switch (accidental) {
            case "":
                noteIcon = '<img src = "assets/img/wholeNote.png" style = "display: block; left: 16%; bottom: -15%; position: absolute; width: 0.8rem; height: 2.1rem; vertical-align: middle;" >';
                break;
            case "#":
                noteIcon = '<img src = "assets/img/wholeNoteSharp.png" style = "display: block; right: 24%; bottom: -135%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
            case "b":
                noteIcon = '<img src = "assets/img/wholeNoteFlat.png" style = "display: block; right: 23%; bottom: -100%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
                break;
        }
    }
    noteLen = 1;
}
