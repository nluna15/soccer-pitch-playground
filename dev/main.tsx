import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  SoccerPitch,
  formationNames,
  type BenchPlayer,
  type FormationName,
  type Player,
  type Theme,
} from '../src';
const themes: Theme[] = ['grass', 'night', 'minimal', 'chalkboard'];

const players: Player[] = [
  { id: '1',  name: 'Alisson',      countryCode: 'BR', extras: { age: 31, apps: 14 } },
  { id: '2',  name: 'Alexander-Arnold', countryCode: 'GB', extras: { assists: 7 } },
  { id: '3',  name: 'Van Dijk',     countryCode: 'NL', extras: { tackles: 38 } },
  { id: '4',  name: 'Konaté',       countryCode: 'FR', extras: { clearances: 51 } },
  { id: '5',  name: 'Robertson',    countryCode: 'GB', extras: { assists: 5 } },
  { id: '6',  name: 'Mac Allister', countryCode: 'AR', extras: { passes: 920 } },
  { id: '7',  name: 'Szoboszlai',   countryCode: 'HU', extras: { goals: 4 } },
  { id: '8',  name: 'Jones',        countryCode: 'GB', extras: { goals: 3 } },
  { id: '9',  name: 'Salah',        countryCode: 'EG', extras: { goals: 18, assists: 9 } },
  { id: '10', name: 'Núñez',        countryCode: 'UY', extras: { goals: 11 } },
  { id: '11', name: 'Díaz',         countryCode: 'CO', extras: { goals: 7 } },
];

const benchPlayers: BenchPlayer[] = [
  { id: 'b1', name: 'Kelleher',  countryCode: 'IE', position: 'GK',  extras: { apps: 6 } },
  { id: 'b2', name: 'Endo',      countryCode: 'JP', position: 'DM',  extras: { tackles: 22 } },
  { id: 'b3', name: 'Gakpo',     countryCode: 'NL', position: 'LW',  extras: { goals: 5 } },
  { id: 'b4', name: 'Elliott',   countryCode: 'GB', position: 'AM',  extras: { goals: 3 } },
  { id: 'b5', name: 'Tsimikas',  countryCode: 'GR', position: 'LB',  extras: { assists: 4 } },
];

const benchCounts = [1, 2, 3, 4, 5] as const;

