import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { Graph, Node, Path } from "../core/core.module";
import { BreadthFirstNodeGenerator } from "./breadth-first-node-generator";
import { BreadthFirstPathFinder } from './breadth-first-path-finder';

@Component({
  selector: 'breadth-first-component',
  templateUrl: './breadth-first.component.html',
  styleUrls: [ './breadth-first.component.css' ]
})
export class BreadthFirstComponent implements OnInit, OnDestroy {

    @ViewChild('graphView') graphView;

    pathFinder: BreadthFirstPathFinder;
    graph: Graph;
    width: number = 800;
    height: number = 640;
    maxNodes: number = 30;

    startId: number = 1;
    endId: number = 2;
    distance: number = 0;

    timer;

    stepMode = false;

    ngOnInit () {
        this.graph = new Graph(
            this.graphView.nativeElement,
            this.width,
            this.height,
            new BreadthFirstNodeGenerator( this.maxNodes )
        );
        this.pathFinder = new BreadthFirstPathFinder( this.graph );
        this.graph.setStart( this.startId );
        this.graph.setEnd( this.endId );
    }

    generate() {
        this.graph.generate();
        this.graph.setStart( this.startId );
        this.graph.setEnd( this.endId );
    }

    ngOnDestroy() {
        this.graph.clear();
        delete this.graph;
    }

    onStartChange() {
        this.graph.setStart( this.startId );
    }

    onEndChange() {
        this.graph.setEnd( this.endId );
    }

    findPath() {
        var path = this.pathFinder.findShortestPath(this.startId, this.endId);
        this.distance = path.distance | 0;
        this.graph.highlightPath( path.path );
    }
}