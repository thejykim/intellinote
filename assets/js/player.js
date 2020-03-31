var synth = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();
var synth3 = new Tone.Synth().toMaster();

function playNote() {
    synth.triggerAttackRelease('C4', '4n');
    synth2.triggerAttackRelease('A4', '4n');
    synth3.triggerAttackRelease('E4', '4n');
}