function App() {
  const [formation, setFormation] = useState<FormationName>('4-3-3');
  const [theme, setTheme] = useState<Theme>('grass');
  const [hovered, setHovered] = useState<Player | null>(null);
  const [showNames, setShowNames] = useState(true);
  const [showFlags, setShowFlags] = useState(true);
  const [showBench, setShowBench] = useState(true);
  const [benchCount, setBenchCount] = useState<number>(3);
  const [panelOpen, setPanelOpen] = useState(true);
  const [blankPitch, setBlankPitch] = useState<Set<number>>(() => new Set([4]));
  const [blankBench, setBlankBench] = useState<Set<number>>(() => new Set([1]));

  const togglePitchSlot = (i: number) => {
    setBlankPitch((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const toggleBenchSlot = (i: number) => {
    setBlankBench((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const pitchPlayers: (Player | null)[] = players.map((p, i) =>
    blankPitch.has(i) ? null : p,
  );
  const visibleBench = benchPlayers.slice(0, benchCount);
  const benchWithBlanks: (BenchPlayer | null)[] = visibleBench.map((p, i) =>
    blankBench.has(i) ? null : p,
  );

  const infoToggles: Array<{ key: string; label: string; value: boolean; setValue: (v: boolean) => void }> = [
    { key: 'name', label: 'Name', value: showNames, setValue: setShowNames },
    { key: 'flag', label: 'Flag', value: showFlags, setValue: setShowFlags },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: 24, gap: 24 }}>
      <aside
        style={{
          width: panelOpen ? 240 : 44,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          transition: 'width 200ms ease',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: panelOpen ? 'flex-end' : 'center' }}>
          <button
            type="button"
            onClick={() => setPanelOpen(!panelOpen)}
            aria-label={panelOpen ? 'Collapse panel' : 'Expand panel'}
            aria-expanded={panelOpen}
            style={{
              ...chipStyle,
              minWidth: 28,
              padding: '4px 8px',
              textAlign: 'center',
            }}
          >
            {panelOpen ? '‹' : '›'}
          </button>
        </div>

        {panelOpen && (
          <>
            <h1 style={{ fontSize: 18, margin: 0 }}>soccer-pitch playground</h1>
            <p style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, margin: 0 }}>
              Hover a player for the tooltip. Switch formations to see animated transitions.
            </p>

            <div>
              <label style={labelStyle}>Formation</label>
              <select
                value={formation}
                onChange={(e) => setFormation(e.target.value as FormationName)}
                style={selectStyle}
              >
                {formationNames.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div style={noticeStyle} role="note">
              <div style={noticeTitleStyle}>Add and Remove Players</div>
              <div>Click a player to toggle between blank and populated states.</div>
            </div>

            <div>
              <label style={labelStyle}>Theme</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    style={{
                      ...chipStyle,
                      background: theme === t ? '#6ea8ff' : 'transparent',
                      color: theme === t ? '#0b1020' : '#e8efff',
                      borderColor: theme === t ? '#6ea8ff' : 'rgba(255,255,255,0.18)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Player info</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {infoToggles.map(({ key, label, value, setValue }) => (
                  <button
                    key={key}
                    type="button"
                    role="switch"
                    aria-checked={value}
                    onClick={() => setValue(!value)}
                    style={{
                      ...chipStyle,
                      background: value ? '#6ea8ff' : 'transparent',
                      color: value ? '#0b1020' : '#e8efff',
                      borderColor: value ? '#6ea8ff' : 'rgba(255,255,255,0.18)',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Bench</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showBench}
                  onClick={() => setShowBench(!showBench)}
                  style={{
                    ...chipStyle,
                    alignSelf: 'flex-start',
                    background: showBench ? '#6ea8ff' : 'transparent',
                    color: showBench ? '#0b1020' : '#e8efff',
                    borderColor: showBench ? '#6ea8ff' : 'rgba(255,255,255,0.18)',
                  }}
                >
                  {showBench ? 'On' : 'Off'}
                </button>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', opacity: showBench ? 1 : 0.4 }}>
                  {benchCounts.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setBenchCount(n)}
                      disabled={!showBench}
                      style={{
                        ...chipStyle,
                        minWidth: 32,
                        textAlign: 'center',
                        background: benchCount === n ? '#6ea8ff' : 'transparent',
                        color: benchCount === n ? '#0b1020' : '#e8efff',
                        borderColor: benchCount === n ? '#6ea8ff' : 'rgba(255,255,255,0.18)',
                        cursor: showBench ? 'pointer' : 'not-allowed',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', fontSize: 12, opacity: 0.7 }}>
              {hovered ? (
                <>
                  <div style={{ fontWeight: 600, color: '#e8efff' }}>Hovered:</div>
                  <div>{hovered.name}</div>
                </>
              ) : (
                <div>Hover a player…</div>
              )}
            </div>
          </>
        )}
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 'min(440px, 100%)' }}>
          <SoccerPitch
            formation={formation}
            theme={theme}
            players={pitchPlayers}
            showNames={showNames}
            showFlags={showFlags}
            bench={showBench ? benchWithBlanks : undefined}
            onPlayerHover={setHovered}
            onSlotToggle={togglePitchSlot}
            onBenchToggle={toggleBenchSlot}
          />
        </div>
      </main>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  opacity: 0.7,
  marginBottom: 6,
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  background: '#10172a',
  color: '#e8efff',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 6,
  fontSize: 13,
};

const noticeStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: '10px 12px',
  border: '1px solid rgba(110, 168, 255, 0.35)',
  background: 'rgba(110, 168, 255, 0.08)',
  borderRadius: 8,
  fontSize: 12,
  lineHeight: 1.5,
  color: '#e8efff',
};

const noticeTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#6ea8ff',
};

const chipStyle: React.CSSProperties = {
  padding: '5px 10px',
  fontSize: 12,
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.18)',
  background: 'transparent',
  color: '#e8efff',
  cursor: 'pointer',
  textTransform: 'capitalize',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
