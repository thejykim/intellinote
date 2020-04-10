// import {currentNoteLength} from "./noteLogic.js";

// document elements
const removeButton = document.getElementById('removeButton');

// number of notes generated per row
const numberOfNotes = 32;
// number of notes generated per column
const numberOfRows = 13;

let accidentalArray = new Array();
let trebleAccidentals = new Array();
let bassAccidentals = new Array();
let trebleData = [];
let bassData = [];
let newLine = 0;
const numOfRows = 13;
let beatsPerMeas = numberOfNotes / 4;
// enum for clef

const clefEnum = {
	TREBLE: 'treble',
	BASS: 'bass'
}

for (var i = 0; i < 13; i++) {
	trebleAccidentals.push((new Array(32).fill("")));
	bassAccidentals.push((new Array(32).fill("")));
}

function toggleNote(noteElement){
	divElement = noteElement.firstChild;
	noteLoc = parseNoteLoc(noteElement);
	parseNoteLen();
	console.log(trebleData);
	if (divElement.innerHTML === '') {
		// put in element
		//doesnt work
		// divElement.setAttribute('style', 'left: 0;top: 20%;right: 0;border-top: 1px solid;');
		divElement.innerHTML = noteIcon;


		// set length to appropriate length
		if(noteLoc[0] === "treble") {
			trebleData[noteLoc[1]][noteLoc[2]].noteLength = noteLen;
			// trebleData[noteLoc[1]][noteLoc[2]].noteAccidental = accidental;
			// console.log(trebleData[noteLoc[1]][noteLoc[2]].noteLength);
			trebleAccidentals[noteLoc[1]][noteLoc[2]] = accidental;

		} else {
			bassData[noteLoc[1]][noteLoc[2]].noteLength = noteLen;
			// bassData[noteLoc[1]][noteLoc[2]].noteAccidental = accidental;
			bassAccidentals[noteLoc[1]][noteLoc[2]] = accidental;
		}

	} else {
		// empty element
		divElement.innerHTML = '';

		// reset note length
		if(noteLoc[0] === 'treble') {
			trebleData[noteLoc[1]][noteLoc[2]].noteLength = 0;
			trebleAccidentals[noteLoc[1]][noteLoc[2]] = "";
		} else {
			bassData[noteLoc[1]][noteLoc[2]].noteLength = 0;
			bassAccidentals[noteLoc[1]][noteLoc[2]] = "";
		}
	}
}

//turns id into array with clef, row location, and column location
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

	for (let i = 0; i < numOfRows; i++) {
		let row = document.createElement('tr');
		if (line) {
			if(i>1 && i<12){
				row.setAttribute('class', 'line');
			}
		}
		rowArray =[];
		// populate row with notes
		for (let j = 0; j < numberOfNotes; j++) {
			// create note element
			let noteElement = document.createElement('td');
			noteElement.setAttribute('class', 'note');

			if (((j+1) % 8) == 0 && (i>1 && i<11)) {
				noteElement.setAttribute('class', 'note-border')
			}

			// populate note element
			if (clef == clefEnum.TREBLE) {
				noteElement.setAttribute('id', `treble.${i}.${j+(newLine *numberOfNotes)}`);
			} else {
				noteElement.setAttribute('id', `bass.${i}.${j+(newLine*numberOfNotes)}`);
			}


			// push to row array
			if(newLine == 0){
				rowArray.push({id : noteElement.getAttribute('id'), 'note' : i, noteLength : 0});
			}
			else if(clef == clefEnum.TREBLE){
				trebleData[i].push({id : noteElement.getAttribute('id'), 'note' : i, noteLength : 0});
			}
			else{
				bassData[i].push({id : noteElement.getAttribute('id'), 'note' : i, noteLength : 0});
			}
			// console.log(noteElement.getAttribute('id'));

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
		if(newLine == 0){
			if (clef == clefEnum.TREBLE) {
					trebleData.push(rowArray);
			} else {
					bassData.push(rowArray);
			}
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
	// makes new line have different id
	newLine++;

	// create treble div
	let trebleDiv = document.createElement('div');
	trebleDiv.setAttribute('class', 'columns fade-in');
	trebleDiv.setAttribute('id', `trebleDiv-${newLine+1}`);
	trebleDiv.innerHTML = `
		<div class="column is-2">
			<img src="assets/img/treble-clef.png" style="height:4.5rem;float:right;position:relative;top:1rem">
		</div>
		<div class="column is-10">
			<table class="sheet" id="treble-sheet-${newLine+1}">
			</table>
		</div>
	`

	// create bass div
	let bassDiv = document.createElement('div');
	bassDiv.setAttribute('class', 'columns fade-in');
	bassDiv.setAttribute('id', `bassDiv-${newLine+1}`);
	bassDiv.innerHTML = `
		<div class="column is-2">
			<img src="assets/img/bass-clef.png" style="height:2.5rem;float:right;position:relative;top:1rem">
		</div>
		<div class="column is-10">
			<table class="sheet" id="bass-sheet-${newLine+1}">
			</table>
		</div>
	`

	// append both
	let sheetRowElement = document.getElementById('sheet-rows');
	sheetRowElement.appendChild(trebleDiv);
	sheetRowElement.appendChild(bassDiv);

	// generate sheet music for new divs
	generateSheet(clefEnum.TREBLE, `treble-sheet-${newLine+1}`);
	generateSheet(clefEnum.BASS, `bass-sheet-${newLine+1}`);

	// enable remove rows button
	removeButton.removeAttribute("disabled");
}

function removeRow() {
	if (newLine == 0) {
		return;
	} else {
		// remove divs
		let trebleDiv = document.getElementById(`trebleDiv-${newLine+1}`);
		let bassDiv = document.getElementById(`bassDiv-${newLine+1}`);

		trebleDiv.parentNode.removeChild(trebleDiv);
		bassDiv.parentNode.removeChild(bassDiv);

		// remove array rows
		for (let j = (newLine)*numberOfNotes; j < (newLine+1)*numberOfNotes; j++) {
			for (let i = 0; i < 13; i++) {
				trebleData[i].pop();
				bassData[i].pop();
			}
		}

		newLine--;
		if (newLine == 0) {
			// disable button if the last removable row is being removed
			removeButton.setAttribute("disabled", "true");
		}
	}
}

function clearSheet() {
    // just iterate through and toggle if length isn't 0
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < (numberOfNotes * (newLine + 1)); j++) {
            if (trebleData[i][j].noteLength != 0) {
                toggleNote(document.getElementById(trebleData[i][j].id));
            }
            if (bassData[i][j].noteLength != 0) {
                toggleNote(document.getElementById(bassData[i][j].id));
            }
        }
    }
}
