import type { MathFunction } from '$types/helper';
import type { CurveOptions } from '$types/Obstacle';
import { Group, Pt } from 'pts';
import { CURVE_STEPS } from './const';

/** Calculate the distance between two points */
export const fDistance = (a: Pt, b: Pt): number => a.$subtract(b).magnitudeSq();

/** Get a point on a curve for a specify x value */
export const fPointOnCurve = (f: MathFunction, x: number): Readonly<Pt> => new Pt(x, -f(x));

/** Get a array scaled and rotated points on a curve */
export const getPointsOnCurve = (
	origin: Pt,
	{ f, scale, rotation = 0 }: Omit<CurveOptions, 'type'>
): Readonly<Group> => {
	const steps = CURVE_STEPS * scale;
	const pts = [...Array(steps).keys()]
		.slice(1)
		.map((x) => x - steps / 2)
		.map((x) =>
			origin.$add(
				fPointOnCurve(f, x / scale)
					.rotate2D(rotation)
					.$multiply(scale)
			)
		);
	return new Group(...pts);
};
