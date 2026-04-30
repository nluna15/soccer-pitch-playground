import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'sp-',
  content: ['./src/**/*.{ts,tsx}', './dev/**/*.{ts,tsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable preflight so the library doesn't reset consumer styles.
  corePlugins: {
    preflight: false,
  },
};

export default config;
