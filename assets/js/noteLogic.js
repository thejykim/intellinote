// assignNote() saves the currently selected note
let currentNote = "";
function assignNote() {
    let form = document.getElementById("form");
    currentNote = form.elements["note"].value;
}
//default note length (change to match documentation)
noteLen = 8;
noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
// parseNoteLen() finds location based on id (string), sets noteLen to correct length for
// onToggleNote()
function parseNoteLen() {
    let lengths = ["eighthNote", "quarterNote", "halfNote", "wholeNote"];
    var lenArrLoc = lengths.indexOf(currentNote);
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
    noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
    noteLen = 8;
}

function setQuarter() {
    noteIcon = '<img src = "assets/img/quarterNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
    noteLen = 4;
}

function setHalf() {
    noteIcon = '<img src = "assets/img/halfNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';
    noteLen = 2;
}

function setWhole() {
    noteIcon = '<img src = "assets/img/wholeNote.png" style = "display: block; left : 25%; position: absolute; height: .588rem; width: 1rem;" >';
    noteLen = 1;
}
