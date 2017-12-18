import { GraphPathFinder, Graph, Node, Path } from '../core/core.module';

export class DepthFirstPathFinder implements GraphPathFinder<Node> {

    constructor(private graph: Graph) {
        
    }

    findAllPaths(start: number, end: number) {
        var choicess = this.getNodeConnections( start ).map(i => [i]);
        var paths: Path[] = [];
        while( choicess.length > 0 ) {
            var path = [];
            var choices = choicess.pop();
            while( choices.length > 0 ) {
                var current = choices.pop();

                //We havent seen this node before, lets do it!
                if( path.indexOf( current) == -1 ) {
                    path.push( current );
                    choices = choices.concat( this.getNodeConnections( current ) );
                }
            }
            var pathNodes = path.map( i => this.graph.getNode( i ) );
            paths.push(<Path>{
                path: pathNodes,
                distance: this.getPathDistance( pathNodes )
            });
        }
        return paths;
    }

    findShortestPath(start: number, end: number): Path {

        var paths = this.findAllPaths( start, end );
        var minIndex = -1;
        var min = Number.MAX_SAFE_INTEGER;

        for( var i = 0; i < paths.length; i++ ) {
            console.log(paths[i]);
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