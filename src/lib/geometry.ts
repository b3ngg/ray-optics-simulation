import type { Pt } from 'pts';

export const fDistance = (a: Pt, b: Pt): number => a.$subtract(b).magnitudeSq();
