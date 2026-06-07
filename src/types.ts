export type BeltColor = 'white' | 'yellow' | 'green';

export type TechniqueCategory = 'stance' | 'defense' | 'attack' | 'kick' | 'poomsae';

export interface TechniqueStep {
  frame: number;
  label: string;
  description: string;
  svgPath: string; // Dynamic path for line drawing in the SVG player
  annotations?: string[]; // Quick technical pointers for each step
}

export interface Technique {
  id: string;
  nameKr: string;
  nameHangul: string;
  namePt: string;
  belt: BeltColor;
  gup: string;
  category: TechniqueCategory;
  intro: string;
  tip?: string; // Sênior tip for the movement
  executionSteps: TechniqueStep[];
}
