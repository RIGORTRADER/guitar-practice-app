import assert from "node:assert/strict";
import test from "node:test";
import {
  buildFretboardScaleMap,
  getDegreeLabel,
  getNoteName,
  getScalePositionOptions,
  SCALE_DEFINITIONS,
} from "./fretboard";

test("maps a 17-fret major scale across all six strings by default", () => {
  const fretboard = buildFretboardScaleMap("c", "major");

  assert.equal(fretboard.frets[0], 0);
  assert.equal(fretboard.frets.at(-1), 17);
  assert.equal(fretboard.strings.length, 6);

  const highEOpen = fretboard.strings[0].cells[0];
  const bStringFirstFret = fretboard.strings[1].cells[1];

  assert.equal(highEOpen.noteName, "E");
  assert.equal(highEOpen.degreeLabel, "3");
  assert.equal(highEOpen.displayState, "focus");

  assert.equal(bStringFirstFret.noteName, "C");
  assert.equal(bStringFirstFret.degreeLabel, "1");
  assert.equal(bStringFirstFret.isRoot, true);
  assert.equal(bStringFirstFret.isTriadTone, true);
});

test("uses flat note names for flat-oriented roots", () => {
  const fretboard = buildFretboardScaleMap("e-flat", "major");
  const aStringFirstFret = fretboard.strings[4].cells[1];
  const lowEStringEleventhFret = fretboard.strings[5].cells[11];

  assert.equal(aStringFirstFret.noteName, "Bb");
  assert.equal(aStringFirstFret.degreeLabel, "5");
  assert.equal(lowEStringEleventhFret.noteName, "Eb");
  assert.equal(lowEStringEleventhFret.isRoot, true);
});

test("exposes degree and note helpers for altered tones", () => {
  const fretboard = buildFretboardScaleMap("a", "blues");
  const dSharpOnBString = fretboard.strings[1].cells[4];

  assert.equal(getDegreeLabel(6), "#4/b5");
  assert.equal(getNoteName(10, "flat"), "Bb");
  assert.equal(dSharpOnBString.noteName, "D#");
  assert.equal(dSharpOnBString.degreeLabel, "#4/b5");
  assert.equal(dSharpOnBString.degreeInterval, 6);
});

test("provides box options for supported scale families", () => {
  const positions = getScalePositionOptions("a", "minor-pentatonic");

  assert.equal(positions[0].id, "full-neck");
  assert.ok(positions.some((position) => position.id === "box-1"));
  assert.ok(positions.some((position) => position.id === "box-5"));
});

test("limits the rendered fret range when a box view is selected", () => {
  const fretboard = buildFretboardScaleMap("a", "minor-pentatonic", {
    viewMode: "box",
    positionId: "box-1",
  });

  assert.equal(fretboard.position.id, "box-1");
  assert.equal(fretboard.frets[0], 5);
  assert.equal(fretboard.frets.at(-1), 8);
});

test("shows linked notes as secondary states when position linking is enabled", () => {
  const fretboard = buildFretboardScaleMap("a", "minor-pentatonic", {
    viewMode: "box",
    positionId: "box-2",
    positionLinking: true,
  });

  const linkedStateExists = fretboard.strings.some((string) =>
    string.cells.some((cell) => cell.displayState === "linked")
  );

  assert.equal(fretboard.position.id, "box-2");
  assert.equal(fretboard.frets[0], 5);
  assert.equal(fretboard.frets.at(-1), 13);
  assert.equal(linkedStateExists, true);
});

test("filters to a single string in single-string mode", () => {
  const fretboard = buildFretboardScaleMap("g", "major", {
    viewMode: "single-string",
    singleStringId: "string-3",
  });

  assert.equal(fretboard.strings.length, 1);
  assert.equal(fretboard.strings[0].id, "string-3");
  assert.ok(fretboard.strings[0].cells.some((cell) => cell.isRoot));
});

test("includes the expanded mode and scale library", () => {
  const scaleIds = SCALE_DEFINITIONS.map((scale) => scale.id);

  assert.ok(scaleIds.includes("phrygian"));
  assert.ok(scaleIds.includes("lydian"));
  assert.ok(scaleIds.includes("locrian"));
  assert.ok(scaleIds.includes("harmonic-minor"));
  assert.ok(scaleIds.includes("melodic-minor"));
  assert.ok(scaleIds.includes("phrygian-dominant"));
  assert.ok(scaleIds.includes("whole-tone"));
  assert.ok(scaleIds.includes("diminished"));
});
