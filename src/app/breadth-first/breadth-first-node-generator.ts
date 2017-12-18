import { Node, GraphNodeGenerator } from '../core/core.module';

export class BreadthFirstNodeGenerator implements GraphNodeGenerator<Node> {

	constructor(private maxNodes: number) {
	}

	generate(): Node[] {
		return Array.from(
			{length: this.maxNodes},
			(value, key) => <any>{ 'id' : key+1, 'x' : Math.random(), 'y' : Math.random() }
		);
	}
}