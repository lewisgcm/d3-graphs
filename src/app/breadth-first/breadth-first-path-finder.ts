import { GraphPathFinder, Graph, Node, Path } from '../core/core.module';

export class BreadthFirstPathFinder implements GraphPathFinder<Node> {

    constructor(private graph: Graph) {
        
    }

    findShortestPath(start: number, end: number): Path {
        throw new Error("Method not implemented.");
    }

}