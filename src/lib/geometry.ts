import { Group, Pt } from 'pts';
import { CURVE_STEPS } from './const';

export type LinearFunction = (x: number) => number;

export const fDistance = (a: Pt, b: Pt): number => a.$subtract(b).magnitudeSq();

export const fPointOnCurve = (f: LinearFunction, x: number): Pt => new Pt(x, -f(x));

export const getPointsOnCurve = (origin: Pt, f: LinearFunction, scale: number): Group => {
	const steps = CURVE_STEPS * scale;
	const pts = [...Array(steps).keys()]
		.slice(1)
		.map((x) => x - steps / 2)
		.map((x) => origin.$add(fPointOnCurve(f, x / scale).$multiply(scale)));
	return new Group(...pts);
};
