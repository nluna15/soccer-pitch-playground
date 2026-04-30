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
};

export function PlayerMarker({
  player,
  slot,
  showName,
  showFlag,
  showPosition,
  onHoverChange,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const flipBelow = slot.y < 18;
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
        'sp-absolute sp-flex sp-flex-col sp-items-center sp-cursor-default sp-pointer-events-auto',
        hovered ? 'sp-z-30' : 'sp-z-10',
      ].join(' ')}
      style={{ x: '-50%', y: '-50%' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      aria-label={`${player.name}${positionLabel ? `, ${positionLabel}` : ''}`}
    >
      <div className="sp-relative sp-w-[clamp(28px,7.5%,52px)] sp-aspect-square">
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
            className={[
              'sp-absolute sp--bottom-1 sp-text-[11px] sp-leading-none',
              'sp-rounded-full sp-px-1 sp-py-0.5 sp-shadow',
            ].join(' ')}
            style={{
              right: 'calc(1.2rem)',
              background: 'var(--sp-card-bg)',
              border: '1px solid var(--sp-card-border)',
            }}
            aria-hidden="true"
          >
            {flag}
          </span>
        )}

        <AnimatePresence>
          {hovered && <HoverCard player={player} flipBelow={flipBelow} />}
        </AnimatePresence>
      </div>

      {showName && (
        <div
          className={[
            'sp-mt-2 sp-px-1.5 sp-py-[1px] sp-rounded sp-text-[10px] sp-font-semibold',
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
    </motion.div>
  );
}
