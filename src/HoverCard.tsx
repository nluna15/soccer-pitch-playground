import { motion } from 'framer-motion';
import type { Player } from './types';
import { flagEmoji } from './utils/flag';

type Props = {
  player: Player;
  flipBelow?: boolean;
};

export function HoverCard({ player, flipBelow = false }: Props) {
  const flag = flagEmoji(player.countryCode);
  const entries = player.extras ? Object.entries(player.extras) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: flipBelow ? -4 : 4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: flipBelow ? -4 : 4, scale: 0.96 }}
      transition={{ duration: 0.14, ease: 'easeOut' }}
      className={[
        'sp-absolute sp-left-1/2 sp--translate-x-1/2 sp-z-20',
        flipBelow ? 'sp-top-full sp-mt-2' : 'sp-bottom-full sp-mb-2',
        'sp-min-w-[10rem] sp-max-w-[14rem] sp-rounded-lg sp-px-3 sp-py-2',
        'sp-shadow-lg sp-pointer-events-none sp-text-left',
      ].join(' ')}
      style={{
        background: 'var(--sp-card-bg)',
        color: 'var(--sp-card-fg)',
        border: '1px solid var(--sp-card-border)',
      }}
    >
      <div className="sp-flex sp-items-center sp-gap-2">
        {flag && <span className="sp-text-base sp-leading-none">{flag}</span>}
        <span className="sp-text-sm sp-font-semibold sp-leading-tight">
          {player.name}
        </span>
      </div>
      {player.position && (
        <div
          className="sp-text-[10px] sp-uppercase sp-tracking-wider sp-mt-0.5 sp-opacity-70"
        >
          {player.position}
        </div>
      )}
      {entries.length > 0 && (
        <dl className="sp-mt-2 sp-grid sp-grid-cols-[auto,1fr] sp-gap-x-2 sp-gap-y-0.5 sp-text-[11px]">
          {entries.map(([k, v]) => (
            <div key={k} className="sp-contents">
              <dt className="sp-opacity-60 sp-capitalize">{k}</dt>
              <dd className="sp-font-medium sp-text-right">{String(v)}</dd>
            </div>
          ))}
        </dl>
      )}
    </motion.div>
  );
}
