import type { Pt } from 'pts';

/** Ray with and starting point and an angle */
export interface Ray {
	origin: Pt;
	angle: number;
}
