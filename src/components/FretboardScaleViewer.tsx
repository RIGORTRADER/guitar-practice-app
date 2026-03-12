"use client";

import { useState } from "react";
import {
  buildFretboardScaleMap,
  getDegreeLabel,
  getScalePositionOptions,
  ROOT_OPTIONS,
  SCALE_DEFINITIONS,
  STRING_OPTIONS,
  type CellDisplayState,
  type FretboardCell,
  type FretboardLegendItem,
  type LabelMode,
  type ViewMode,
} from "../lib/fretboard";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15]);
const DOUBLE_FRET_MARKERS = new Set([12]);
const STRING_HEIGHTS = [1.2, 1.5, 1.8, 2.1, 2.5, 2.9];

const DEGREE_THEMES: Record<
  number,
  {
    focusClasses: string;
    linkedClasses: string;
    legendClasses: string;
  }
> = {
  0: {
    focusClasses:
      "border-[#ffbf96] bg-[linear-gradient(135deg,#c86a43,#9a4528)] text-[#fff6ef]",
    linkedClasses:
      "border-[#8f553c] bg-[linear-gradient(135deg,#5b3226,#44221a)] text-[#f6d7c8]",
    legendClasses: "border-[#ffbf96] bg-[#4b2e24] text-[#ffd9c5]",
  },
  1: {
    focusClasses:
      "border-[#d79ea2] bg-[linear-gradient(135deg,#8d4a4f,#683238)] text-[#fff0f0]",
    linkedClasses:
      "border-[#8d5e61] bg-[linear-gradient(135deg,#4a2b2d,#352022)] text-[#f5dbdd]",
    legendClasses: "border-[#b18286] bg-[#3d282a] text-[#f2d8d9]",
  },
  2: {
    focusClasses:
      "border-[#e4c989] bg-[linear-gradient(135deg,#b99334,#8f6f24)] text-[#fff8e4]",
    linkedClasses:
      "border-[#9d8749] bg-[linear-gradient(135deg,#514421,#3d341b)] text-[#f1e2af]",
    legendClasses: "border-[#c8ae66] bg-[#41371c] text-[#f2e2ab]",
  },
  3: {
    focusClasses:
      "border-[#d4a3c8] bg-[linear-gradient(135deg,#935683,#6c3d60)] text-[#fff0fb]",
    linkedClasses:
      "border-[#89657f] bg-[linear-gradient(135deg,#4b2f45,#372232)] text-[#eed8e8]",
    legendClasses: "border-[#b98dae] bg-[#3e2939] text-[#eed8e7]",
  },
  4: {
    focusClasses:
      "border-[#edc285] bg-[linear-gradient(135deg,#c8822b,#9b611c)] text-[#fff5e5]",
    linkedClasses:
      "border-[#a2774b] bg-[linear-gradient(135deg,#573919,#422a14)] text-[#f2ddba]",
    legendClasses: "border-[#d0a563] bg-[#432d17] text-[#f5e0ba]",
  },
  5: {
    focusClasses:
      "border-[#c3d59b] bg-[linear-gradient(135deg,#7e9550,#65793f)] text-[#f7fde9]",
    linkedClasses:
      "border-[#7d8d5d] bg-[linear-gradient(135deg,#3d482b,#313924)] text-[#e6f0d1]",
    legendClasses: "border-[#a6bd79] bg-[#2f3823] text-[#e8f1d3]",
  },
  6: {
    focusClasses:
      "border-[#8cc8c3] bg-[linear-gradient(135deg,#2a8a83,#1d6762)] text-[#eefcfb]",
    linkedClasses:
      "border-[#5e8a86] bg-[linear-gradient(135deg,#1f4442,#163332)] text-[#cce9e6]",
    legendClasses: "border-[#74b1ac] bg-[#1c3736] text-[#d3efed]",
  },
  7: {
    focusClasses:
      "border-[#d8d0ba] bg-[linear-gradient(135deg,#a99a70,#81764f)] text-[#fffdf6]",
    linkedClasses:
      "border-[#978a68] bg-[linear-gradient(135deg,#4d4634,#3c3729)] text-[#ebe3ca]",
    legendClasses: "border-[#c0b28a] bg-[#3d372a] text-[#eee7d1]",
  },
  8: {
    focusClasses:
      "border-[#e2b494] bg-[linear-gradient(135deg,#b8754d,#91593a)] text-[#fff6ef]",
    linkedClasses:
      "border-[#946c57] bg-[linear-gradient(135deg,#523324,#3f271d)] text-[#f0d8ca]",
    legendClasses: "border-[#c69776] bg-[#402a20] text-[#f0d7c9]",
  },
  9: {
    focusClasses:
      "border-[#b9d6a8] bg-[linear-gradient(135deg,#67905a,#4f7145)] text-[#f5fff0]",
    linkedClasses:
      "border-[#6c8863] bg-[linear-gradient(135deg,#31452c,#273824)] text-[#dcefd4]",
    legendClasses: "border-[#9cbc8b] bg-[#2d3828] text-[#deefd5]",
  },
  10: {
    focusClasses:
      "border-[#bba4d7] bg-[linear-gradient(135deg,#6d5a95,#53436f)] text-[#f8f3ff]",
    linkedClasses:
      "border-[#7b6c94] bg-[linear-gradient(135deg,#342d48,#2a2538)] text-[#e2d8ef]",
    legendClasses: "border-[#a08ec0] bg-[#2f293c] text-[#e4dbef]",
  },
  11: {
    focusClasses:
      "border-[#d9c98e] bg-[linear-gradient(135deg,#a8903a,#826d25)] text-[#fffaea]",
    linkedClasses:
      "border-[#918051] bg-[linear-gradient(135deg,#4d4220,#3a321a)] text-[#efe2b5]",
    legendClasses: "border-[#c0ae69] bg-[#3d341b] text-[#f2e3b4]",
  },
};

