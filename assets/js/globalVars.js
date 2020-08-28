/* Cleaned */

// --createSong.js
const titleField = document.getElementById("title");
const createDialog = document.getElementById("createDialog");

// --displaySongs.js
const createButtonDiv = document.getElementById("createButton");
const recentSongsDiv = document.getElementById("recentSongs");
const allSongsDiv = document.getElementById("allSongs");
const deleteProfileDiv = document.getElementById("deleteProfileDiv");

let recentThreshold = 1000 * 60 * 60 * 24 * 7;

// --export.js
const exportBox = document.getElementById('exportBox');
const textResetDelay = 2000;
const sheetParse = ',';
const rowParse = ";";
const noteParse = "-";
const noteObjectParse = ".";
const importButton = document.getElementById("import");
const exportButton = document.getElementById("export");

// --notification.js
let dismissInterval;
let dismissCount;
let notificationCount = 0;

// --generate-sheet.js

// document elements
const removeButton = document.getElementById('removeButton');
const clearButton = document.getElementById('clearButton');
// number of notes generated per row
let numberOfNotes = 32;
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

let timeSigHTML = '<img src="assets/img/4-4.png" style="height:3.5rem;float:right;position:relative;top:1.5rem">';
let timeSigIndicator = 0;

// --instructions.js
var slideIndex = 1;

// --login.js
let isVisitor = false;
let email = null;
let oauthUsername;
let globalSongID;

let isFirstSignIn = false;
let isIndex = false;
let isProfile = false;

// --noteLogic.js
let currentNoteLength = "";
let accidental = "";

// default note length (change to match documentation)
invNoteLen = 8;
noteIcon = '<img src = "assets/img/eighthNote.png" style = "display: block; bottom: 0; position: absolute; height: 2rem; vertical-align: middle;" >';

// --parseTextFromServer.js
const fieldParse = "|SEPARATOR|";
const songParse = "?";
const dateSep = "-";

const totalSongsElement = document.getElementById("totalSongs");

let serverEachSong = []; // After first split; gives information for each song (each song is string)
let serverObjects = []; // Array of song objects

// --player.js

// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const tempoBox = document.getElementById('tempoBox');
const tempoSlider = document.getElementById('tempoSlider');

let timeBetweenNotes = 2000;
let isPlaying = false;
let bpm = 120;
let maxTempo = 240;
let minTempo = 30;

// interval variable
let interval;

let notes = [];

let trebleNoteKey = ["A5", "G5", "F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
let bassNoteKey = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C2", "B2", "A2", "G2", "F2", "E2"];

// --saveLogic.js
let saveButton = document.getElementById("saveButton");
let cloneButton = document.getElementById("cloneButton");

// --userMap.js
const userMapDupError = "Already registered, or username taken";
const userNotFoundError = "User not found!";
const usernameLengthLimit = 25;
const registerDialog = document.getElementById("registerDialog");

// --deleteSong.js
let deleteButton = document.getElementById("startDelete");
var profileDeleteButton;

// explorePage.js
let exploreDiv = document.getElementById('explore');
