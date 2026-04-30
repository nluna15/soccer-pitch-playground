import type { Formation, FormationName } from '../types';
import { formation_4_4_2 } from './4-4-2';
import { formation_4_3_3 } from './4-3-3';
import { formation_3_5_2 } from './3-5-2';
import { formation_4_2_3_1 } from './4-2-3-1';
import { formation_4_1_4_1 } from './4-1-4-1';
import { formation_3_4_3 } from './3-4-3';
import { formation_5_3_2 } from './5-3-2';
import { formation_4_4_1_1 } from './4-4-1-1';
import { formation_5_4_1 } from './5-4-1';
import { formation_4_5_1 } from './4-5-1';
import { formation_3_4_2_1 } from './3-4-2-1';
import { formation_4_3_2_1 } from './4-3-2-1';

export const formations: Record<FormationName, Formation> = {
  '4-4-2': formation_4_4_2,
  '4-3-3': formation_4_3_3,
  '3-5-2': formation_3_5_2,
  '4-2-3-1': formation_4_2_3_1,
  '4-1-4-1': formation_4_1_4_1,
  '3-4-3': formation_3_4_3,
  '5-3-2': formation_5_3_2,
  '4-4-1-1': formation_4_4_1_1,
  '5-4-1': formation_5_4_1,
  '4-5-1': formation_4_5_1,
  '3-4-2-1': formation_3_4_2_1,
  '4-3-2-1': formation_4_3_2_1,
};

export const formationNames: FormationName[] = Object.keys(formations) as FormationName[];
