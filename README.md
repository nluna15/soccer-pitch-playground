# soccer-pitch

A modern, plug-and-play React component for rendering soccer pitches with players, formations, photos, and animated transitions.

## Install

```bash
npm install soccer-pitch
```

## Usage

```tsx
import { SoccerPitch } from 'soccer-pitch';
import 'soccer-pitch/style.css';

const players = [
  { id: '1',  name: 'Alisson',     countryCode: 'BR' },
  { id: '2',  name: 'Trent',       countryCode: 'GB' },
  { id: '3',  name: 'Van Dijk',    countryCode: 'NL' },
  { id: '4',  name: 'Konaté',      countryCode: 'FR' },
  { id: '5',  name: 'Robertson',   countryCode: 'GB' },
  { id: '6',  name: 'Mac Allister',countryCode: 'AR' },
  { id: '7',  name: 'Szoboszlai', countryCode: 'HU' },
  { id: '8',  name: 'Jones',       countryCode: 'GB' },
  { id: '9',  name: 'Salah',       countryCode: 'EG' },
  { id: '10', name: 'Núñez',       countryCode: 'UY' },
  { id: '11', name: 'Díaz',        countryCode: 'CO' },
];

export default function App() {
  return (
    <SoccerPitch
      formation="4-3-3"
      players={players}
      theme="grass"
    />
  );
}
```

## Props

| Prop            | Type                                      | Default  | Description                                  |
| --------------- | ----------------------------------------- | -------- | -------------------------------------------- |
| `players`       | `Player[]`                                | required | Length must match the formation's slots (11) |
| `formation`     | `FormationName \| CustomFormation`        | required | Preset name or custom layout                 |
| `theme`         | `'grass' \| 'night' \| 'minimal' \| 'chalkboard'` | `'grass'` | Visual theme                          |
| `showNames`     | `boolean`                                 | `true`   | Render player name under marker              |
| `showFlags`     | `boolean`                                 | `true`   | Render country flag emoji                    |
| `className`     | `string`                                  | —        | Wrapper class (size with width/aspect)       |
| `onPlayerHover` | `(player \| null) => void`                | —        | Fires on hover enter/leave                   |

## Preset formations

`4-4-2`, `4-3-3`, `3-5-2`, `4-2-3-1`, `4-1-4-1`, `3-4-3`, `5-3-2`, `4-4-1-1`, `5-4-1`, `4-5-1`, `3-4-2-1`, `4-3-2-1`.

## Custom formation

```tsx
<SoccerPitch
  formation={{
    name: 'Custom',
    slots: [
      { x: 50, y: 92, role: 'GK' },
      // ...10 more in 0-100% space (x = horizontal, y = vertical, top = own goal)
    ],
  }}
  players={players}
/>
```

## Theming

Each theme is a set of CSS variables. Override any variable in your own stylesheet:

```css
.my-pitch {
  --sp-pitch-grass: #1f8a3a;
  --sp-pitch-line: rgba(255,255,255,0.7);
  --sp-player-bg: #fff;
  --sp-player-ring: #111;
  --sp-player-name: #fff;
  --sp-card-bg: #111;
  --sp-card-fg: #fff;
}
```

## Out of scope (v1)

Click/select callbacks, drag-and-drop, horizontal orientation, jersey numbers, substitution bench, two-team split. Issues/PRs welcome.
