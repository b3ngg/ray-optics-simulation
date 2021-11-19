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
import { getPointsOnCurve } from './math';
import { COLORS } from './const';

type CreateObstacle<T = ObstacleOptions> = (start: Pt, options: Omit<T, 'type'>) => Obstacle<T>;

/** Create a new circle obstacle */
export const createCircle: CreateObstacle<CircleOptions> = (start, options) => {
	const pts = Circle.fromCenter(start, options.radius);
	return {
		...options,
		type: 'circle',
		start,
		getRayIntersections: (r) => [
			{
				intersection: Circle.intersectLine2D(pts, r)[1],
				collider: pts
			}
		],
		draw: (f) => f.strokeOnly(COLORS.MIRROR, 6).circle(pts)
	};
};

/** Create a new line obstacle */
export const createLine: CreateObstacle<LineOptions> = (start, options) => {
	const pts = [start, options.end];
	return {
		...options,
		type: 'line',
		start,
		getRayIntersections: (r) => [
			{
				intersection: Line.intersectLine2D(pts, r),
				collider: pts
			}
		],
		draw: (f) => f.strokeOnly(COLORS.MIRROR, 6).line(pts)
	};
};

/** Create a new curve obstacle */
export const createCurve: CreateObstacle<CurveOptions> = (start, options) => {
	const pts = getPointsOnCurve(start, options);
	return {
		...options,
		type: 'curve',
		start,
		getRayIntersections: (r) => {
			return pts.reduce<IntersectionReturn>((result, v, i) => {
				if (i === 0) return result;
				const start = pts[i - 1];
				const end = v;
				const intersect = Line.intersectLine2D([start, end], r);
				if (intersect) return [...result, { intersection: intersect, collider: [start, end] }];
				return result;
			}, []);
		},
		draw: (f) => f.strokeOnly(COLORS.MIRROR, 6).line(pts)
	};
};
