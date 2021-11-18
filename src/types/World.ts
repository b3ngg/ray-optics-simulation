import type { CanvasForm, PtIterable } from 'pts';
import type { Obstacle } from './Obstacle';
import type { Ray } from './Ray';

export interface World {
	add: (obstacle: Obstacle) => void;
	traceRay: (ray: Ray) => PtIterable[];
	draw: (form: CanvasForm) => void;
}
