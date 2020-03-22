// number of notes generated per row
const numberOfNotes = 10;

window.onload = function() {
	generateSheet('treble-sheet');
	generateSheet('bass-sheet');
}

function toggleNote(noteElement){
	if (noteElement.innerText === "") {
		noteElement.innerText = "o";
	} else {
		noteElement.innerText === "";
	}

	// debug purposes to see when this function runs
	console.log("fired");
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
			//adds click listener,
			noteElement.addEventListener("click", function(){
				toggleNote(noteElement);
			}, true);
			noteElement.innerText = "";
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
