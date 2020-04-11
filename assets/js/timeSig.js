function changeTimeSig(topNum){
  //changes variables corresponding to number of notes in measure and row
	numberOfNotes = topNum * 2 * 4;
	beatsPerMeas = numberOfNotes/4;
	// console.log(beatsPerMeas);
  //default image is 4/4, switch changes it to correct img
  switch(topNum){
    case 2:
      timeSigHTML = '<img src="assets/img/2-4.png" style="height:4.5rem;float:right">';
      break;
    case 3:
      timeSigHTML = '<img src="assets/img/3-4.png" style="height:4.5rem;float:right">';
      break;
		case 4:
			timeSigHTML = '<img src="assets/img/4-4.png" style="height:4.5rem;float:right">';
			break;
  }

  //doesnt work: error trebleDiv is null
	while (newLine > 0){
	  let t = document.getElementById(`treble-sheet-${newLine+1}`);
	  let b = document.getElementById(`bass-sheet-${newLine+1}`);
	  t.parentNode.removeChild(t);
	  b.parentNode.removeChild(b);
		newline --;
	}

  // remove array rows
  for (let j = (newLine)*numberOfNotes; j < (newLine+1)*numberOfNotes; j++) {
    for (let i = 0; i < 13; i++) {
      trebleData[i].pop();
      bassData[i].pop();
    }
  }

	// let tTable = document.getElementById('t-col');
	document.getElementById('t-col').innerHTML = '<table class="sheet" id="treble-sheet-1"> </table>';

	// let bTable = document.getElementById('b-col');
	document.getElementById('b-col').innerHTML = '<table class="sheet" id="bass-sheet-1"> </table>';
	generateSheet(clefEnum.TREBLE, 'treble-sheet-1');
	generateSheet(clefEnum.BASS, 'bass-sheet-1');
  // addRow();
}
