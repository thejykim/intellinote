function changeTimeSig(topNum){
  //changes variables corresponding to number of notes in measure and row
	numberOfNotes = topNum * 2 * 4;
	beatsPerMeas = numberOfNotes/4;
	// console.log(beatsPerMeas);
  //default image is 4/4, switch changes it to correct img
  let timeSigImg = "assets/img/4-4.png";
  switch(topNum){
    case 2:
      timeSigImg = "assets/img/2-4.png";
      break;
    case 3:
      timeSigImg = "assets/img/3-4.png";
      break;
  }
  //adds image to
  var img=document.createElement("img");
  img.src = timeSigImg;
  img.style.height = "3.5rem";
  //because the clef is also float:right, this is set to the left (wrong order)
  img.style.float = "right";

  //doesnt work: error trebleDiv is null
  let t = document.getElementById(`treble-sheet-${newLine+1}`);
  let b = document.getElementById(`bass-sheet-${newLine+1}`);
  let sheetRowElement = document.getElementById('sheet-rows');
  t.parentNode.removeChild(t);
  b.parentNode.removeChild(b);

  // remove array rows
  for (let j = (newLine)*numberOfNotes; j < (newLine+1)*numberOfNotes; j++) {
    for (let i = 0; i < 13; i++) {
      trebleData[i].pop();
      bassData[i].pop();
    }
  }
  timeSigImg = document.getElementById('column-left');
  timeSigImg.appendChild(img);

  generateSheet(clefEnum.TREBLE, 'treble-sheet-1');
  generateSheet(clefEnum.BASS, 'bass-sheet-1');
}
