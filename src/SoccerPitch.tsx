import { LayoutGroup } from 'framer-motion';
import type { Formation, FormationSlot, SoccerPitchProps } from './types';
import { Pitch } from './Pitch';
import { PlayerMarker } from './PlayerMarker';
import { Bench } from './Bench';
import { formations } from './formations';

const MAX_BENCH = 5;

/* -------------------------------------------------------------------------- *
 *  Projection geometry
 *
 *  The pitch stage is tilted with rotateX(TILT_DEG). The player stage stays
 *  flat (0deg, no perspective) but is shaped as a trapezoid that matches the
 *  visible footprint of the tilted pitch beneath it. Player coordinates are
 *  re-projected into that trapezoid so each player sits exactly above the
 *  point on the pitch they would occupy if it were flat.
 *
 *  We use a clean linear trapezoid model — at 45deg the cos / sin terms
 *  dominate, true perspective foreshortening is a small secondary effect, and
 *  this approach is scale-invariant (works at any container width).
 *
 *    vertical compression : cos(TILT_DEG)            (height -> 70.71% at 45)
 *    top edge ratio       : TOP_SCALE                (narrower far edge)
 *    bottom edge ratio    : 1                        (full container width)
 *
 *  A player at pitch-local (x%, y%) maps to player-stage (xProj%, yProj%):
 *    yProj = y                                  (1:1 inside the trapezoid)
 *    s(y)  = TOP_SCALE + (1 - TOP_SCALE) * (y / 100)
 *    xProj = 50 + (x - 50) * s(y)
 * -------------------------------------------------------------------------- */
const TILT_DEG = 45;
const TOP_SCALE = 0.66;
const COS_TILT = Math.cos((TILT_DEG * Math.PI) / 180);

/* Trapezoid bounds inside the parent container, expressed as percentages.
 * The pitch is tilted around its center, so the projected footprint is
 * vertically centered and compressed by COS_TILT. */
const TRAP_HEIGHT_PCT = COS_TILT * 100;
const TRAP_TOP_PCT = (100 - TRAP_HEIGHT_PCT) / 2;

function projectSlot(slot: FormationSlot): FormationSlot {
  const depthScale = TOP_SCALE + (1 - TOP_SCALE) * (slot.y / 100);
  const xProj = 50 + (slot.x - 50) * depthScale;
  return { ...slot, x: xProj, y: slot.y };
}

function resolveFormation(
  formation: SoccerPitchProps['formation'],
): Formation {
  if (typeof formation === 'string') {
    const preset = formations[formation];
    if (!preset) {
      throw new Error(`[soccer-pitch] Unknown formation preset: "${formation}"`);
    }
    return preset;
  }
  return { name: formation.name ?? 'Custom', slots: formation.slots };
}

export function SoccerPitch({
  players,
  formation,
  theme = 'grass',
  showNames = true,
  showFlags = true,
  showPositions = true,
  bench,
  className,
  onPlayerHover,
}: SoccerPitchProps) {
  const resolved = resolveFormation(formation);

  if (process.env.NODE_ENV !== 'production') {
    if (players.length !== resolved.slots.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `[soccer-pitch] players.length (${players.length}) does not match formation "${resolved.name}" slots (${resolved.slots.length}). Extra entries will be ignored; missing slots will be empty.`,
      );
    }
    const ids = new Set<string>();
    for (const p of players) {
      if (ids.has(p.id)) {
        // eslint-disable-next-line no-console
        console.warn(`[soccer-pitch] Duplicate player id: "${p.id}". Animation tracking requires unique ids.`);
      }
      ids.add(p.id);
    }
    if (bench && bench.length > MAX_BENCH) {
      // eslint-disable-next-line no-console
      console.warn(
        `[soccer-pitch] bench has ${bench.length} entries; only the first ${MAX_BENCH} will render.`,
      );
    }
  }

  const handleHover = onPlayerHover ?? (() => undefined);
  const pairs = resolved.slots.map((slot, i) => ({ slot, player: players[i] }));
  const benchPlayers = (bench ?? []).slice(0, MAX_BENCH);

  return (
    <div
      data-sp-theme={theme}
      className={[
        'sp-soccer-pitch',
        'sp-relative sp-w-full',
        className ?? '',
      ].join(' ')}
    >
      <div
        className="sp-relative sp-w-full"
        style={{ aspectRatio: '4 / 5', marginBottom: '-8%' }}
      >
        {/* -------------------------------------------------------------- *
         *  Stage 1 — Pitch stage
         *  Tilted 45deg around its center. Holds only the pitch surface.
         *  Perspective is local to this stage so it never leaks into the
         *  player stage above it.
         * -------------------------------------------------------------- */}
        <div
          className="sp-absolute sp-inset-0"
          style={{ perspective: '1400px' }}
        >
          <div
            className="sp-absolute sp-inset-0"
            style={{
              transform: `rotateX(${TILT_DEG}deg)`,
              transformOrigin: '50% 50%',
            }}
          >
            <div className="sp-pitch-surface sp-absolute sp-inset-0 sp-rounded-xl sp-overflow-hidden">
              <Pitch />
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- *
         *  Stage 2 — Player stage
         *  Upright in screen space (no rotateX, no perspective). The stage
         *  occupies the trapezoid's bounding box; player coordinates are
         *  re-projected so they land on the trapezoid's slanted left/right
         *  edges, visually tracing the footprint of the tilted pitch.
         *  No clip-path — player labels and hover cards must overflow the
         *  trapezoid freely. Players render at 0deg rotation, so
         *  PlayerMarker needs no counter-rotation.
         * -------------------------------------------------------------- */}
        <div
          className="sp-absolute sp-left-0 sp-right-0"
          style={{
            top: `${TRAP_TOP_PCT}%`,
            height: `${TRAP_HEIGHT_PCT}%`,
          }}
        >
          <LayoutGroup>
            {pairs.map(({ slot, player }) =>
              player ? (
                <PlayerMarker
                  key={player.id}
                  player={player}
                  slot={projectSlot(slot)}
                  showName={showNames}
                  showFlag={showFlags}
                  showPosition={showPositions}
                  onHoverChange={handleHover}
                />
              ) : null,
            )}
          </LayoutGroup>
        </div>
      </div>

      <Bench
        players={benchPlayers}
        showName={showNames}
        showFlag={showFlags}
        showPosition={showPositions}
        onHoverChange={handleHover}
      />
    </div>
  );
}
