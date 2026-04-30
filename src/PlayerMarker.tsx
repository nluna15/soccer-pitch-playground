import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Player, FormationSlot } from './types';
import { initials } from './utils/initials';
import { flagEmoji } from './utils/flag';
import { HoverCard } from './HoverCard';

type Props = {
  player: Player;
  slot: FormationSlot;
  showName: boolean;
  showFlag: boolean;
  showPosition: boolean;
  onHoverChange: (player: Player | null) => void;
  flipBelow?: boolean;
};

export function PlayerMarker({
  player,
  slot,
  showName,
  showFlag,
  showPosition,
  onHoverChange,
  flipBelow: flipBelowOverride,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const flipBelow = flipBelowOverride ?? slot.y < 18;
  const positionLabel = player.position ?? slot.role;
  const flag = flagEmoji(player.countryCode);

  const handleEnter = () => {
    setHovered(true);
    onHoverChange(player);
  };
  const handleLeave = () => {
    setHovered(false);
    onHoverChange(null);
  };

  return (
    <motion.div
      layout
      initial={false}
      animate={{ top: `${slot.y}%`, left: `${slot.x}%` }}
      transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
      className={[
        'sp-absolute sp-cursor-default sp-pointer-events-auto',
        hovered ? 'sp-z-30' : 'sp-z-10',
      ].join(' ')}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      aria-label={`${player.name}${positionLabel ? `, ${positionLabel}` : ''}`}
    >
      {/* The motion.div is a zero-size anchor pinned exactly at (slot.x, slot.y).
       * The dot below is translated -50%/-50% relative to ITS OWN size, so the
       * dot's center always lands on the slot — independent of avatar size,
       * label visibility, or any sibling chrome. Bumping the clamp width can
       * never break centering with this structure. */}
      <div
        className="sp-absolute sp-w-[clamp(37px,9.98%,69px)] sp-aspect-square"
        style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={[
            'sp-relative sp-w-full sp-h-full sp-rounded-full',
            'sp-overflow-hidden sp-flex sp-items-center sp-justify-center',
            'sp-shadow-md sp-transition-transform sp-duration-150',
            hovered ? 'sp-scale-110' : '',
          ].join(' ')}
          style={{
            background: 'var(--sp-player-bg)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            outline: '2px solid var(--sp-player-ring)',
            outlineOffset: '0',
          }}
        >
          {player.photoUrl ? (
            <img
              src={player.photoUrl}
              alt=""
              className="sp-w-full sp-h-full sp-object-cover"
              draggable={false}
            />
          ) : (
            <span
              className="sp-text-[11px] sp-font-bold sp-leading-none"
              style={{ color: 'var(--sp-player-initials)' }}
            >
              {initials(player.name)}
            </span>
          )}
        </div>

        {showFlag && flag && (
          <span
            className="sp-absolute sp-text-[15px] sp-leading-none"
            // Pin the flag to the dot's lower-right using dot-relative offsets
            // so it tracks the avatar at any size instead of drifting with a
            // fixed rem value.
            style={{ right: '-12%', bottom: '-8%' }}
            aria-hidden="true"
          >
            {flag}
          </span>
        )}

        <AnimatePresence>
          {hovered && <HoverCard player={player} flipBelow={flipBelow} />}
        </AnimatePresence>

        {/* Label stack — absolute, hung below the dot. Centered horizontally
         * on the dot's center so its width never affects the dot's anchor. */}
        {(showName || (showPosition && positionLabel)) && (
          <div
            className="sp-absolute sp-left-1/2 sp-top-full sp-flex sp-flex-col sp-items-center sp-mt-2 sp--translate-x-1/2"
            aria-hidden="true"
          >
            {showName && (
              <div
                className={[
                  'sp-px-1.5 sp-py-[1px] sp-rounded sp-text-[10px] sp-font-semibold',
                  'sp-leading-tight sp-whitespace-nowrap sp-tracking-wide sp-text-center',
                ].join(' ')}
                style={{
                  background: 'var(--sp-name-bg)',
                  color: 'var(--sp-name-fg)',
                }}
              >
                {player.name}
              </div>
            )}
            {showPosition && positionLabel && (
              <div
                className="sp-text-[9px] sp-uppercase sp-tracking-wider sp-mt-0.5 sp-text-center"
                style={{ color: 'var(--sp-role-fg)' }}
              >
                {positionLabel}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
