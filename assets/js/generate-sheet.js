// number of notes generated per row
const numberOfNotes = 10;
let trebleData = [];
let bassData = [];

window.onload = function() {
	generateSheet('treble-sheet');
	generateSheet('bass-sheet');
}

// function Note(noteElement, row, column){
// 	this.id = noteElement.getAttribute('id');
// 	this.note = column;
// 	//this.length = 0; //need to get radio button input for this
// 	this.location = row;
// }

function toggleNote(noteElement){
	divElement = noteElement.firstChild;

	if (divElement.innerHTML === '') {
		divElement.innerHTML = '<i class="fas fa-circle"></i>';

		//doesnt work but trebleData array is populated and the getAttribute function works
		// let arrIndex = trebleData.find(element => element.id == noteElement.getAttribute('id'));
		// trebleData[arrIndex].noteLength = 1; //get length from radio buttons

		noteLoc = parseNoteLoc(divElement);
		trebleData[noteLoc[1]][noteLoc[2]].noteLength = 1;
		console.log(trebleData[noteLoc[1]][noteLoc[2]]);

		// console.log(arrIndex);
	} else {
		divElement.innerHTML = '';
	}
}

function parseNoteLoc(noteElement){
	var noteId = noteElement.getAttribute('id');
	noteLoc = noteId.split('.');
	return noteLoc;
}

function generateSheet(id) {
	// find the sheet table element from DOM
	let sheetTableElement = document.getElementById(id);
	// boolean to figure out if current row of notes is a line or whitespace
	let line = true;

	for (let i = 0; i < 9; i++) {
		let row = document.createElement('tr');
		if (line) {
			row.setAttribute('class', 'line');
		}
		rowArray =[];
		// populate row with notes
		for (let j = 0; j < numberOfNotes; j++) {
			let noteElement = document.createElement('td');
			noteElement.setAttribute('class', 'note');

			if (id === 'treble-sheet') {
				noteElement.setAttribute('id', `treble.${i}.${j}`);
				rowArray.push({id : noteElement.getAttribute('id'), 'note' : i, noteLength : 0});
				// console.log(trebleData.length);
			} else {
				noteElement.setAttribute('id', `bass.${i}.${j}`);
			}

			// create a div to contain the note content (toggled or not) -- necessary to prevent resizing
			let divElement = document.createElement('div');
			noteElement.appendChild(divElement);

			// adds click listener,
			noteElement.addEventListener("click", function(){
				toggleNote(noteElement);
			}, true);

			// append noteElement to row
			row.appendChild(noteElement);

		}
		trebleData.push(rowArray);

		// append row to sheet table
		sheetTableElement.appendChild(row);

		// change line boolean
		if (line) {
			line = false;
		} else {
			line = true;
		}
	}
}
