import type { Pt } from 'pts';
import type {
	CircleOptions,
	CurveOptions,
	IntersectionReturn,
	LineOptions,
	Obstacle,
	ObstacleOptions
} from '$types/Obstacle';
import { Circle, Line } from 'pts';
import { getPointsOnCurve } from './geometry';

type CreateObstacle<T = ObstacleOptions> = (start: Pt, options: T) => Obstacle<T>;

/** Create a new circle obstacle */
export const createCircle: CreateObstacle<CircleOptions> = (start, options) => {
	const pts = Circle.fromCenter(start, options.radius);
	return {
		...options,
		start,
		getRayIntersections: (r) => [
			{
				intersection: Circle.intersectLine2D(pts, r)[1],
				collider: pts
			}
		],
		draw: (f) => f.fill('#fff').circle(pts)
	};
};

/** Create a new line obstacle */
export const createLine: CreateObstacle<LineOptions> = (start, options) => {
	const pts = [start, options.end];
	return {
		...options,
		start,
		getRayIntersections: (r) => [
			{
				intersection: Line.intersectLine2D(pts, r),
				collider: pts
			}
		],
		draw: (f) => f.fill('#fff').line(pts)
	};
};

/** Create a new curve obstacle */
export const createCurve: CreateObstacle<CurveOptions> = (start, options) => {
	const pts = getPointsOnCurve(start, options);
	return {
		...options,
		start,
		getRayIntersections: (r) => {
			const intersects: IntersectionReturn = [];
			for (let i = 1; i < pts.length; i++) {
				const start = pts[i - 1];
				const end = pts[i];
				const intersect = Line.intersectLine2D([start, end], r);
				if (intersect) intersects.push({ intersection: intersect, collider: [start, end] });
			}
			return intersects;
		},
		draw: (f) => f.fill('#fff').line(pts)
	};
};
