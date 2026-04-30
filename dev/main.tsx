import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  SoccerPitch,
  formationNames,
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

function App() {
  const [formation, setFormation] = useState<FormationName>('4-3-3');
  const [theme, setTheme] = useState<Theme>('grass');
  const [hovered, setHovered] = useState<Player | null>(null);
  const [showNames, setShowNames] = useState(true);
  const [showFlags, setShowFlags] = useState(true);
  const [showPositions, setShowPositions] = useState(true);

  const infoToggles: Array<{ key: string; label: string; value: boolean; setValue: (v: boolean) => void }> = [
    { key: 'name',     label: 'Name',     value: showNames,     setValue: setShowNames },
    { key: 'flag',     label: 'Flag',     value: showFlags,     setValue: setShowFlags },
    { key: 'position', label: 'Position', value: showPositions, setValue: setShowPositions },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: 24, gap: 24 }}>
      <aside style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 18 }}>
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
      </aside>

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ width: 'min(440px, 100%)' }}>
          <SoccerPitch
            formation={formation}
            theme={theme}
            players={players}
            showNames={showNames}
            showFlags={showFlags}
            showPositions={showPositions}
            onPlayerHover={setHovered}
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
