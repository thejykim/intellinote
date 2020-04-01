// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const synth = new Tone.Synth().toMaster();
synth.oscillator.type = "sine";

let notes = [[null, null, null, "D4"], [["F4", null, "F4"], "F4"], [["F4", "G4", "G4"], ["G4", null, null]], [null, null, null, "D4"], [["F4", null, "F4"], "F4"], [["F4", "G4", "G4"], ["G4", null, null]]];

let synthTimeline = new Tone.Sequence(function(time, note){
        synth.triggerAttackRelease(note, "2hz", time);
    },
    notes,
    "1n"
);

function startPlaying() {
    // disable/enable buttons
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');

    // start timelines
    synthTimeline.start();
    Tone.Transport.start();
}

function stopPlaying() {
    // disable/enable buttons
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'true');

    // stop transport
    Tone.Transport.stop();
}