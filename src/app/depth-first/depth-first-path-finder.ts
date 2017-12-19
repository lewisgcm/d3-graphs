import { GraphPathFinder, Graph, Node, Path } from '../core/core.module';

export class DepthFirstPathFinder implements GraphPathFinder<Node> {

    constructor(private graph: Graph) {
        
    }

    findAllPaths(start: number, end: number) {

        //Initialise our list of choices with the first step
        var partialPaths = this.getNodeConnections( start ).filter( n => n != start && n != end ).map(i => [start, i]);
        var paths: Path[] = [];

        // Whilst we have choices to make
        var lastLength = 0;
        var its = 0;

        while( partialPaths.length > 0 ) {
            its ++;

            var partialPath = partialPaths.shift();
            var choices = this.getNodeConnections( partialPath.slice(-1).pop() ).filter( (n) => partialPath.indexOf( n ) == -1 );

            if( choices.length == 1 ) {
                partialPath.push( choices.pop() );
                var pathNodes = partialPath.map( i => this.graph.getNode( i ) );
                paths.push(<Path>{
                    path: pathNodes,
                    distance: this.getPathDistance( pathNodes )
                });
            }

            if( partialPath.length != lastLength ) {
                lastLength = partialPath.length;
            }

            choices
                .filter(n => n != end && n!= start )
                .map(n => partialPath.concat([n]))
                .forEach(
                    (path) => {
                        partialPaths.push( path );
                    }
                );
        }

        console.log({ its: its });

        return paths;
    }

    findShortestPath(start: number, end: number): Path {

        var paths = this.findAllPaths( start, end );
        var minIndex = -1;
        var min = Number.MAX_SAFE_INTEGER;

        for( var i = 0; i < paths.length; i++ ) {
            if( paths[i].distance < min ) {
                min = paths[i].distance;
                minIndex = i;
            }
        }

        return paths[minIndex];
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

    //Every node is connected to every other node
    getNodeConnections(id: number): number[] {
        return this.graph.nodes.filter( n => n.id != id ).map( n => n.id );
    }

    getPathDistance( path: Node[] ) {
        var length = 0;
        for( var i = 0; i < path.length-1; i++ ) {
            length += this.graph.distance( path[i], path[i+1] );
        }
        return length;
    }

}