import {
  getDegreeLabel,
  getNoteName,
  ROOT_OPTIONS,
  STRING_OPTIONS,
  type RootOption,
} from "./fretboard";

export type ChordLabelMode = "degrees" | "notes";

type RelativeFret = number | "x";

export type ChordShapeTemplate = {
  id: string;
  label: string;
  description: string;
  rootStringId: "string-6" | "string-5";
  frets: [RelativeFret, RelativeFret, RelativeFret, RelativeFret, RelativeFret, RelativeFret];
  recommended?: boolean;
};

export type ChordTypeDefinition = {
  id: string;
  label: string;
  intervals: number[];
  description: string;
  shapes: ChordShapeTemplate[];
};

export type ChordTone = {
  interval: number;
  degreeLabel: string;
  noteName: string;
};

export type ChordShapeNote = {
  stringId: string;
  stringLabel: string;
  fret: number | null;
  isMuted: boolean;
  interval: number | null;
  noteName: string | null;
  degreeLabel: string | null;
  isRoot: boolean;
};

export type ChordShape = {
  id: string;
  label: string;
  description: string;
  rootStringId: "string-6" | "string-5";
  startFret: number;
  fretCount: number;
  notes: ChordShapeNote[];
  recommended: boolean;
};

export type BuiltChord = {
  root: RootOption;
  chordType: ChordTypeDefinition;
  chordName: string;
  tones: ChordTone[];
  shapes: ChordShape[];
};

const STRING_PITCHES = Object.fromEntries(
  STRING_OPTIONS.map((string) => [string.id, string.pitchClass])
) as Record<string, number>;

export const CHORD_TYPE_DEFINITIONS: ChordTypeDefinition[] = [
  {
    id: "major",
    label: "Major",
    intervals: [0, 4, 7],
    description: "Stable and open major sonority.",
    shapes: [
      {
        id: "major-e",
        label: "E-shape barre",
        description: "Full six-string major shape.",
        rootStringId: "string-6",
        frets: [0, 2, 2, 1, 0, 0],
        recommended: true,
      },
      {
        id: "major-a",
        label: "A-shape barre",
        description: "Compact major voicing rooted on string 5.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 2, 2, 0],
      },
    ],
  },
  {
    id: "minor",
    label: "Minor",
    intervals: [0, 3, 7],
    description: "Dark but familiar minor base chord.",
    shapes: [
      {
        id: "minor-e",
        label: "Em-shape barre",
        description: "Standard six-string minor form.",
        rootStringId: "string-6",
        frets: [0, 2, 2, 0, 0, 0],
        recommended: true,
      },
      {
        id: "minor-a",
        label: "Am-shape barre",
        description: "String-5 rooted minor voicing.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 2, 1, 0],
      },
    ],
  },
  {
    id: "7",
    label: "7",
    intervals: [0, 4, 7, 10],
    description: "Dominant color for blues and vamps.",
    shapes: [
      {
        id: "seven-e",
        label: "E7-shape barre",
        description: "Dominant shape on string 6 root.",
        rootStringId: "string-6",
        frets: [0, 2, 0, 1, 0, 0],
        recommended: true,
      },
      {
        id: "seven-a",
        label: "A7-shape",
        description: "Compact dominant grip on string 5 root.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 0, 2, 0],
      },
    ],
  },
  {
    id: "maj7",
    label: "Maj7",
    intervals: [0, 4, 7, 11],
    description: "Smooth major seven color.",
    shapes: [
      {
        id: "maj7-e",
        label: "Emaj7-shape",
        description: "Wide major seven voicing.",
        rootStringId: "string-6",
        frets: [0, 2, 1, 1, 0, 0],
        recommended: true,
      },
      {
        id: "maj7-a",
        label: "Amaj7-shape",
        description: "String-5 rooted maj7 grip.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 1, 2, 0],
      },
    ],
  },
  {
    id: "m7",
    label: "m7",
    intervals: [0, 3, 7, 10],
    description: "Minor seven sound for modal grooves.",
    shapes: [
      {
        id: "m7-e",
        label: "Em7-shape",
        description: "Rooted minor seven on string 6.",
        rootStringId: "string-6",
        frets: [0, 2, 0, 0, 0, 0],
        recommended: true,
      },
      {
        id: "m7-a",
        label: "Am7-shape",
        description: "String-5 rooted minor seven.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 0, 1, 0],
      },
    ],
  },
  {
    id: "sus2",
    label: "sus2",
    intervals: [0, 2, 7],
    description: "Open suspended second color.",
    shapes: [
      {
        id: "sus2-a",
        label: "A-string sus2",
        description: "Useful movable sus2 shape.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 2, 0, 0],
        recommended: true,
      },
    ],
  },
  {
    id: "sus4",
    label: "sus4",
    intervals: [0, 5, 7],
    description: "Suspended fourth tension before release.",
    shapes: [
      {
        id: "sus4-e",
        label: "E-shape sus4",
        description: "Classic suspended grip on string 6 root.",
        rootStringId: "string-6",
        frets: [0, 2, 2, 2, 0, 0],
        recommended: true,
      },
      {
        id: "sus4-a",
        label: "A-shape sus4",
        description: "String-5 rooted sus4 voicing.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 2, 3, 0],
      },
    ],
  },
  {
    id: "dim",
    label: "dim",
    intervals: [0, 3, 6],
    description: "Tight diminished triad tension.",
    shapes: [
      {
        id: "dim-e",
        label: "String-6 diminished",
        description: "Partial low-string diminished shape.",
        rootStringId: "string-6",
        frets: [0, 1, 2, 0, "x", "x"],
        recommended: true,
      },
      {
        id: "dim-a",
        label: "String-5 diminished",
        description: "Compact diminished voicing.",
        rootStringId: "string-5",
        frets: ["x", 0, 1, 2, 1, "x"],
      },
    ],
  },
  {
    id: "aug",
    label: "aug",
    intervals: [0, 4, 8],
    description: "Raised fifth for bright tension.",
    shapes: [
      {
        id: "aug-e",
        label: "String-6 augmented",
        description: "Movable augmented color.",
        rootStringId: "string-6",
        frets: [0, 3, 2, 1, 1, 0],
        recommended: true,
      },
      {
        id: "aug-a",
        label: "String-5 augmented",
        description: "String-5 rooted augmented voicing.",
        rootStringId: "string-5",
        frets: ["x", 0, 3, 2, 2, 1],
      },
    ],
  },
  {
    id: "add9",
    label: "add9",
    intervals: [0, 2, 4, 7],
    description: "Major chord with extra ninth color.",
    shapes: [
      {
        id: "add9-a",
        label: "String-5 add9",
        description: "A practical add9 color grip.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 4, 2, 0],
        recommended: true,
      },
    ],
  },
  {
    id: "6",
    label: "6",
    intervals: [0, 4, 7, 9],
    description: "Major six color for sweeter comping.",
    shapes: [
      {
        id: "six-e",
        label: "String-6 6 chord",
        description: "Major 6 voicing with a bright top.",
        rootStringId: "string-6",
        frets: [0, 2, 2, 1, 2, 0],
        recommended: true,
      },
      {
        id: "six-a",
        label: "String-5 6 chord",
        description: "Compact 6 chord shape.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 2, 2, 2],
      },
    ],
  },
  {
    id: "m6",
    label: "m6",
    intervals: [0, 3, 7, 9],
    description: "Minor six color with a jazzier pull.",
    shapes: [
      {
        id: "m6-e",
        label: "String-6 m6",
        description: "Minor 6 voicing on string 6 root.",
        rootStringId: "string-6",
        frets: [0, 2, 2, 0, 2, 0],
        recommended: true,
      },
      {
        id: "m6-a",
        label: "String-5 m6",
        description: "Compact minor 6 voicing.",
        rootStringId: "string-5",
        frets: ["x", 0, 2, 2, 1, 2],
      },
    ],
  },
];

