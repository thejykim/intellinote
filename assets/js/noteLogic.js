// assignNote() saves the currently selected note
let currentNote ="";
function assignNote() {
     let form = document.getElementById("form");
     currentNote = form.elements["note"].value;
}
//default note length (change to match documentation)
noteLen = 1;
noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: 2rem;" >';
// parseNoteLen() finds location based on id (string), sets noteLen to correct length for
// onToggleNote()
function parseNoteLen() {
  let lengths = ["eighthNote", "quarterNote", "halfNote", "wholeNote"];
  var lenArrLoc = lengths.indexOf(currentNote);
  // add correct lengths based on api documentation
  switch(lenArrLoc){
    case 0:
       noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: 2rem;" >';
       noteLen = 8;
       break;
    case 1:
       noteIcon = '<img src = "assets/img/quarterNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: 2rem;" >';
       noteLen = 16;
       break;
    case 2:
       noteIcon = '<img src = "assets/img/halfNote.png" style = "display: block; left : 25%; bottom: 0; position: absolute; height: 2rem; width: .75rem;" >';
       noteLen = 32;
       break;
    case 3:
       noteIcon = '<img src = "assets/img/wholeNote.png" style = "display: block; left : 25%; position: absolute; height: .588rem; width: 1rem;" >';
       noteLen = 64;
       break;
  }
}
