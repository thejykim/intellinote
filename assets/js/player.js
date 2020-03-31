var synth = new Tone.Synth().toMaster();

function playNote() {
    synth.triggerAttackRelease('C4', '8n');
}