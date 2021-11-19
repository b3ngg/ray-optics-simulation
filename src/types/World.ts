import type { CanvasForm } from 'pts';
import type { Obstacle } from './Obstacle';
import type { TraceEnvironment } from './TraceEnvironment';

/** The world manages all objects and their behaviors */
export interface World {
	add: (obstacle: Obstacle) => void;
	traceRay: TraceEnvironment;
	draw: (form: CanvasForm) => void;
}
