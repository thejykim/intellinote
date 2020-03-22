// number of notes generated per row
const numberOfNotes = 10;

window.onload = function() {
	generateSheet('treble-sheet');
	generateSheet('bass-sheet');
}

function toggleNote(noteElement){
	// get the div element within each note
	let divElement = noteElement.firstChild;

	if (divElement.innerHTML === '') {
		divElement.innerHTML = '<i class="fas fa-circle"></i>';
	} else {
		divElement.innerHTML = '';
	}
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

		// populate row with notes
		for (let j = 0; j < numberOfNotes; j++) {
			let noteElement = document.createElement('td');
			noteElement.setAttribute('class', 'note');
			noteElement.setAttribute('id', `${i+1}-${j+1}`);

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
