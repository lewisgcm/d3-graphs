import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { Graph, Node, Path } from "../core/core.module";
import { DepthFirstNodeGenerator } from "./depth-first-node-generator";
import { DepthFirstPathFinder } from './depth-first-path-finder';

@Component({
  selector: 'depth-first-component',
  templateUrl: './depth-first.component.html',
  styleUrls: [ './depth-first.component.css' ]
})
export class DepthFirstComponent implements OnInit, OnDestroy {

    @ViewChild('graphView') graphView;

    pathFinder: DepthFirstPathFinder;
    graph: Graph;
    width: number = 800;
    height: number = 640;
    maxNodes: number = 8;

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
            new DepthFirstNodeGenerator( this.maxNodes )
        );
        this.pathFinder = new DepthFirstPathFinder( this.graph );
        this.graph.setStart( this.startId );
        this.graph.setEnd( this.endId );
    }

    generate() {
        this.distance = 0;
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