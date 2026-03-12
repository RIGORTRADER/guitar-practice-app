export type AccidentalStyle = "sharp" | "flat";
export type LabelMode = "degrees" | "notes";
export type ViewMode = "full-neck" | "box" | "single-string";
export type BoxFamily = "modal" | "pentatonic";
export type CellDisplayState = "inactive" | "focus" | "linked" | "hidden";

export type RootOption = {
  id: string;
  label: string;
  pitchClass: number;
  accidentalStyle: AccidentalStyle;
};

export type StringOption = {
  id: string;
  label: string;
  displayLabel: string;
  pitchClass: number;
};

export type TriadDefinition = {
  label: string;
  intervals: number[];
};

export type ScaleDefinition = {
  id: string;
  label: string;
  intervals: number[];
  description: string;
  boxFamily: BoxFamily;
  triad: TriadDefinition;
};

export type PositionOption = {
  id: string;
  label: string;
  subtitle: string;
  startFret: number;
  endFret: number;
  isFullNeck: boolean;
};

export type FretboardBuildOptions = {
  viewMode?: ViewMode;
  positionId?: string;
  singleStringId?: string;
  maxFret?: number;
  positionLinking?: boolean;
};

export type FretboardCell = {
  fret: number;
  noteName: string;
  degreeLabel: string | null;
  degreeInterval: number | null;
  isActive: boolean;
  isRoot: boolean;
  isTriadTone: boolean;
  displayState: CellDisplayState;
};

export type FretboardString = {
  id: string;
  label: string;
  displayLabel: string;
  cells: FretboardCell[];
};

export type FretboardLegendItem = {
  degreeInterval: number;
  degreeLabel: string;
  noteName: string;
  isRoot: boolean;
  isTriadTone: boolean;
};

export type FretboardScaleMap = {
  root: RootOption;
  scale: ScaleDefinition;
  viewMode: ViewMode;
  position: PositionOption;
  frets: number[];
  strings: FretboardString[];
  legend: FretboardLegendItem[];
  triad: TriadDefinition;
};

type PositionTemplate = {
  id: string;
  label: string;
  subtitle: string;
  startOffset: number;
  endOffset: number;
};

const FULL_NECK_END_FRET = 17;

const NOTE_NAMES_SHARP = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const NOTE_NAMES_FLAT = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const DEGREE_LABELS: Record<number, string> = {
  0: "1",
  1: "b2",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  6: "#4/b5",
  7: "5",
  8: "b6",
  9: "6",
  10: "b7",
  11: "7",
};

export const STRING_OPTIONS: StringOption[] = [
  { id: "string-1", label: "e", displayLabel: "High e", pitchClass: 4 },
  { id: "string-2", label: "B", displayLabel: "B", pitchClass: 11 },
  { id: "string-3", label: "G", displayLabel: "G", pitchClass: 7 },
  { id: "string-4", label: "D", displayLabel: "D", pitchClass: 2 },
  { id: "string-5", label: "A", displayLabel: "A", pitchClass: 9 },
  { id: "string-6", label: "E", displayLabel: "Low E", pitchClass: 4 },
] as const;

const POSITION_TEMPLATES: Record<BoxFamily, PositionTemplate[]> = {
  modal: [
    {
      id: "box-1",
      label: "Box 1",
      subtitle: "Root area",
      startOffset: 0,
      endOffset: 4,
    },
    {
      id: "box-2",
      label: "Box 2",
      subtitle: "Up 2 frets",
      startOffset: 2,
      endOffset: 6,
    },
    {
      id: "box-3",
      label: "Box 3",
      subtitle: "Middle lane",
      startOffset: 4,
      endOffset: 8,
    },
    {
      id: "box-4",
      label: "Box 4",
      subtitle: "Upper connect",
      startOffset: 7,
      endOffset: 11,
    },
    {
      id: "box-5",
      label: "Box 5",
      subtitle: "Top reach",
      startOffset: 9,
      endOffset: 13,
    },
  ],
  pentatonic: [
    {
      id: "box-1",
      label: "Box 1",
      subtitle: "Root box",
      startOffset: 0,
      endOffset: 3,
    },
    {
      id: "box-2",
      label: "Box 2",
      subtitle: "Shift up",
      startOffset: 2,
      endOffset: 5,
    },
    {
      id: "box-3",
      label: "Box 3",
      subtitle: "Middle bridge",
      startOffset: 5,
      endOffset: 8,
    },
    {
      id: "box-4",
      label: "Box 4",
      subtitle: "Upper stretch",
      startOffset: 7,
      endOffset: 10,
    },
    {
      id: "box-5",
      label: "Box 5",
      subtitle: "Back to root lane",
      startOffset: 10,
      endOffset: 13,
    },
  ],
};

