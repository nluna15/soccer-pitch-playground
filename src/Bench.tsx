import type { BenchPlayer, Player } from './types';
import { PlayerMarker } from './PlayerMarker';

type Props = {
  players: (BenchPlayer | null)[];
  showName: boolean;
  showFlag: boolean;
  onHoverChange: (player: Player | null) => void;
  onToggle?: (index: number) => void;
};

export function Bench({
  players,
  showName,
  showFlag,
  onHoverChange,
  onToggle,
}: Props) {
  if (players.length === 0) return null;

  const step = 100 / (players.length + 1);

  return (
    <div className="sp-bench" aria-label="Substitutes">
      <div className="sp-bench-title">Substitutes</div>
      <div className="sp-bench-row sp-relative">
        <div
          className="sp-absolute sp-left-0 sp-right-0"
          style={{ top: '50%', height: 0 }}
        >
          {players.map((p, i) => {
            const slot = { x: step * (i + 1), y: 0, role: p?.position ?? '' };
            return p ? (
              <PlayerMarker
                key={p.id}
                player={p}
                slot={slot}
                showName={showName}
                showFlag={showFlag}
                onHoverChange={onHoverChange}
                flipBelow={false}
                onClick={onToggle ? () => onToggle(i) : undefined}
              />
            ) : (
              <PlayerMarker
                key={`blank-${i}`}
                blank
                blankLabel="+"
                slot={slot}
                flipBelow={false}
                onClick={onToggle ? () => onToggle(i) : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
