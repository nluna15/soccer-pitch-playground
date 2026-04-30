export type Player = {
  id: string;
  name: string;
  photoUrl?: string;
  position?: string;
  countryCode?: string;
  extras?: Record<string, string | number>;
};

export type FormationName =
  | '4-4-2'
  | '4-3-3'
  | '3-5-2'
  | '4-2-3-1'
  | '4-1-4-1'
  | '3-4-3'
  | '5-3-2'
  | '4-4-1-1'
  | '5-4-1'
  | '4-5-1'
  | '3-4-2-1'
  | '4-3-2-1';

export type FormationSlot = {
  x: number;
  y: number;
  role: string;
};

export type Formation = {
  name: string;
  slots: FormationSlot[];
};

export type CustomFormation = {
  name?: string;
  slots: FormationSlot[];
};

export type Theme = 'grass' | 'night' | 'minimal' | 'chalkboard';

export type BenchPlayer = Player;

export type SoccerPitchProps = {
  players: (Player | null)[];
  formation: FormationName | CustomFormation;
  theme?: Theme;
  showNames?: boolean;
  showFlags?: boolean;
  bench?: (BenchPlayer | null)[];
  className?: string;
  onPlayerHover?: (player: Player | null) => void;
  onSlotToggle?: (index: number) => void;
  onBenchToggle?: (index: number) => void;
};
