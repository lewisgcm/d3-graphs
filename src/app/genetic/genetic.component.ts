import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { Graph, Node } from "../core/core.module";
import { GeneticGraphNodeGenerator } from "./genetic-graph-node-generator";

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
            new GeneticGraphNodeGenerator( this.maxNodes )
        );

        console.log(this.generateRandomPath());
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

    pathFitness(path: Node[]) {

    }

    generateRandomPath() : Node[] {
        var path = this.graph.nodes.slice(0);
        var maxShuffles = this.maxNodes^2;
        while( maxShuffles-- > 0 ) {
            var index = Math.max(Math.min(((Math.random()*this.maxNodes) | 0),1), this.maxNodes-1);
            var tmp = path[index];
            path[index] = path[this.maxNodes-index];
            path[this.maxNodes-index] = tmp;
        }
        return path;
    }
}