export const ROOT_OPTIONS: RootOption[] = [
  { id: "c", label: "C", pitchClass: 0, accidentalStyle: "sharp" },
  { id: "c-sharp", label: "C#/Db", pitchClass: 1, accidentalStyle: "sharp" },
  { id: "d", label: "D", pitchClass: 2, accidentalStyle: "sharp" },
  { id: "e-flat", label: "D#/Eb", pitchClass: 3, accidentalStyle: "flat" },
  { id: "e", label: "E", pitchClass: 4, accidentalStyle: "sharp" },
  { id: "f", label: "F", pitchClass: 5, accidentalStyle: "sharp" },
  { id: "f-sharp", label: "F#/Gb", pitchClass: 6, accidentalStyle: "sharp" },
  { id: "g", label: "G", pitchClass: 7, accidentalStyle: "sharp" },
  { id: "a-flat", label: "G#/Ab", pitchClass: 8, accidentalStyle: "flat" },
  { id: "a", label: "A", pitchClass: 9, accidentalStyle: "sharp" },
  { id: "b-flat", label: "A#/Bb", pitchClass: 10, accidentalStyle: "flat" },
  { id: "b", label: "B", pitchClass: 11, accidentalStyle: "sharp" },
];

export const SCALE_DEFINITIONS: ScaleDefinition[] = [
  {
    id: "major",
    label: "Major / Ionian",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: "Bright and balanced major map.",
    boxFamily: "modal",
    triad: { label: "Major triad", intervals: [0, 4, 7] },
  },
  {
    id: "natural-minor",
    label: "Natural Minor / Aeolian",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: "Natural minor color with grounded pull.",
    boxFamily: "modal",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "dorian",
    label: "Dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: "Minor with a lifted 6 for groove and flow.",
    boxFamily: "modal",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "phrygian",
    label: "Phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    description: "Dark and tense because of the b2.",
    boxFamily: "modal",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "lydian",
    label: "Lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: "Open major color with a raised 4.",
    boxFamily: "modal",
    triad: { label: "Major triad", intervals: [0, 4, 7] },
  },
  {
    id: "mixolydian",
    label: "Mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: "Dominant color for vamps and groove playing.",
    boxFamily: "modal",
    triad: { label: "Major triad", intervals: [0, 4, 7] },
  },
  {
    id: "locrian",
    label: "Locrian",
    intervals: [0, 1, 3, 5, 6, 8, 10],
    description: "Diminished tension with an unstable center.",
    boxFamily: "modal",
    triad: { label: "Diminished triad", intervals: [0, 3, 6] },
  },
  {
    id: "major-pentatonic",
    label: "Major Pentatonic",
    intervals: [0, 2, 4, 7, 9],
    description: "Open and melodic with fewer collisions.",
    boxFamily: "pentatonic",
    triad: { label: "Major triad", intervals: [0, 4, 7] },
  },
  {
    id: "minor-pentatonic",
    label: "Minor Pentatonic",
    intervals: [0, 3, 5, 7, 10],
    description: "Classic guitar language and box-friendly practice.",
    boxFamily: "pentatonic",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "blues",
    label: "Blues",
    intervals: [0, 3, 5, 6, 7, 10],
    description: "Minor pentatonic with the blue note tension.",
    boxFamily: "pentatonic",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "harmonic-minor",
    label: "Harmonic Minor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: "Minor with a leading tone and dramatic pull.",
    boxFamily: "modal",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "melodic-minor",
    label: "Melodic Minor",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    description: "Modern minor color with raised 6 and 7.",
    boxFamily: "modal",
    triad: { label: "Minor triad", intervals: [0, 3, 7] },
  },
  {
    id: "phrygian-dominant",
    label: "Phrygian Dominant",
    intervals: [0, 1, 4, 5, 7, 8, 10],
    description: "Dominant color with b2 and natural 3.",
    boxFamily: "modal",
    triad: { label: "Major triad", intervals: [0, 4, 7] },
  },
  {
    id: "whole-tone",
    label: "Whole Tone",
    intervals: [0, 2, 4, 6, 8, 10],
    description: "Symmetrical sound with augmented tension.",
    boxFamily: "modal",
    triad: { label: "Augmented triad", intervals: [0, 4, 8] },
  },
  {
    id: "diminished",
    label: "Diminished",
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    description: "Whole-half diminished symmetry for tense colors.",
    boxFamily: "modal",
    triad: { label: "Diminished triad", intervals: [0, 3, 6] },
  },
];

