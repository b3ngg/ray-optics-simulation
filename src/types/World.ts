import type { CanvasForm } from 'pts';
import type { Obstacle } from './Obstacle';
import type { Ray } from './Ray';

/** The world manages all objects and their behaviors */
export interface World {
	addObstacle: (id: string, obstacle: Obstacle) => void;
	addSource: (id: string, ray: Ray) => void;
	update: () => void;
	draw: (form: CanvasForm) => void;
}