function getDegreeTheme(interval: number | null) {
  if (interval === null) {
    return {
      focusClasses: "border-[#55463a] bg-[#2a221d] text-stone-300",
      linkedClasses: "border-[#453a31] bg-[#241d18] text-stone-400",
      legendClasses: "border-[#55463a] bg-[#221b17] text-stone-300",
    };
  }

  return DEGREE_THEMES[interval] ?? DEGREE_THEMES[7];
}

function displayCellLabel(
  labelMode: LabelMode,
  degreeLabel: string | null,
  noteName: string
) {
  if (labelMode === "notes") {
    return noteName;
  }

  return degreeLabel ?? "";
}

function getFretMarkerType(fret: number) {
  if (!FRET_MARKERS.has(fret)) {
    return null;
  }

  if (DOUBLE_FRET_MARKERS.has(fret)) {
    return "double";
  }

  return "single";
}

function getCellContainerClasses(displayState: CellDisplayState) {
  if (displayState === "focus") {
    return "bg-[rgba(255,213,170,0.05)]";
  }

  if (displayState === "linked") {
    return "bg-[rgba(255,255,255,0.03)]";
  }

  return "";
}

function getNoteClasses(cell: FretboardCell, triadOverlay: boolean) {
  const theme = getDegreeTheme(cell.degreeInterval);
  const isLinked = cell.displayState === "linked";
  const sizeClasses = isLinked
    ? "h-9 w-9 text-[10px]"
    : "h-11 w-11 text-[11px] sm:h-12 sm:w-12 sm:text-xs";
  const toneClasses = isLinked ? theme.linkedClasses : theme.focusClasses;
  const overlayClasses = triadOverlay
    ? cell.isTriadTone
      ? " ring-2 ring-[#f6d7a8] ring-offset-2 ring-offset-[#17120f]"
      : " opacity-45"
    : "";

  return `relative z-10 flex items-center justify-center rounded-full border font-semibold leading-none shadow-[0_10px_22px_rgba(0,0,0,0.22)] ${sizeClasses} ${toneClasses}${overlayClasses}`;
}

