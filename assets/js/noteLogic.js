// assignNote() saves the currently selected note
let currentNote ="";
function assignNote() {
     let form = document.getElementById("form");
     currentNote = form.elements["note"].value;
}
//default note length (change to match documentation)
noteLen = 1;
// parseNoteLen() finds location based on id (string), sets noteLen to correct length for
// onToggleNote()
function parseNoteLen() {
  let lengths = ["eighthNote", "quarterNote", "halfNote", "wholeNote"];
  var lenArrLoc = lengths.indexOf(currentNote);
  // add correct lengths based on api documentation
  switch(lenArrLoc){
    case 0:
       noteLen = 8;
       break;
    case 1:
       noteLen = 16;
       break;
    case 2:
       noteLen = 32;
       break;
    case 3:
       noteLen = 64;
       break;
  }
}
