import type { Pt, PtIterable } from 'pts';
import type { Obstacle } from './Obstacle';
import type { Ray } from './Ray';

export interface Material {
	handleCollision: (
		intersection: Pt,
		collider: PtIterable,
		incoming: Ray,
		obstacle: Obstacle
	) => Ray[];
}
