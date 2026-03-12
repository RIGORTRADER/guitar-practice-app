"use client";

import { Fragment, useMemo, useState } from "react";
import {
  buildChord,
  CHORD_TYPE_DEFINITIONS,
  type ChordLabelMode,
  type ChordShape,
  type ChordShapeNote,
  type ChordTone,
} from "../lib/chords";
import { ROOT_OPTIONS } from "../lib/fretboard";

const CHORD_TONE_THEMES: Record<
  number,
  {
    chipClasses: string;
    dotClasses: string;
    subtleDotClasses: string;
  }
> = {
  0: {
    chipClasses: "border-[#ffbf96] bg-[#3b241b] text-[#ffd9c5]",
    dotClasses:
      "border-[#ffbf96] bg-[linear-gradient(135deg,#c86a43,#9a4528)] text-[#fff6ef]",
    subtleDotClasses: "border-[#724836] bg-[#2b1a14] text-[#f2cdbb]",
  },
  2: {
    chipClasses: "border-[#d4b978] bg-[#3b3119] text-[#f3e0a8]",
    dotClasses:
      "border-[#e4c989] bg-[linear-gradient(135deg,#b99334,#8f6f24)] text-[#fff8e4]",
    subtleDotClasses: "border-[#7f6c35] bg-[#2d2616] text-[#ecda9d]",
  },
  3: {
    chipClasses: "border-[#c999be] bg-[#31202e] text-[#efd7e8]",
    dotClasses:
      "border-[#d4a3c8] bg-[linear-gradient(135deg,#935683,#6c3d60)] text-[#fff0fb]",
    subtleDotClasses: "border-[#795470] bg-[#261925] text-[#e7cde0]",
  },
  4: {
    chipClasses: "border-[#edc285] bg-[#3a2718] text-[#f8e0ba]",
    dotClasses:
      "border-[#edc285] bg-[linear-gradient(135deg,#c8822b,#9b611c)] text-[#fff5e5]",
    subtleDotClasses: "border-[#856241] bg-[#2c1f15] text-[#f0d7b0]",
  },
  5: {
    chipClasses: "border-[#9fb77d] bg-[#24301d] text-[#deebc8]",
    dotClasses:
      "border-[#c3d59b] bg-[linear-gradient(135deg,#7e9550,#65793f)] text-[#f7fde9]",
    subtleDotClasses: "border-[#5b7348] bg-[#1b2418] text-[#d6e5bd]",
  },
  7: {
    chipClasses: "border-[#d8d0ba] bg-[#322b22] text-[#efe8d3]",
    dotClasses:
      "border-[#d8d0ba] bg-[linear-gradient(135deg,#a99a70,#81764f)] text-[#fffdf6]",
    subtleDotClasses: "border-[#7f755c] bg-[#262119] text-[#e7dec6]",
  },
  8: {
    chipClasses: "border-[#d39a7a] bg-[#35211a] text-[#f5d7c8]",
    dotClasses:
      "border-[#e2b494] bg-[linear-gradient(135deg,#b8754d,#91593a)] text-[#fff6ef]",
    subtleDotClasses: "border-[#825844] bg-[#2a1a14] text-[#efcfbf]",
  },
  9: {
    chipClasses: "border-[#95b883] bg-[#24301d] text-[#daeccd]",
    dotClasses:
      "border-[#b9d6a8] bg-[linear-gradient(135deg,#67905a,#4f7145)] text-[#f5fff0]",
    subtleDotClasses: "border-[#5e7b52] bg-[#1a2417] text-[#d5e8c7]",
  },
  10: {
    chipClasses: "border-[#b79fcc] bg-[#2b2332] text-[#e6daef]",
    dotClasses:
      "border-[#bba4d7] bg-[linear-gradient(135deg,#6d5a95,#53436f)] text-[#f8f3ff]",
    subtleDotClasses: "border-[#6a5e7f] bg-[#211c28] text-[#ddd2e6]",
  },
  11: {
    chipClasses: "border-[#c8b571] bg-[#332c1b] text-[#efe2b4]",
    dotClasses:
      "border-[#d9c98e] bg-[linear-gradient(135deg,#a8903a,#826d25)] text-[#fffaea]",
    subtleDotClasses: "border-[#786736] bg-[#282113] text-[#ebdba5]",
  },
};

