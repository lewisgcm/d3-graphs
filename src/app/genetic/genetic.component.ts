import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { Graph } from "../core/core.module";

@Component({
  selector: 'genetic-component',
  templateUrl: './genetic.component.html',
  styleUrls: [ './genetic.component.css' ]
})
export class GeneticComponent implements OnInit, OnDestroy {

    @ViewChild('graphView') graphView;

    graph: Graph;
    width: number = 800;
    height: number = 640;
    maxNodes: number = 15;

    startId: number;
    endId: number;

    ngOnInit () {
        this.graph = new Graph(
            this.graphView.nativeElement,
            this.width,
            this.height,
            this.maxNodes
        );
    }

    generate() {
        this.graph.generate();
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

    }
}