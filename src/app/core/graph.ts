import { Observable, ReplaySubject } from 'rxjs';

import { Node } from './node';
import * as d3 from 'd3';

export class Graph {

	private svg;
	public nodes: Node[];
	private onClickSubject: ReplaySubject<[ Node, SVGElement ]> = new ReplaySubject(1);

	private startId: number;
	private endId: number;

	constructor(
		private selector: Element,
		private width: number,
		private height: number,
		private maxNodes: number
	) {
		this.svg = d3.select( selector );
		this.generate();
	}

	public generate() {
		this.clear();
		this.nodes = Array.from(
			{length: this.maxNodes},
			(value, key) => <any>{ 'id' : key+1, 'x' : Math.random(), 'y' : Math.random() }
		);

		const links = this.nodes.map(
			(node) => {
				return Array.from(
					{length: this.maxNodes},
					(value, key) => <any>{ 'source' : node.id, 'target': key+1, 'strength' : 0 }
				)
				.filter((link) => link.source != link.target);
			}
		).reduce(
			(accumulator, value ) => {
				return accumulator.concat( value );
			}
		);

		const simulation = d3.forceSimulation<Node>()
  			.force('charge', d3.forceManyBody().strength(-15)) 
  			.force('center', d3.forceCenter(this.width / 2, this.height / 2));

		const linkElements = this.svg.append('g')
		  .selectAll('line')
		  .data(links)
		  .enter()
		  	.append('line');

  		const nodeElements = this.svg.append('g')
		  .selectAll('circle')
		  .data(this.nodes)
		  .enter()
			.append('circle')
			.attr('class', 'node')
			.attr('r', 12)
			.attr('id', (node) => `id-${node.id}` );

        const text = this.svg.selectAll("text")
			.data(this.nodes)
			.enter()
			.append("text");

        var textLabels = text
          .text( node => node.id )
          .attr( "font-family", "sans-serif" )
          .attr( "font-size", "15px" )
          .style("text-anchor", "middle")
          .attr( "fill", "black" );

		simulation.nodes(this.nodes).on(
			'tick',
			() => {
			  	nodeElements
				    .attr("cx", node => node.x)
				    .attr("cy", node => node.y);
			  	linkElements
					 .attr('x1', link => link.source.x)
					 .attr('y1', link => link.source.y)
					 .attr('x2', link => link.target.x)
					 .attr('y2', link => link.target.y);
				textLabels
				    .attr("x", node => node.x)
				    .attr("y", node => node.y+5);
			}
		);

		simulation.force(
  			'link',
  			d3.forceLink<Node, { source : Node; target : Node; strength: number }>(links)
  				.id( link => link.id.toString() )
  				.strength( link => link.strength )
  		);

		var that = this;
  		d3.selectAll("circle").on(
  			"click",
  			function(data: Node) {
  				that.onClickSubject.next([ data, <any>this ]);
        	}
        );
	}

	public onClick() : Observable<[ Node, SVGElement ]> {
		return this.onClickSubject.asObservable();
	}

	public getNode(id: number): Node {
		return this.nodes.find( (n) => n.id == id );
	}

	public getNodeElement(id: number) : SVGElement {
		return <any>d3.select(`#id-${id}`).node();
	}

	public clear() {
		this.svg.selectAll("*").remove();
	}

	public toggleClass(c : string, visible: boolean) {
		this.svg.selectAll( "*" ).classed( c, visible );
	}

	public setStart(id: number) {
		this.startId = id;
        this.svg.selectAll( "*" ).classed( 'start', false );
        this.getNodeElement( id )
            .classList
            .add( 'start' );
	}

	public setEnd(id: number) {
		this.endId = id;
        this.svg.selectAll( "*" ).classed( 'stop', false );
        this.getNodeElement( id )
            .classList
            .add( 'stop' );
	}
}