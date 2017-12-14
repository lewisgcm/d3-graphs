import { GraphPathFinder, Graph, Node } from '../core/core.module';
import { generate } from 'rxjs/observable/generate';

export class GeneticGraphPathFinder implements GraphPathFinder<Node> {

    constructor(private graph: Graph) {
    }

    findShortestPath(start: number, end: number): Node[] {
        return this.generateRandomPath();
    }

    generateRandomPath() : Node[] {
        var path = this.graph.nodes.slice(0);
        var maxShuffles = this.graph.nodes.length^2;
        while( maxShuffles-- > 0 ) {
            var index = Math.max(Math.min(((Math.random()*this.graph.nodes.length) | 0),1), this.graph.nodes.length-1);
            var tmp = path[index];
            path[index] = path[this.graph.nodes.length-index];
            path[this.graph.nodes.length-index] = tmp;
        }
        return path;
    }

}