function mod12(value: number) {
  return ((value % 12) + 12) % 12;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getRootOption(rootId: string) {
  return ROOT_OPTIONS.find((root) => root.id === rootId) ?? ROOT_OPTIONS[0];
}

function getScaleDefinition(scaleId: string) {
  return SCALE_DEFINITIONS.find((scale) => scale.id === scaleId) ?? SCALE_DEFINITIONS[0];
}

function getStringOption(stringId: string) {
  return STRING_OPTIONS.find((string) => string.id === stringId) ?? STRING_OPTIONS[5];
}

function getLowEAnchorFret(rootPitchClass: number) {
  return mod12(rootPitchClass - STRING_OPTIONS[5].pitchClass);
}

function getAdjacentPositionIds(
  positionId: string,
  positionOptions: PositionOption[]
) {
  const boxOptions = positionOptions.filter((position) => !position.isFullNeck);
  const currentIndex = boxOptions.findIndex((position) => position.id === positionId);

  if (currentIndex === -1) {
    return [];
  }

  return [boxOptions[currentIndex - 1], boxOptions[currentIndex + 1]]
    .filter((position): position is PositionOption => Boolean(position))
    .map((position) => position.id);
}

export function getDegreeLabel(interval: number) {
  return DEGREE_LABELS[mod12(interval)] ?? "";
}

export function getNoteName(
  pitchClass: number,
  accidentalStyle: AccidentalStyle = "sharp"
) {
  const noteNames =
    accidentalStyle === "flat" ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP;

  return noteNames[mod12(pitchClass)];
}

export function getScalePositionOptions(
  rootId: string,
  scaleId: string,
  maxFret = FULL_NECK_END_FRET
): PositionOption[] {
  const root = getRootOption(rootId);
  const scale = getScaleDefinition(scaleId);
  const anchorFret = getLowEAnchorFret(root.pitchClass);
  const positionTemplates = POSITION_TEMPLATES[scale.boxFamily];

  const positions = positionTemplates
    .map((template) => {
      const startFret = anchorFret + template.startOffset;
      const endFret = anchorFret + template.endOffset;

      if (startFret > maxFret || endFret < 0) {
        return null;
      }

      const clampedStart = clamp(startFret, 0, maxFret);
      const clampedEnd = clamp(endFret, 0, maxFret);

      if (clampedEnd - clampedStart < 2) {
        return null;
      }

      return {
        id: template.id,
        label: template.label,
        subtitle: `${template.subtitle} • frets ${clampedStart}-${clampedEnd}`,
        startFret: clampedStart,
        endFret: clampedEnd,
        isFullNeck: false,
      };
    })
    .filter((position): position is PositionOption => position !== null);

  return [
    {
      id: "full-neck",
      label: "Full Neck",
      subtitle: `Open-${maxFret} fret map`,
      startFret: 0,
      endFret: maxFret,
      isFullNeck: true,
    },
    ...positions,
  ];
}

export function buildFretboardScaleMap(
  rootId: string,
  scaleId: string,
  options: FretboardBuildOptions = {}
): FretboardScaleMap {
  const {
    viewMode = "full-neck",
    positionId = "box-1",
    singleStringId = "string-6",
    maxFret = FULL_NECK_END_FRET,
    positionLinking = false,
  } = options;
  const root = getRootOption(rootId);
  const scale = getScaleDefinition(scaleId);
  const positionOptions = getScalePositionOptions(rootId, scaleId, maxFret);
  const selectedPosition =
    positionOptions.find((position) => position.id === positionId && !position.isFullNeck) ??
    positionOptions.find((position) => !position.isFullNeck) ??
    positionOptions[0];
  const position =
    viewMode === "box"
      ? selectedPosition
      : positionOptions.find((item) => item.isFullNeck) ?? positionOptions[0];
  const linkedPositionIds =
    viewMode === "box" && positionLinking
      ? getAdjacentPositionIds(position.id, positionOptions)
      : [];
  const linkedPositions = linkedPositionIds
    .map((id) => positionOptions.find((option) => option.id === id))
    .filter((option): option is PositionOption => Boolean(option));
  const renderedStartFret =
    viewMode === "box" && linkedPositions.length > 0
      ? Math.min(position.startFret, ...linkedPositions.map((item) => item.startFret))
      : position.startFret;
  const renderedEndFret =
    viewMode === "box" && linkedPositions.length > 0
      ? Math.max(position.endFret, ...linkedPositions.map((item) => item.endFret))
      : position.endFret;
  const frets = Array.from(
    { length: renderedEndFret - renderedStartFret + 1 },
    (_, index) => renderedStartFret + index
  );
  const scalePitchClasses = new Map<number, number>();
  const triadIntervals = new Set(scale.triad.intervals.map((interval) => mod12(interval)));

  scale.intervals.forEach((interval) => {
    scalePitchClasses.set(mod12(root.pitchClass + interval), interval);
  });

  const legend = scale.intervals.map((interval) => ({
    degreeInterval: interval,
    degreeLabel: getDegreeLabel(interval),
    noteName: getNoteName(root.pitchClass + interval, root.accidentalStyle),
    isRoot: interval === 0,
    isTriadTone: triadIntervals.has(interval),
  }));

  const stringPool =
    viewMode === "single-string"
      ? [getStringOption(singleStringId)]
      : STRING_OPTIONS;

  const strings = stringPool.map((string) => ({
    id: string.id,
    label: string.label,
    displayLabel: string.displayLabel,
    cells: frets.map((fret) => {
      const pitchClass = mod12(string.pitchClass + fret);
      const interval = scalePitchClasses.get(pitchClass);
      const isActive = interval !== undefined;
      const isWithinFocus =
        fret >= selectedPosition.startFret && fret <= selectedPosition.endFret;
      const isWithinLinked = linkedPositions.some(
        (linkedPosition) =>
          fret >= linkedPosition.startFret && fret <= linkedPosition.endFret
      );
      let displayState: CellDisplayState = "inactive";

      if (isActive) {
        if (viewMode === "box") {
          if (isWithinFocus) {
            displayState = "focus";
          } else if (isWithinLinked) {
            displayState = "linked";
          } else {
            displayState = "hidden";
          }
        } else {
          displayState = "focus";
        }
      }

      return {
        fret,
        noteName: getNoteName(pitchClass, root.accidentalStyle),
        degreeLabel: isActive ? getDegreeLabel(interval) : null,
        degreeInterval: isActive ? interval : null,
        isActive,
        isRoot: interval === 0,
        isTriadTone: isActive ? triadIntervals.has(interval) : false,
        displayState,
      };
    }),
  }));

  return {
    root,
    scale,
    viewMode,
    position,
    frets,
    strings,
    legend,
    triad: scale.triad,
  };
}
