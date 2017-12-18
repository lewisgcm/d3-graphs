import { GraphPathFinder, Graph, Node, Path } from '../core/core.module';

export class GeneticGraphPathFinder implements GraphPathFinder<Node> {

    private readonly populationSize: number = 1000;
    private readonly populationSample: number = 100;
    private readonly mutationChancePercent: number = 20;

    private population: Node[][];

    constructor(private graph: Graph) {
    }

    findShortestPath(start: number, end: number): Path {
        this.population = this.generateRandomPopulation(start, end);
        var shortest = this.findShortest( this.population );
        return {
            distance: shortest.distance,
            path: this.population[shortest.index]
        };
    }

    step() : Path {
        //Reduce our population to the fitest N
        this.population = this.findNShortest(
            this.populationSample,
            this.population
        );

        //Now apply some mutation (given a chance)
        this.population.forEach(
            path => {
                if( ((Math.random()*100) | 0) <= this.mutationChancePercent ) {
                    this.safeShuffle( path );
                }
            }
        )

        //Now we need to cross over until we reach our max population size again
        var children = Array.from(
			{length: (this.populationSize - this.population.length) },
			(value, key) => this.generateChild(this.population)
        );
        this.population = this.population.concat( children );

        var shortest = this.findShortest( this.population );
        return {
            distance: shortest.distance,
            path: this.population[shortest.index]
        };
    }

    generateChild(nodes: Node[][]): Node[] {
        var parent = this.withinBounds((nodes.length * Math.random()) | 0, 0, nodes.length-1);
        var parentTwo = this.withinBounds((nodes.length * Math.random()) | 0, 0, nodes.length-1);
        var crossOver = this.withinBounds((nodes[parent].length * Math.random()) | 0, 1, nodes[parent].length-2);
        return nodes[parent].slice(0, crossOver).concat( nodes[parentTwo].slice(crossOver) );
    }

    findNShortest(n: number, nodes: Node[][]) {
        
        var nShortest = [];
        var nodesCopy = nodes.map( p => p.slice() );
        
        for( var i = 0; i < n; i++ ) {
            var shortest = this.findShortest( nodesCopy );
            nShortest.push( nodesCopy.splice(shortest.index, 1)[0] );
        }
        return nShortest;
    }

    findShortest(path: Node[][]): { index: number; distance: number; } {
        var index = -1;
        var min = Number.MAX_SAFE_INTEGER;
        for(var i = 0; i < path.length; i++ ) {
            var currentMin =  this.getPathFitness( path[i] );
            if( currentMin <= min ) {
                min = currentMin;
                index = i;
            }
        }
        return { index: index, distance: min };
    }

    generateRandomPopulation(start:number, end: number) {
        return Array.from(
			{length: this.populationSize},
			(value, key) => this.generateRandomPath(start, end)
		);
    }

    getPathFitness(path: Node[]): number {
        if( this.hasDuplicateNodes(path) ) {
            return Number.MAX_SAFE_INTEGER;
        }
        var fitness = 0;
        for( var i = 0; i < path.length-1; i++ ) {
            fitness += this.graph.distance( path[i], path[i+1] );
        }
        return fitness;
    }

    hasDuplicateNodes( path: Node[] ) {
        for(var i =0; i < path.length; i++) {
            for(var j = 0; j < path.length; j++ ) {
                if( j != i && path[i].id == path[j].id ) {
                    return true;
                }
            }
        }
        return false;
    }

    withinBounds( i: number, min: number, max: number ) {
        return Math.max( Math.min( i, max ), min );
    }

    safeShuffle(path: Node[]) {
        var indexFirst = this.withinBounds(
            ((Math.random()*path.length) | 0),
            1,
            path.length-2
        );
        var indexSecond = this.withinBounds(
            ((Math.random()*path.length) | 0),
            1,
            path.length-2
        );
        var tmp = path[indexFirst];
        path[indexFirst] = path[indexSecond];
        path[indexSecond] = tmp;
    }

    generateRandomPath(start: number, end: number) : Node[] {
        var path = this.graph.nodes.slice();

        if( path[0].id != start ) {
            var tmp = path[0];
            path[0] = path[start-1];
            path[start-1] = tmp;
        }

        if( path[path.length-1].id != end ) {
            tmp = path[path.length-1];
            path[path.length-1] = path[end-1];
            path[end-1] = tmp;
        }

        var maxShuffles = path.length;
        while( maxShuffles-- > 0 ) {
            this.safeShuffle( path );
        }
        return path;
    }

}