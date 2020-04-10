// assignNote() saves the currently selected note
let currentNoteLength = "";
let accidental = "";
function assignNote() {
    let form = document.getElementById("lengthForm");
    currentNoteLength = form.elements["note"].value;

    let accidentalForm = document.getElementById("accidentalForm");
    accidental = accidentalForm.elements["accidental"].value;
}
//default note length (change to match documentation)
noteLen = 8;
noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
// parseNoteLen() finds location based on id (string), sets noteLen to correct length for
// onToggleNote()
function parseNoteLen() {
    let lengths = ["eighthNote", "quarterNote", "halfNote", "wholeNote"];
    var lenArrLoc = lengths.indexOf(currentNoteLength);
    // add correct lengths based on api documentation
    switch (lenArrLoc) {
        case 0:
            setEighth();
            break;
        case 1:
            setQuarter();
            break;
        case 2:
            setHalf();
            break;
        case 3:
            setWhole();
            break;
    }
}

function setEighth() {
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
    noteLen = 8;
}

function setQuarter() {
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
    noteLen = 4;
}

function setHalf() {
    switch (accidental) {
        case "":
            noteIcon = '<img src = "assets/img/halfNote.png" style = "display: block; right: 12%; bottom: -10%; position: absolute; height: 2rem; vertical-align: middle;" >';
            break;
        case "#":
            noteIcon = '<img src = "assets/img/halfNoteSharp.png" style = "display: block; right: 18%; bottom: -145%; position: absolute; height: 2.55rem; vertical-align: middle;" >';
            break;
        case "b":
            noteIcon = '<img src = "assets/img/halfNoteFlat.png" style = "display: block; right: 18%; bottom: -110%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
            break;
    }
    noteLen = 2;
}

function setWhole() {
    switch (accidental) {
        case "":
            noteIcon = '<img src = "assets/img/wholeNote.png" style = "display: block; left: 10%; bottom: -15%; position: absolute; width: 0.7rem; height: 2rem; vertical-align: middle;" >';
            break;
        case "#":
            noteIcon = '<img src = "assets/img/wholeNoteSharp.png" style = "display: block; right: 25%; bottom: -145%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
            break;
        case "b":
            noteIcon = '<img src = "assets/img/wholeNoteFlat.png" style = "display: block; right: 24%; bottom: -110%; position: absolute; height: 2.5rem; vertical-align: middle;" >';
            break;
    }
    noteLen = 1;
}