function mod12(value: number) {
  return ((value % 12) + 12) % 12;
}

function getRootOption(rootId: string) {
  return ROOT_OPTIONS.find((root) => root.id === rootId) ?? ROOT_OPTIONS[0];
}

function getChordTypeDefinition(chordTypeId: string) {
  return (
    CHORD_TYPE_DEFINITIONS.find((chordType) => chordType.id === chordTypeId) ??
    CHORD_TYPE_DEFINITIONS[0]
  );
}

function getRootFretForString(rootPitchClass: number, rootStringId: string) {
  return mod12(rootPitchClass - STRING_PITCHES[rootStringId]);
}

function getAbsoluteFret(relativeFret: RelativeFret, rootFret: number) {
  if (relativeFret === "x") {
    return null;
  }

  return rootFret + relativeFret;
}

function buildChordShape(
  root: RootOption,
  chordType: ChordTypeDefinition,
  template: ChordShapeTemplate
): ChordShape {
  const rootFret = getRootFretForString(root.pitchClass, template.rootStringId);
  const notes = STRING_OPTIONS.map((string, index) => {
    const relativeFret = template.frets[index];
    const fret = getAbsoluteFret(relativeFret, rootFret);

    if (fret === null) {
      return {
        stringId: string.id,
        stringLabel: string.label,
        fret: null,
        isMuted: true,
        interval: null,
        noteName: null,
        degreeLabel: null,
        isRoot: false,
      };
    }

    const pitchClass = mod12(string.pitchClass + fret);
    const interval = chordType.intervals.find(
      (candidate) => mod12(root.pitchClass + candidate) === pitchClass
    );

    return {
      stringId: string.id,
      stringLabel: string.label,
      fret,
      isMuted: false,
      interval: interval ?? null,
      noteName: getNoteName(pitchClass, root.accidentalStyle),
      degreeLabel: interval !== undefined ? getDegreeLabel(interval) : null,
      isRoot: interval === 0,
    };
  });

  const playedFrets = notes
    .map((note) => note.fret)
    .filter((fret): fret is number => fret !== null && fret > 0);
  const minPlayedFret = playedFrets.length > 0 ? Math.min(...playedFrets) : 0;
  const startFret = minPlayedFret > 4 ? minPlayedFret : 1;
  const maxPlayedFret = playedFrets.length > 0 ? Math.max(...playedFrets) : 4;
  const fretCount = Math.max(4, maxPlayedFret - startFret + 1);

  return {
    id: template.id,
    label: template.label,
    description: template.description,
    rootStringId: template.rootStringId,
    startFret,
    fretCount,
    notes,
    recommended: Boolean(template.recommended),
  };
}

export function buildChord(rootId: string, chordTypeId: string): BuiltChord {
  const root = getRootOption(rootId);
  const chordType = getChordTypeDefinition(chordTypeId);
  const tones = chordType.intervals.map((interval) => ({
    interval,
    degreeLabel: getDegreeLabel(interval),
    noteName: getNoteName(root.pitchClass + interval, root.accidentalStyle),
  }));
  const chordName = `${root.label} ${chordType.label}`;
  const shapes = chordType.shapes.map((template) =>
    buildChordShape(root, chordType, template)
  );

  return {
    root,
    chordType,
    chordName,
    tones,
    shapes,
  };
}
