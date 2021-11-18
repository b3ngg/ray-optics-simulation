import { Circle, Line, Pt } from 'pts';
import type { PtIterable } from 'pts';
import { getPointsOnCurve } from './geometry';
import type { LinearFunction } from './geometry';
import type { Material } from './Material';
import type { Ray } from './Ray';
import { MAX_TRACE_LENGTH } from './const';
import { events } from './EventManager';

export type Obstacle = CircleObstacle | LineObstacle | CurveObstacle;

export interface BaseObstacle {
	type: 'circle' | 'line' | 'curve';
	material?: Material;
}

export interface CircleObstacle extends BaseObstacle {
	type: 'circle';
	center: Pt;
	radius: number;
}

export interface LineObstacle extends BaseObstacle {
	type: 'line';
	start: Pt;
	end: Pt;
}

export interface CurveObstacle extends BaseObstacle {
	type: 'curve';
	start: Pt;
	f: LinearFunction;
	scale: number;
}

export const getIntersections = (obstacle: Obstacle, ray: Ray): [Pt, PtIterable][] => {
	const { type } = obstacle;
	const rayPts = Line.fromAngle(ray.origin, ray.angle, MAX_TRACE_LENGTH);

	if (type === 'circle')
		return [
			[Circle.intersectLine2D(Circle.fromCenter(obstacle.center, obstacle.radius), rayPts)[1], []]
		];

	if (type === 'line') return [[Line.intersectLine2D([obstacle.start, obstacle.end], rayPts), []]];
	if (type === 'curve') {
		const curveParts = getPointsOnCurve(obstacle.start, obstacle.f, obstacle.scale);
		const intersects = [];
		for (let i = 1; i < curveParts.length; i++) {
			const start = curveParts[i - 1];
			const end = curveParts[i];
			const intersect = Line.intersectLine2D([start, end], rayPts);
			if (intersect) intersects.push([intersect, [start, end]]);
		}
		return intersects;
	}
};
