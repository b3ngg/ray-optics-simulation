/** Used to collect data from different processes */
export interface EventManager {
	on: (id: string, cb: (data: unknown) => void) => void;
	trigger: (id: string, data: unknown) => void;
}
