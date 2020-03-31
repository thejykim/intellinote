// document elements
const removeButton = document.getElementById('removeButton');

// number of notes generated per row
const numberOfNotes = 10;
let trebleData = [];
let bassData = [];

// enum for clef

const clefEnum = {
	TREBLE: 'treble',
	BASS: 'bass'
}

window.onload = function() {
	generateSheet(clefEnum.TREBLE, 'treble-sheet-1');
	generateSheet(clefEnum.BASS, 'bass-sheet-1');
}

function toggleNote(noteElement){
	divElement = noteElement.firstChild;
	noteLoc = parseNoteLoc(noteElement);
	if (divElement.innerHTML === '') {
		// put in element
		divElement.innerHTML = '<i class="fas fa-circle"></i>';

		// set length to appropriate length
		if(noteLoc[0] === "treble") {
			trebleData[noteLoc[1]][noteLoc[2]].noteLength = 1;
		} else {
			bassData[noteLoc[1]][noteLoc[2]].noteLength = 1;
		}
	} else {
		// empty element
		divElement.innerHTML = '';

		// reset note length
		if(noteLoc[0] === 'treble') {
			trebleData[noteLoc[1]][noteLoc[2]].noteLength = 0;
		} else {
			bassData[noteLoc[1]][noteLoc[2]].noteLength = 0;
		}
	}

	// TODO: remove this debugging log before merging with master
	console.log(trebleData);
	console.log(bassData);
}

function parseNoteLoc(noteElement){
	var noteId = noteElement.getAttribute('id');
	noteLoc = noteId.split('.');
	return noteLoc;
}

function generateSheet(clef, id) {
	// find the sheet table element from DOM
	let sheetTableElement = document.getElementById(id);
	// boolean to figure out if current row of notes is a line or whitespace
	let line = true;
	// number of notes already inserted
	let initial = 0;
	if (clef == clefEnum.TREBLE) {
		initial = trebleData.length;
	} else {
		initial = bassData.length;
	}

	for (let i = initial; i < (initial + 9); i++) {
		let row = document.createElement('tr');
		if (line) {
			row.setAttribute('class', 'line');
		}
		rowArray =[];
		// populate row with notes
		for (let j = 0; j < numberOfNotes; j++) {
			// create note element
			let noteElement = document.createElement('td');
			noteElement.setAttribute('class', 'note');

			// populate note element
			if (clef == clefEnum.TREBLE) {
				noteElement.setAttribute('id', `treble.${i}.${j}`);
			} else {
				noteElement.setAttribute('id', `bass.${i}.${j}`);
			}

			// push to row array
			rowArray.push({id : noteElement.getAttribute('id'), 'note' : i, noteLength : 0});

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

		// decide which clef array to push to
		if (clef == clefEnum.TREBLE) {
			trebleData.push(rowArray);
		} else {
			bassData.push(rowArray);
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

// function called every time the user clicks a button to add more rows
function addRow() {
	// determine how many rows there already are
	let numRows = trebleData.length / 9;

	// create treble div
	let trebleDiv = document.createElement('div');
	trebleDiv.setAttribute('class', 'columns fade-in');
	trebleDiv.setAttribute('id', `trebleDiv-${numRows+1}`);
	trebleDiv.innerHTML = `
		<div class="column is-2">
			<img src="assets/img/treble-clef.png" style="height:4.5rem;float:right;">
		</div>
		<div class="column is-10">
			<table class="sheet" id="treble-sheet-${numRows+1}">
			</table>
		</div>
	`

	// create bass div
	let bassDiv = document.createElement('div');
	bassDiv.setAttribute('class', 'columns fade-in');
	bassDiv.setAttribute('id', `bassDiv-${numRows+1}`);
	bassDiv.innerHTML = `
		<div class="column is-2">
			<img src="assets/img/bass-clef.png" style="height:2.5rem;float:right">
		</div>
		<div class="column is-10">
			<table class="sheet" id="bass-sheet-${numRows+1}">
			</table>
		</div>
	`

	// append both
	let sheetRowElement = document.getElementById('sheet-rows');
	sheetRowElement.appendChild(trebleDiv);
	sheetRowElement.appendChild(bassDiv);

	// generate sheet music for new divs
	generateSheet(clefEnum.TREBLE, `treble-sheet-${numRows+1}`);
	generateSheet(clefEnum.BASS, `bass-sheet-${numRows+1}`);
	
	// enable remove rows button
	removeButton.removeAttribute("disabled");
}

function removeRow() {
	// get number of rows already in
	let numRows = trebleData.length / 9;
	
	if (numRows == 1) {
		// don't do anything if there's only one row
		return;
	} else if (numRows == 2) {
		// disable button if the last removable row is being removed
		removeButton.setAttribute("disabled", "true");
	}

	// remove divs
	let trebleDiv = document.getElementById(`trebleDiv-${numRows}`);
	let bassDiv = document.getElementById(`bassDiv-${numRows}`);

	trebleDiv.parentNode.removeChild(trebleDiv);
	bassDiv.parentNode.removeChild(bassDiv);

	// remove array rows
	for (let i = 0; i < 9; i++) {
		trebleData.pop();
		bassData.pop();
	}

	// TODO: remove this debugging log before merging with master
	console.log(trebleData);
	console.log(bassData);
}