function getToneTheme(interval: number | null) {
  if (interval === null) {
    return {
      chipClasses: "border-[#5a493d] bg-[#261d18] text-[#d6c3b4]",
      dotClasses: "border-[#5a493d] bg-[#261d18] text-[#d6c3b4]",
      subtleDotClasses: "border-[#4d3f35] bg-[#1d1713] text-[#bda99a]",
    };
  }

  return CHORD_TONE_THEMES[interval] ?? CHORD_TONE_THEMES[7];
}

function getDisplayedLabel(note: ChordShapeNote, labelMode: ChordLabelMode) {
  if (note.isMuted) {
    return "x";
  }

  if (labelMode === "notes") {
    return note.noteName ?? "";
  }

  return note.degreeLabel ?? "";
}

function ToneChip({
  tone,
  primaryLabel,
  secondaryLabel,
}: {
  tone: ChordTone;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  const theme = getToneTheme(tone.interval);

  return (
    <div className={`rounded-2xl border px-3 py-2 text-sm ${theme.chipClasses}`}>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{primaryLabel}</span>
        <span className="text-xs opacity-75">{secondaryLabel}</span>
      </div>
    </div>
  );
}

function OpenStringMarker({
  note,
  labelMode,
}: {
  note: ChordShapeNote;
  labelMode: ChordLabelMode;
}) {
  if (note.isMuted) {
    return <span className="text-sm font-semibold text-[#8d7666]">x</span>;
  }

  if (note.fret !== 0) {
    return <span className="text-xs text-[#6f6055]">•</span>;
  }

  const theme = getToneTheme(note.interval);

  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-semibold shadow-[0_8px_18px_rgba(0,0,0,0.28)] ${theme.dotClasses}`}
    >
      {getDisplayedLabel(note, labelMode)}
    </span>
  );
}

function ChordShapeDiagram({
  shape,
  labelMode,
  isPrimary,
}: {
  shape: ChordShape;
  labelMode: ChordLabelMode;
  isPrimary: boolean;
}) {
  const frets = Array.from(
    { length: shape.fretCount },
    (_, index) => shape.startFret + index
  );
  const notes = [...shape.notes].reverse();
  const nutLabel = shape.startFret === 1 ? "Nut" : `${shape.startFret}fr`;

  return (
    <div className="app-tool-panel rounded-[1.5rem] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="app-tool-text text-lg font-semibold">{shape.label}</h3>
            {isPrimary ? (
              <span className="rounded-full border border-[#7b5b44] bg-[#362117] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#f0cdb5]">
                Suggested start
              </span>
            ) : null}
          </div>
          <p className="app-tool-text-muted mt-2 text-sm leading-6">
            {shape.description}
          </p>
        </div>
        <span className="rounded-full border border-[#4a3b31] bg-[#1c1613] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#c6b3a5]">
          {nutLabel}
        </span>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-[#2c221c] bg-[linear-gradient(180deg,#0f0c0a,#16110e)] p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[430px]">
            <div
              className="grid items-center gap-y-2"
              style={{
                gridTemplateColumns:
                  "34px repeat(6, minmax(48px, 1fr))",
              }}
            >
              <div />
              {notes.map((note) => (
                <div
                  key={`label-${shape.id}-${note.stringId}`}
                  className="text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b7b70]"
                >
                  {note.stringLabel}
                </div>
              ))}

              <div />
              {notes.map((note) => (
                <div
                  key={`open-${shape.id}-${note.stringId}`}
                  className="flex h-9 items-center justify-center"
                >
                  <OpenStringMarker note={note} labelMode={labelMode} />
                </div>
              ))}

              {frets.map((fret) => (
                <Fragment key={`${shape.id}-${fret}`}>
                  <div className="flex h-14 items-center justify-center text-xs font-medium text-[#867568]">
                    {fret}
                  </div>
                  {notes.map((note) => {
                    const showNote = note.fret === fret;
                    const theme = getToneTheme(note.interval);

                    return (
                      <div
                        key={`${shape.id}-${note.stringId}-${fret}`}
                        className={`relative flex h-14 items-center justify-center border-l border-t border-[#44352c] ${
                          note.stringId === notes.at(-1)?.stringId
                            ? "border-r"
                            : ""
                        } ${fret === frets.at(-1) ? "border-b" : ""}`}
                      >
                        {showNote ? (
                          <span
                            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[10px] font-semibold shadow-[0_10px_22px_rgba(0,0,0,0.24)] ${
                              isPrimary
                                ? theme.dotClasses
                                : theme.subtleDotClasses
                            }`}
                          >
                            {getDisplayedLabel(note, labelMode)}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChordFinder() {
  const [rootId, setRootId] = useState("c");
  const [chordTypeId, setChordTypeId] = useState("major");
  const [labelMode, setLabelMode] = useState<ChordLabelMode>("degrees");

  const chord = useMemo(() => buildChord(rootId, chordTypeId), [rootId, chordTypeId]);
  const orderedShapes = useMemo(() => {
    return [...chord.shapes].sort(
      (left, right) =>
        left.startFret - right.startFret ||
        Number(right.recommended) - Number(left.recommended)
    );
  }, [chord.shapes]);

  return (
    <section className="app-tool-shell rounded-[2rem] p-5 sm:p-6">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="app-tool-text-muted text-[11px] uppercase tracking-[0.2em]">
                Tool
              </p>
              <span className="rounded-full border border-[#4b3a2f] bg-[#261914] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f1cfb7]">
                Voicings
              </span>
            </div>
            <h2 className="app-tool-text mt-2 text-3xl font-semibold tracking-tight">
              Chord finder
            </h2>
            <p className="app-tool-text-muted mt-2 max-w-2xl text-sm leading-6">
              Bir kök ve chord tipi seç. Tonları, formülü ve çalınabilir gitar
              şekillerini aynı yerde gör.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-[#6f4f3b] bg-[#2e2018] px-3 py-1.5 text-[#f3d1b7]">
              {chord.chordName}
            </span>
            <span className="rounded-full border border-[#44574d] bg-[#20332c] px-3 py-1.5 text-[#cae2d7]">
              Standard tuning
            </span>
            <span className="rounded-full border border-[#5b4960] bg-[#2b222f] px-3 py-1.5 text-[#d7c4de]">
              {orderedShapes.length} shape
            </span>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="app-tool-panel rounded-[1.5rem] p-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[0.8fr_1.2fr_auto]">
              <label className="block">
                <span className="app-tool-text-muted text-xs uppercase tracking-[0.18em]">
                  Root
                </span>
                <select
                  value={rootId}
                  onChange={(event) => setRootId(event.target.value)}
                  className="app-tool-input mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
                >
                  {ROOT_OPTIONS.map((root) => (
                    <option key={root.id} value={root.id}>
                      {root.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="app-tool-text-muted text-xs uppercase tracking-[0.18em]">
                  Chord type
                </span>
                <select
                  value={chordTypeId}
                  onChange={(event) => setChordTypeId(event.target.value)}
                  className="app-tool-input mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
                >
                  {CHORD_TYPE_DEFINITIONS.map((chordType) => (
                    <option key={chordType.id} value={chordType.id}>
                      {chordType.label}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="app-tool-text-muted text-xs uppercase tracking-[0.18em]">
                  Labels
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLabelMode("degrees")}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      labelMode === "degrees"
                        ? "border border-[#8d654e] bg-[linear-gradient(135deg,#8b5a44,#5f3d31)] text-[#fff7f1]"
                        : "app-tool-btn"
                    }`}
                  >
                    Degrees
                  </button>
                  <button
                    type="button"
                    onClick={() => setLabelMode("notes")}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      labelMode === "notes"
                        ? "border border-[#8d654e] bg-[linear-gradient(135deg,#8b5a44,#5f3d31)] text-[#fff7f1]"
                        : "app-tool-btn"
                    }`}
                  >
                    Notes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="app-tool-panel-soft rounded-[1.5rem] p-4">
            <p className="app-tool-text-muted text-xs uppercase tracking-[0.18em]">
              Chord focus
            </p>
            <h3 className="app-tool-text mt-3 text-xl font-semibold">
              {chord.chordName}
            </h3>
            <p className="app-tool-text-muted mt-2 text-sm leading-6">
              {chord.chordType.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {chord.tones.map((tone) => (
                <ToneChip
                  key={`formula-${tone.interval}`}
                  tone={tone}
                  primaryLabel={tone.degreeLabel}
                  secondaryLabel={tone.noteName}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="app-tool-panel rounded-[1.5rem] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="app-tool-text text-base font-semibold">Chord tones</p>
                <p className="app-tool-text-muted mt-1 text-sm">
                  Formula ve notaları birlikte hızlıca tara.
                </p>
              </div>
              <span className="rounded-full border border-[#3f322a] bg-[#181310] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#ab998d]">
                {labelMode === "degrees" ? "Degree labels" : "Note labels"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="app-tool-panel-soft rounded-2xl p-4">
                <p className="app-tool-text-muted text-xs uppercase tracking-[0.16em]">
                  Formula
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chord.tones.map((tone) => (
                    <ToneChip
                      key={`degree-${tone.interval}`}
                      tone={tone}
                      primaryLabel={tone.degreeLabel}
                      secondaryLabel={tone.noteName}
                    />
                  ))}
                </div>
              </div>

              <div className="app-tool-panel-soft rounded-2xl p-4">
                <p className="app-tool-text-muted text-xs uppercase tracking-[0.16em]">
                  Note names
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chord.tones.map((tone) => (
                    <ToneChip
                      key={`note-${tone.interval}`}
                      tone={tone}
                      primaryLabel={tone.noteName}
                      secondaryLabel={tone.degreeLabel}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="app-tool-panel-soft rounded-[1.5rem] p-4">
            <p className="app-tool-text-muted text-xs uppercase tracking-[0.18em]">
              Practice angle
            </p>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-[#342822] bg-[#181310] px-4 py-3">
                <p className="app-tool-text text-sm font-medium">
                  Önce en yakın shape ile başla
                </p>
                <p className="app-tool-text-muted mt-1 text-sm leading-6">
                  İlk kart daha düşük pozisyondaki shape’i öne çıkarır. Sonra
                  aynı chord’u diğer bölgede bağla.
                </p>
              </div>
              <div className="rounded-2xl border border-[#342822] bg-[#181310] px-4 py-3">
                <p className="app-tool-text text-sm font-medium">
                  Tonları ayrı duy
                </p>
                <p className="app-tool-text-muted mt-1 text-sm leading-6">
                  Shape’i blok halinde ezberlemek yerine kök, üçlü ve beşliyi
                  tek tek görüp çalmayı dene.
                </p>
              </div>
              <div className="rounded-2xl border border-[#342822] bg-[#181310] px-4 py-3">
                <p className="app-tool-text text-sm font-medium">Coming later</p>
                <p className="app-tool-text-muted mt-1 text-sm leading-6">
                  İnversions, string-set voicings ve comping bağlantıları
                  sonraki adımda gelecek.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {orderedShapes.map((shape, index) => (
            <ChordShapeDiagram
              key={shape.id}
              shape={shape}
              labelMode={labelMode}
              isPrimary={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
