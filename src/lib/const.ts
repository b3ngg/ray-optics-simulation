/** The number of collisions a ray can have */
export const MAX_TRACE_DEPTH = 500;
/** How long a ray is scaled in rendering and collision testing */
export const MAX_TRACE_LENGTH = 3000;
/** How many steps of lines a curve has (before scaling) */
export const CURVE_STEPS = 80;

export const COLORS = {
	BG: '#0D1321',
	RAY: '#EEE82C',
	MIRROR: '#C2C1C2',
	GLASS: '#3C7A89',
	ABSORBER: '#D62828'
} as const;
