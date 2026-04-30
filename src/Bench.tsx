import type { BenchPlayer, Player } from './types';
import { PlayerMarker } from './PlayerMarker';

type Props = {
  players: BenchPlayer[];
  showName: boolean;
  showFlag: boolean;
  showPosition: boolean;
  onHoverChange: (player: Player | null) => void;
};

export function Bench({
  players,
  showName,
  showFlag,
  showPosition,
  onHoverChange,
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
          {players.map((p, i) => (
            <PlayerMarker
              key={p.id}
              player={p}
              slot={{ x: step * (i + 1), y: 0, role: p.position ?? '' }}
              showName={showName}
              showFlag={showFlag}
              showPosition={showPosition}
              onHoverChange={onHoverChange}
              flipBelow={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
