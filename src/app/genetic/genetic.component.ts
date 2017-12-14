import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { Graph, Node } from "../core/core.module";
import { GeneticGraphNodeGenerator } from "./genetic-graph-node-generator";
import { GeneticGraphPathFinder } from './genetic-graph-path-finder';

@Component({
  selector: 'genetic-component',
  templateUrl: './genetic.component.html',
  styleUrls: [ './genetic.component.css' ]
})
export class GeneticComponent implements OnInit, OnDestroy {

    @ViewChild('graphView') graphView;

    pathFinder: GeneticGraphPathFinder;
    graph: Graph;
    width: number = 800;
    height: number = 640;
    maxNodes: number = 20;

    startId: number = 1;
    endId: number = 2;
    iterations : number = 1000;

    ngOnInit () {
        this.graph = new Graph(
            this.graphView.nativeElement,
            this.width,
            this.height,
            new GeneticGraphNodeGenerator( this.maxNodes )
        );
        this.pathFinder = new GeneticGraphPathFinder( this.graph );
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
        this.graph.highlightPath( path );
    }
}