export function Pitch() {
  return (
    <svg
      className="sp-absolute sp-inset-0 sp-w-full sp-h-full sp-pointer-events-none"
      viewBox="0 0 100 150"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="sp-pitch-clip">
          <rect x="1" y="1" width="98" height="148" />
        </clipPath>
      </defs>
      <g clipPath="url(#sp-pitch-clip)">
        <rect
          x="1"
          y="1"
          width="98"
          height="148"
          fill="var(--sp-pitch-grass-1)"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="1"
            y={i * 25}
            width="98"
            height="12.5"
            fill="var(--sp-pitch-grass-2)"
          />
        ))}
      </g>

      <g
        fill="none"
        stroke="var(--sp-pitch-line)"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      >
        <rect x="1" y="1" width="98" height="148" />
        <line x1="1" y1="75" x2="99" y2="75" />
        <circle cx="50" cy="75" r="9" />
        <circle cx="50" cy="75" r="0.6" fill="var(--sp-pitch-line)" stroke="none" />

        {/* Top (opponent) goal area */}
        <rect x="36.5" y="1" width="27" height="5.5" />
        {/* Top penalty area */}
        <rect x="20.5" y="1" width="59" height="16.5" />
        {/* Top penalty spot */}
        <circle cx="50" cy="11" r="0.6" fill="var(--sp-pitch-line)" stroke="none" />
        {/* Top penalty arc */}
        <path d="M 41.5 17.5 A 9 9 0 0 0 58.5 17.5" />
        {/* Top goal */}
        <rect x="44" y="-1.5" width="12" height="2.5" />

        {/* Bottom (own) goal area */}
        <rect x="36.5" y="143.5" width="27" height="5.5" />
        {/* Bottom penalty area */}
        <rect x="20.5" y="132.5" width="59" height="16.5" />
        {/* Bottom penalty spot */}
        <circle cx="50" cy="139" r="0.6" fill="var(--sp-pitch-line)" stroke="none" />
        {/* Bottom penalty arc */}
        <path d="M 41.5 132.5 A 9 9 0 0 1 58.5 132.5" />
        {/* Bottom goal */}
        <rect x="44" y="149" width="12" height="2.5" />

        {/* Corner arcs */}
        <path d="M 1 2 A 1 1 0 0 0 2 1" />
        <path d="M 99 2 A 1 1 0 0 1 98 1" />
        <path d="M 1 148 A 1 1 0 0 1 2 149" />
        <path d="M 99 148 A 1 1 0 0 0 98 149" />
      </g>
    </svg>
  );
}
