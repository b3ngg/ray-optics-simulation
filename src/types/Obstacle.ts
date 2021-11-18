import type { CanvasForm, Pt, PtIterable } from 'pts';
import type { MathFunction } from './helper';
import type { Material } from './Material';

export type IntersectionReturn = { intersection: Pt; collider: PtIterable }[];

export type ObstacleOptions = CircleOptions | LineOptions | CurveOptions;

export interface DefaultOptions {
	type: 'circle' | 'line' | 'curve';
	material: Material;
}

export interface CircleOptions extends DefaultOptions {
	type: 'circle';
	radius: number;
}

export interface LineOptions extends DefaultOptions {
	type: 'line';
	end: Pt;
}

export interface CurveOptions extends DefaultOptions {
	type: 'curve';
	f: MathFunction;
	scale: number;
	rotation?: number;
}

export type Obstacle<T = ObstacleOptions> = T & {
	start: Pt;
	getRayIntersections: (ray: PtIterable) => IntersectionReturn;
	draw: (form: CanvasForm) => void;
};
