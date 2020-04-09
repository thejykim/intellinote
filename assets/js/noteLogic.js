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
noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: 2rem;" >';
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
    noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: 2rem;" >';
    noteLen = 8;
}

function setQuarter() {
    noteIcon = '<img src = "assets/img/quarterNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: 2rem;" >';
    noteLen = 4;
}

function setHalf() {
    noteIcon = '<img src = "assets/img/halfNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: .75rem;" >';
    noteLen = 2;
}

function setWhole() {
    noteIcon = '<img src = "assets/img/wholeNote.png" style = "display: block; left : 25%; position: absolute; height: .588rem; width: 1rem;" >';
    noteLen = 1;
}