function LegendChip({
  item,
  labelMode,
  triadOverlay,
}: {
  item: FretboardLegendItem;
  labelMode: LabelMode;
  triadOverlay: boolean;
}) {
  const theme = getDegreeTheme(item.degreeInterval);

  return (
    <div
      className={`rounded-2xl border px-3 py-2 text-sm ${theme.legendClasses}${
        triadOverlay && item.isTriadTone
          ? " ring-1 ring-[#f6d7a8] ring-offset-1 ring-offset-[#1a1511]"
          : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">
          {labelMode === "degrees" ? item.degreeLabel : item.noteName}
        </span>
        <span className="text-xs opacity-75">
          {labelMode === "degrees" ? item.noteName : item.degreeLabel}
        </span>
      </div>
    </div>
  );
}

export function FretboardScaleViewer() {
  const [rootId, setRootId] = useState("c");
  const [scaleId, setScaleId] = useState("major");
  const [labelMode, setLabelMode] = useState<LabelMode>("degrees");
  const [viewMode, setViewMode] = useState<ViewMode>("full-neck");
  const [positionId, setPositionId] = useState("box-1");
  const [singleStringId, setSingleStringId] = useState("string-6");
  const [positionLinking, setPositionLinking] = useState(false);
  const [triadOverlay, setTriadOverlay] = useState(false);

  const positionOptions = getScalePositionOptions(rootId, scaleId);

  const availableBoxOptions = positionOptions.filter(
    (option) => !option.isFullNeck
  );
  const activePositionId = availableBoxOptions.some(
    (option) => option.id === positionId
  )
    ? positionId
    : availableBoxOptions[0]?.id ?? "box-1";

  const fretboard = buildFretboardScaleMap(rootId, scaleId, {
    viewMode,
    positionId: activePositionId,
    singleStringId,
    positionLinking: viewMode === "box" ? positionLinking : false,
  });

  const triadDegrees = fretboard.triad.intervals
    .map((interval) => getDegreeLabel(interval))
    .join(" - ");
  const boardMinWidth =
    viewMode === "single-string"
      ? Math.max(760, fretboard.frets.length * 54 + 56)
      : Math.max(920, fretboard.frets.length * 56 + 64);

  return (
    <section className="rounded-[2rem] border border-[#3b2d23] bg-[linear-gradient(180deg,#120f0d,#191411_52%,#120f0d)] p-5 shadow-[0_24px_70px_rgba(30,20,12,0.28)] sm:p-6">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                Tool
              </p>
              <span className="rounded-full border border-[#3e4f46] bg-[#20332c] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#b6d0c4]">
                Neck fluency
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-100">
              Fretboard scale viewer
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-400">
              Scale, box ve string odagini ayni neck uzerinde calisma haritasi
              gibi kullan.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-[#6f4f3b] bg-[#2e2018] px-3 py-1.5 text-[#f3d1b7]">
              {fretboard.root.label}
            </span>
            <span className="rounded-full border border-[#44574d] bg-[#20332c] px-3 py-1.5 text-[#cae2d7]">
              {fretboard.scale.label}
            </span>
            <span className="rounded-full border border-[#5b4960] bg-[#2b222f] px-3 py-1.5 text-[#d7c4de]">
              {viewMode === "box"
                ? fretboard.position.label
                : viewMode === "single-string"
                  ? "Single string"
                  : "Full neck"}
            </span>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-[#382b21] bg-[linear-gradient(180deg,#1b1613,#15110f)] p-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  Root
                </span>
                <select
                  value={rootId}
                  onChange={(event) => setRootId(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#514033] bg-[#221c18] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-[#9c7558]"
                >
                  {ROOT_OPTIONS.map((root) => (
                    <option key={root.id} value={root.id}>
                      {root.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2 xl:col-span-2">
                <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  Scale
                </span>
                <select
                  value={scaleId}
                  onChange={(event) => setScaleId(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#514033] bg-[#221c18] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-[#9c7558]"
                >
                  {SCALE_DEFINITIONS.map((scale) => (
                    <option key={scale.id} value={scale.id}>
                      {scale.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { id: "full-neck", label: "Full Neck" },
                { id: "box", label: "Box" },
                { id: "single-string", label: "Single String" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setViewMode(option.id as ViewMode)}
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                    viewMode === option.id
                      ? "bg-[linear-gradient(135deg,#77513d,#9d6b4f)] text-stone-50"
                      : "border border-[#4a3a2e] bg-[#211b17] text-stone-300 hover:border-[#735845]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {viewMode === "box" ? (
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    Position
                  </span>
                  <select
                    value={activePositionId}
                    onChange={(event) => setPositionId(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#514033] bg-[#221c18] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-[#9c7558]"
                  >
                    {availableBoxOptions.map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

              {viewMode === "single-string" ? (
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    String
                  </span>
                  <select
                    value={singleStringId}
                    onChange={(event) => setSingleStringId(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#514033] bg-[#221c18] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-[#9c7558]"
                  >
                    {STRING_OPTIONS.map((string) => (
                      <option key={string.id} value={string.id}>
                        {string.displayLabel}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

              <div className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  Labels
                </span>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setLabelMode("degrees")}
                    className={`rounded-xl px-3 py-3 text-xs font-medium transition ${
                      labelMode === "degrees"
                        ? "bg-[linear-gradient(135deg,#4d6559,#395148)] text-stone-50"
                        : "border border-[#4a3a2e] bg-[#211b17] text-stone-300 hover:border-[#735845]"
                    }`}
                  >
                    Degrees
                  </button>
                  <button
                    onClick={() => setLabelMode("notes")}
                    className={`rounded-xl px-3 py-3 text-xs font-medium transition ${
                      labelMode === "notes"
                        ? "bg-[linear-gradient(135deg,#5d516c,#463d52)] text-stone-50"
                        : "border border-[#4a3a2e] bg-[#211b17] text-stone-300 hover:border-[#735845]"
                    }`}
                  >
                    Notes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#382b21] bg-[linear-gradient(180deg,#1a1512,#14100e)] p-4">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {viewMode === "box" ? (
                  <button
                    onClick={() => setPositionLinking((current) => !current)}
                    className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                      positionLinking
                        ? "bg-[linear-gradient(135deg,#2e6d67,#23514d)] text-stone-50"
                        : "border border-[#4a3a2e] bg-[#211b17] text-stone-300 hover:border-[#735845]"
                    }`}
                  >
                    Position linking
                  </button>
                ) : null}

                <button
                  onClick={() => setTriadOverlay((current) => !current)}
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                    triadOverlay
                      ? "bg-[linear-gradient(135deg,#8a603d,#a5784d)] text-stone-50"
                      : "border border-[#4a3a2e] bg-[#211b17] text-stone-300 hover:border-[#735845]"
                  }`}
                >
                  Triad overlay
                </button>
              </div>

              <div className="rounded-2xl border border-[#312720] bg-[#171311] p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  Current focus
                </p>
                <p className="mt-2 text-sm font-medium text-stone-100">
                  {fretboard.root.label} {fretboard.scale.label}
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  {viewMode === "box"
                    ? fretboard.position.subtitle
                    : viewMode === "single-string"
                      ? `${STRING_OPTIONS.find((string) => string.id === singleStringId)?.displayLabel ?? "Single string"} • open-${fretboard.frets.at(-1)} frets`
                      : fretboard.position.subtitle}
                </p>
              </div>

              <div className="rounded-2xl border border-[#312720] bg-[#171311] p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                  Practice note
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {fretboard.scale.description}
                </p>
                {triadOverlay ? (
                  <p className="mt-2 text-sm text-[#f0d9b4]">
                    {fretboard.triad.label}: {triadDegrees}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#2f251f] bg-[linear-gradient(180deg,#17120f,#120f0d)] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                Degree legend
              </p>
              <p className="mt-2 text-sm text-stone-400">
                Root en guclu, diger dereceler kendi renklerinde. Box link aciksa
                komsu pozisyon notalari daha hafif gorunur.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {fretboard.legend.map((item) => (
                <LegendChip
                  key={item.degreeInterval}
                  item={item}
                  labelMode={labelMode}
                  triadOverlay={triadOverlay}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#3b2d23] bg-[linear-gradient(180deg,#1a1512,#14110e)] p-3 sm:p-4">
          <div className="overflow-x-auto pb-2">
            <div style={{ minWidth: `${boardMinWidth}px` }}>
              <div
                className="grid gap-y-2"
                style={{
                  gridTemplateColumns: `56px repeat(${fretboard.frets.length}, minmax(52px, 1fr))`,
                }}
              >
                <div />
                {fretboard.frets.map((fret) => (
                  <div
                    key={`fret-label-${fret}`}
                    className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500"
                  >
                    {fret === 0 ? "Open" : fret}
                  </div>
                ))}

                {fretboard.strings.map((string, stringIndex) => (
                  <div key={string.id} className="contents">
                    <div className="flex items-center justify-center text-sm font-medium text-stone-400">
                      {string.label}
                    </div>

                    {string.cells.map((cell) => {
                      const fretMarkerType = getFretMarkerType(cell.fret);
                      const displayLabel = displayCellLabel(
                        labelMode,
                        cell.degreeLabel,
                        cell.noteName
                      );
                      const showActiveNote =
                        cell.displayState === "focus" || cell.displayState === "linked";
                      const mutedDot =
                        cell.displayState === "hidden" || !cell.isActive;

                      return (
                        <div
                          key={`${string.id}-${cell.fret}`}
                          className={`relative flex h-[84px] items-center justify-center ${getCellContainerClasses(cell.displayState)}`}
                        >
                          <div
                            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full bg-[#9c7d67]"
                            style={{ height: `${STRING_HEIGHTS[stringIndex]}px` }}
                          />

                          {cell.fret === fretboard.frets[0] ? (
                            <div
                              className={`absolute bottom-0 left-0 top-0 ${
                                cell.fret === 0 ? "w-[4px] bg-[#c4a283]" : "w-px bg-[#6e5a4a]"
                              }`}
                            />
                          ) : null}
                          <div
                            className={`absolute bottom-0 right-0 top-0 ${
                              cell.fret === 0 ? "w-[4px] bg-[#c4a283]" : "w-[1.5px] bg-[#6e5a4a]"
                            }`}
                          />

                          {fretMarkerType === "single" ? (
                            <div className="absolute bottom-2 h-2.5 w-2.5 rounded-full bg-[#8c735e]" />
                          ) : null}
                          {fretMarkerType === "double" ? (
                            <div className="absolute bottom-1.5 flex gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-[#8c735e]" />
                              <div className="h-2.5 w-2.5 rounded-full bg-[#8c735e]" />
                            </div>
                          ) : null}

                          {showActiveNote ? (
                            <div
                              className={getNoteClasses(cell, triadOverlay)}
                              title={`${cell.noteName}${cell.degreeLabel ? ` • ${cell.degreeLabel}` : ""}`}
                            >
                              {displayLabel}
                            </div>
                          ) : mutedDot ? (
                            <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-[#5a4a3d]" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
