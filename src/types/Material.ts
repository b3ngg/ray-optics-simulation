import type { Pt, PtIterable } from 'pts';
import type { Obstacle } from './Obstacle';
import type { Ray } from './Ray';

/** The material decides how a colliding ray is processed */
export interface Material {
	handleCollision: (
		intersection: Pt,
		collider: PtIterable,
		incoming: Ray,
		obstacle: Obstacle
	) => Ray[];
}
