import { Node } from './node';

export interface GraphNodeGenerator<T extends Node> {
	generate(): T[];
}