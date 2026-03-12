import assert from "node:assert/strict";
import test from "node:test";
import { buildChord, CHORD_TYPE_DEFINITIONS } from "./chords";

test("builds chord tones for a major triad", () => {
  const chord = buildChord("c", "major");

  assert.equal(chord.chordName, "C Major");
  assert.deepEqual(
    chord.tones.map((tone) => tone.degreeLabel),
    ["1", "3", "5"]
  );
  assert.deepEqual(
    chord.tones.map((tone) => tone.noteName),
    ["C", "E", "G"]
  );
});

test("uses flat note naming for flat-oriented roots", () => {
  const chord = buildChord("b-flat", "7");

  assert.equal(chord.chordName, "A#/Bb 7");
  assert.deepEqual(
    chord.tones.map((tone) => tone.noteName),
    ["Bb", "D", "F", "Ab"]
  );
});

test("builds practical chord shapes with interval metadata", () => {
  const chord = buildChord("a", "m7");
  const firstShape = chord.shapes[0];
  const lowEString = firstShape.notes.find((note) => note.stringId === "string-6");
  const gString = firstShape.notes.find((note) => note.stringId === "string-3");

  assert.ok(firstShape);
  assert.equal(firstShape.startFret, 5);
  assert.equal(firstShape.fretCount, 4);
  assert.equal(lowEString?.fret, 5);
  assert.equal(lowEString?.noteName, "A");
  assert.equal(lowEString?.degreeLabel, "1");
  assert.equal(lowEString?.interval, 0);
  assert.equal(gString?.noteName, "C");
  assert.equal(gString?.degreeLabel, "b3");
});

test("falls back to the default chord definition for invalid ids", () => {
  const chord = buildChord("unknown-root", "unknown-type");

  assert.equal(chord.root.id, "c");
  assert.equal(chord.chordType.id, CHORD_TYPE_DEFINITIONS[0].id);
});
