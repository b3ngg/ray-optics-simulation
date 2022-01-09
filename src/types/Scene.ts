import type { Bound, CanvasForm, CanvasSpace, Pt } from 'pts';
import type { World } from './World';

type SceneInput = {
	space: CanvasSpace;
	form: CanvasForm;
	center: Pt;
	bounds: Bound;
	screen: Pt;
	scale: number;
	world: World;
};

/** A scene constructs and renders a different scenario */
export type Scene = (input: SceneInput) => (t: number) => void;
