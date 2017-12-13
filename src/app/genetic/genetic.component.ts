import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'genetic-component',
  templateUrl: './genetic.component.html'
})
export class GeneticComponent {
    force;
    svg;
    width: number = 800;
    height: number = 640;
    data = {
        "nodes":[
            {"name":"node1","group":1},
            {"name":"node2","group":2},
            {"name":"node3","group":2},
            {"name":"node4","group":3}
        ],
        "links":[
            {"source":2,"target":1,"weight":1},
            {"source":0,"target":2,"weight":3}
        ]
    };

    constructor() {
        this.svg = d3.select( 'svg' )
            .attr("width", this.width)
            .attr("height", this.height);

       /* this.force = d3.forceSimulation()
            .gravity(.05)
            .distance(100)
            .charge(-100)
            .size([this.width, this.height]);*/
            this.applyData( this.data );
    }

    applyData( data ) {
        /*this.force
            .nodes(data.nodes)
            .links(data.links)
            .start();*/
  
        var link = this.svg
            .selectAll(".link")
            .data(data.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
    
        var node = this.svg
            .selectAll(".node")
            .data(data.nodes)
            .enter().append("g")
            .attr("class", "node");
           // .call(data.drag);
    
        node.append("circle")
            .attr("r","5");
    
        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });
    
        /*this.force.on(
            "tick",
            function() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });*/
    }
}